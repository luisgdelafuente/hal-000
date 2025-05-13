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

export async function getSeoMetadata(
  itemType: 'project' | 'blogPost' | 'page' | 'home' | 'projects_listing' | 'blog_listing',
  identifier?: string // slug for project/post, page_name for page, not used for 'home'
): Promise<SeoData> {
  console.log(`[metadata.ts] getSeoMetadata called for itemType: ${itemType}, identifier: ${identifier}`);

  let itemData: Partial<Project | BlogPost | PageContent> | null = null;
  const homeDefaults = await getHomePageDefaults();
  console.log('[metadata.ts] homeDefaults received:', homeDefaults);

  try {
    switch (itemType) {
      case 'project':
        if (identifier) itemData = await getProjectBySlug(identifier);
        break;
      case 'blogPost':
        if (identifier) itemData = await getBlogPostBySlug(identifier);
        break;
      case 'page': // Handles 'about', 'contact', etc.
      case 'home': // Specifically for the home page itself
      case 'projects_listing': // For '/projects' page
      case 'blog_listing':   // For '/blog' page
        itemData = await getPageContent(identifier || itemType);
        break;
    }
    console.log('[metadata.ts] itemData fetched for type', itemType, ':', itemData);
  } catch (error) {
    console.error(`[metadata.ts] ERROR fetching SEO data for ${itemType} ${identifier || ''}:`, error);
    itemData = null; 
  }

  // 1. Meta Title
  let finalMetaTitle = itemData?.meta_title || '';
  if (!finalMetaTitle) {
    if (itemType === 'project' || itemType === 'blogPost') {
      finalMetaTitle = (itemData as Project | BlogPost)?.title || homeDefaults.title || '';
    } else if (['page', 'home', 'projects_listing', 'blog_listing'].includes(itemType)) {
      // For pages, page_name often holds the title. For listings, the identifier itself can be a title.
      finalMetaTitle = (itemData as PageContent)?.page_name || (identifier ? identifier.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : '') || homeDefaults.title || '';
    } else {
      finalMetaTitle = homeDefaults.title || '';
    }
  }

  // 2. Meta Description
  let finalMetaDescription = itemData?.meta_description || '';
  if (!finalMetaDescription) {
    let contentSource = '';
    if (itemType === 'project' && (itemData as Project)?.description) {
      contentSource = (itemData as Project).description!;
    } else if (itemType === 'blogPost' && (itemData as BlogPost)?.content) {
      contentSource = (itemData as BlogPost).content!;
      if (contentSource) contentSource = contentSource.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(); // Basic HTML strip & normalize whitespace
    } else if (['page', 'home', 'projects_listing', 'blog_listing'].includes(itemType) && (itemData as PageContent)?.content_json) {
      contentSource = extractTextFromTiptapJson((itemData as PageContent).content_json);
    }
    
    if (contentSource) {
      finalMetaDescription = contentSource.substring(0, 155);
      if (contentSource.length > 155) {
        finalMetaDescription += '...';
      }
    } else {
      finalMetaDescription = homeDefaults.description || '';
    }
  }

  // 3. Meta Keywords (Fallback to home page keywords if item-specific are missing)
  let finalKeywords: string[] = [];
  const itemKeywordsString = itemData?.meta_keywords;
  if (itemKeywordsString && itemKeywordsString.trim() !== '') {
    finalKeywords = itemKeywordsString.split(',').map((k: string) => k.trim()).filter((k: string) => k);
  } else if (homeDefaults.keywords && homeDefaults.keywords.length > 0) {
    finalKeywords = homeDefaults.keywords; 
  }

  // 4. OG Image
  let finalOgImageUrl = itemData?.og_image_url || '';
  if (!finalOgImageUrl) {
    if (itemType === 'project' && (itemData as Project)?.image_url) {
      finalOgImageUrl = (itemData as Project).image_url!;
    } else if (itemType === 'blogPost' && (itemData as BlogPost)?.image_url) {
      finalOgImageUrl = (itemData as BlogPost).image_url!;
    } 
    // If still no image, fall back to home default
    if (!finalOgImageUrl) {
      finalOgImageUrl = homeDefaults.ogImage || '';
    }
  }

  console.log('[metadata.ts] Resolved SEO values:');
  console.log('  finalMetaTitle:', finalMetaTitle);
  console.log('  finalMetaDescription:', finalMetaDescription);
  console.log('  finalKeywords:', finalKeywords);
  console.log('  finalOgImageUrl:', finalOgImageUrl);

  const result: SeoData = {
    title: finalMetaTitle.trim(),
    description: finalMetaDescription.trim(),
    keywords: finalKeywords,
    ogImage: finalOgImageUrl.trim(),
  };

  console.log('[metadata.ts] Final SeoData object to be returned:', result);
  return result;
}
