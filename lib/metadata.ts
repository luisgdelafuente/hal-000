import { getPageContent, getProjectBySlug, getBlogPostBySlug } from './db';
import type { PageContent, Project, BlogPost } from './supabase';

// Helper function to extract text from Tiptap JSON content
function extractTextFromTiptapJson(jsonString?: string): string {
  if (!jsonString) return '';
  try {
    // Assuming jsonString is a string that needs parsing, or it could already be an object
    const tiptapContent = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;
    let text = '';

    function traverse(node: any) {
      if (node.type === 'text' && node.text) {
        text += node.text + ' ';
      }
      // Check if node.content exists and is an array before iterating
      if (node.content && Array.isArray(node.content)) {
        node.content.forEach(traverse);
      }
    }

    // Check if tiptapContent and tiptapContent.content exists and is an array before iterating
    if (tiptapContent && tiptapContent.content && Array.isArray(tiptapContent.content)) {
      tiptapContent.content.forEach(traverse);
    }
    return text.trim().replace(/\s+/g, ' '); // Normalize whitespace by replacing multiple spaces with a single space
  } catch (error) {
    console.error('[metadata.ts] Error parsing Tiptap JSON for text extraction:', error);
    return '';
  }
}

export interface SeoData {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  // We can add canonicalUrl later if needed, e.g., for dynamic pages
  // canonicalUrl?: string; 
}

async function getHomePageDefaults(): Promise<Partial<SeoData>> {
  try {
    const homePageData = await getPageContent('home');
    const defaults = {
      title: homePageData?.meta_title || undefined,
      description: homePageData?.meta_description || undefined,
      keywords: homePageData?.meta_keywords?.split(',').map((k: string) => k.trim()).filter(k => k && k.length > 0) || undefined,
      ogImage: homePageData?.og_image_url || undefined,
    };
    return defaults;
  } catch (error) {
    console.error('[metadata.ts] ERROR fetching home page defaults for SEO:', error);
    return {};
  }
}

// Returns SEO metadata for a given item, falling back to home page metadata if fields are missing.
export async function getSeoMetadata(
  itemType: 'project' | 'blogPost' | 'page' | 'home' | 'projects_listing' | 'blog_listing',
  identifier?: string
): Promise<SeoData> {
  let itemData: Partial<Project | BlogPost | PageContent> | null = null;
  const homeDefaults = await getHomePageDefaults();

  try {
    switch (itemType) {
      case 'project':
        if (identifier) itemData = await getProjectBySlug(identifier);
        break;
      case 'blogPost':
        if (identifier) itemData = await getBlogPostBySlug(identifier);
        break;
      case 'page':
      case 'home':
      case 'projects_listing':
      case 'blog_listing':
        itemData = await getPageContent(identifier || itemType);
        break;
    }
  } catch (error) {
    console.error(`[metadata.ts] ERROR fetching SEO data for ${itemType} ${identifier || ''}:`, error);
    itemData = null;
  }

  // Fallback helper
  const fallback = <T>(primary: T | null | undefined, secondary: T | null | undefined, defaultValue: T): T => {
    if (primary && String(primary).trim() !== '') return primary;
    if (secondary && String(secondary).trim() !== '') return secondary;
    return defaultValue;
  };

  // 1. Meta Title (strict per-field fallback)
  let finalMetaTitle = (itemData?.meta_title && itemData.meta_title.trim() !== '')
    ? itemData.meta_title
    : (itemType === 'project' || itemType === 'blogPost') && (itemData as Project | BlogPost)?.title && (itemData as Project | BlogPost).title.trim() !== ''
      ? (itemData as Project | BlogPost).title
      : (['page', 'home', 'projects_listing', 'blog_listing'].includes(itemType) && (itemData as PageContent)?.page && (itemData as PageContent).page.trim() !== '')
        ? (itemData as PageContent).page
        : (identifier ? identifier.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : homeDefaults.title || '');
  if (!finalMetaTitle || finalMetaTitle.trim() === '') {
    finalMetaTitle = homeDefaults.title || '';
  }

  // 2. Meta Description (strict per-field fallback)
  let finalMetaDescription = (itemData?.meta_description && itemData.meta_description.trim() !== '')
    ? itemData.meta_description
    : (() => {
        let contentSource = '';
        if (itemType === 'project' && (itemData as Project)?.description && (itemData as Project).description.trim() !== '') {
          contentSource = (itemData as Project).description!;
        } else if (itemType === 'blogPost' && (itemData as BlogPost)?.content && (itemData as BlogPost).content.trim() !== '') {
          contentSource = (itemData as BlogPost).content!;
          contentSource = contentSource.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
        } else if (
          ['page', 'home', 'projects_listing', 'blog_listing'].includes(itemType)
        ) {
          const pageContent = (itemData as PageContent)?.content;
          if (typeof pageContent === 'string' && pageContent.trim() !== '') {
            contentSource = pageContent.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
          }
        }
        if (contentSource) {
          let desc = contentSource.substring(0, 155);
          if (contentSource.length > 155) desc += '...';
          return desc;
        }
        return homeDefaults.description || '';
      })();

  // 3. Meta Keywords (strict per-field fallback)
  let finalKeywords: string[] = [];
  if (itemData?.meta_keywords && itemData.meta_keywords.trim() !== '') {
    finalKeywords = itemData.meta_keywords.split(',').map((k: string) => k.trim()).filter((k: string) => k);
  } else if (homeDefaults.keywords && homeDefaults.keywords.length > 0) {
    finalKeywords = homeDefaults.keywords;
  }

  // 4. OG Image (strict per-field fallback)
  let finalOgImageUrl = (itemData?.og_image_url && itemData.og_image_url.trim() !== '')
    ? itemData.og_image_url
    : (itemType === 'project' && (itemData as Project)?.image_url && (itemData as Project).image_url.trim() !== '')
      ? (itemData as Project).image_url
      : (itemType === 'blogPost' && (itemData as BlogPost)?.image_url && (itemData as BlogPost).image_url.trim() !== '')
        ? (itemData as BlogPost).image_url
        : homeDefaults.ogImage || '';

  return {
    title: String(finalMetaTitle).trim(),
    description: String(finalMetaDescription).trim(),
    keywords: finalKeywords,
    ogImage: String(finalOgImageUrl).trim(),
  };
}

