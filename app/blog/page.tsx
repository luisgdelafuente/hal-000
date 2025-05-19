import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { Metadata } from 'next';
import { getBlogPosts } from '@/lib/api';
import { getSeoMetadata } from '@/lib/metadata';

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSeoMetadata('page', 'blog_listing'); 
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';

  return {
    title: seoData.title, 
    description: seoData.description, 
    keywords: seoData.keywords,
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      images: [{ url: seoData.ogImage }],
      type: 'website',
      url: `${siteUrl}/blog`, 
    },
    twitter: {
      card: 'summary_large_image',
      title: seoData.title,
      description: seoData.description,
      images: [seoData.ogImage],
    },
    alternates: {
      canonical: `${siteUrl}/blog`, 
    }
  };
}

import { getPageContent } from '@/lib/db';

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  let content = { title: 'Our Blog', subtitle: 'Stay updated with the latest insights in AI and technology.' };
  try {
    const pageData = await getPageContent('blog_listing');
    if (pageData && pageData.content) {
      if (typeof pageData.content === 'string') {
        content = JSON.parse(pageData.content);
      } else {
        content = pageData.content;
      }
    }
  } catch (err) {
    // fallback to mock content
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 py-12">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">{content.title}</h1>
        <p className="text-lg text-muted-foreground">
          {content.subtitle}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {blogPosts.map((post, index) => (
          <article 
            key={index} 
            className="group overflow-hidden rounded-xl border border-border/40 bg-background shadow-sm hover:shadow-md transition-all"
          >
            <Link href={`/blog/${post.slug}/`}>
              <div className="relative h-48 overflow-hidden">
                <Image 
                  src={post.image_url} 
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <time className="text-sm text-muted-foreground">
                  {formatDate(post.published_at)}
                </time>
                <h3 className="text-xl font-semibold mt-2 mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground">{post.excerpt}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}