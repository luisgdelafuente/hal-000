import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

// Static pages to include
const staticPages = [
  '/',
  '/about',
  '/contact',
  '/legal',
];

function absoluteUrl(path: string) {
  return SITE_URL.replace(/\/$/, '') + path;
}

export async function GET() {
  const supabase = createClient();

  // Fetch blog slugs
  const { data: blogs } = await supabase
    .from('blog_posts')
    .select('slug, updated_at');

  // Fetch project slugs
  const { data: projects } = await supabase
    .from('projects')
    .select('slug, updated_at');

  // Compose all URLs
  const urls: { loc: string; lastmod: string; changefreq?: string; priority?: string }[] = [];

  // Static pages
  const today = new Date().toISOString().slice(0, 10);
  staticPages.forEach((page) => {
    urls.push({
      loc: absoluteUrl(page),
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.7',
    });
  });

  // Blog posts
  if (blogs) {
    blogs.forEach((post: any) => {
      urls.push({
        loc: absoluteUrl(`/blog/${post.slug}`),
        lastmod: post.updated_at ? post.updated_at.slice(0, 10) : today,
        changefreq: 'weekly',
        priority: '0.6',
      });
    });
  }

  // Projects
  if (projects) {
    projects.forEach((proj: any) => {
      urls.push({
        loc: absoluteUrl(`/projects/${proj.slug}`),
        lastmod: proj.updated_at ? proj.updated_at.slice(0, 10) : today,
        changefreq: 'weekly',
        priority: '0.6',
      });
    });
  }

  // Build XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((url) =>
      `  <url>\n` +
      `    <loc>${url.loc}</loc>\n` +
      `    <lastmod>${url.lastmod}</lastmod>\n` +
      (url.changefreq ? `    <changefreq>${url.changefreq}</changefreq>\n` : '') +
      (url.priority ? `    <priority>${url.priority}</priority>\n` : '') +
      `  </url>`
    ).join('\n') +
    `\n</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
