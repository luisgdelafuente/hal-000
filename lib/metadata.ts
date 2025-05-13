import { getPageContent, getProjectBySlug, getBlogPostBySlug } from './db';
import type { PageContent, Project, BlogPost } from './supabase';

const DEFAULT_SITE_TITLE = 'Your Awesome Website'; // Replace with your actual default site title
const DEFAULT_SITE_DESCRIPTION = 'Discover amazing content here.'; // Replace with your actual default site description
const DEFAULT_OG_IMAGE_URL = '/images/default-og.png'; // Ensure this image exists in public/images

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
    // console.log('[metadata.ts] getHomePageDefaults - homePageData:', homePageData); // Optional: Log raw home page data
    const defaults = {
      title: homePageData?.meta_title || undefined,
      description: homePageData?.meta_description || undefined,
      keywords: homePageData?.meta_keywords?.split(',').map((k: string) => k.trim()) || undefined,
      ogImage: homePageData?.og_image_url || undefined,
    };
    // console.log('[metadata.ts] getHomePageDefaults - resolved defaults:', defaults); // Optional: Log resolved home defaults
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
  console.log('[metadata.ts] DEFAULT_SITE_TITLE:', DEFAULT_SITE_TITLE);

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
      case 'page':
      case 'home': 
      case 'projects_listing': 
      case 'blog_listing':   
        itemData = await getPageContent(identifier || itemType);
        break;
    }
    console.log('[metadata.ts] itemData fetched:', itemData);
  } catch (error) {
    console.error(`[metadata.ts] ERROR fetching SEO data for ${itemType} ${identifier || ''}:`, error);
    // Continue with defaults if specific item fetch fails
    itemData = null; // Ensure itemData is null on error
  }

  const metaTitle = itemData?.meta_title || homeDefaults.title || DEFAULT_SITE_TITLE;
  const metaDescription = itemData?.meta_description || homeDefaults.description || DEFAULT_SITE_DESCRIPTION;
  const metaKeywordsRaw = itemData?.meta_keywords || (homeDefaults.keywords ? homeDefaults.keywords.join(',') : '');
  const ogImageUrl = itemData?.og_image_url || homeDefaults.ogImage || DEFAULT_OG_IMAGE_URL;

  console.log('[metadata.ts] Intermediate meta values:');
  console.log('  metaTitle:', metaTitle);
  console.log('  metaDescription:', metaDescription);
  console.log('  metaKeywordsRaw:', metaKeywordsRaw);
  console.log('  ogImageUrl:', ogImageUrl);

  const result: SeoData = {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywordsRaw ? metaKeywordsRaw.split(',').map((k: string) => k.trim()).filter((k: string) => k) : [],
    ogImage: ogImageUrl,
  };

  console.log('[metadata.ts] Final SeoData object to be returned:', result);
  return result;
}
