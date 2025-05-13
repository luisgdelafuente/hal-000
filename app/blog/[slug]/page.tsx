import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { getBlogPost, getBlogPosts } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { getSeoMetadata } from '@/lib/metadata';
import { getBlogPostBySlug } from '@/lib/db';
import type { Metadata } from 'next';
import type { BlogPost } from '@/lib/supabase';

interface PageProps {
  params: {
    slug: string;
  };
}

export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  if (!posts) return [];
  return posts.map((post: BlogPost) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const seoData = await getSeoMetadata('blogPost', params.slug);
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The blog post you are looking for does not exist.',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      images: [{ url: seoData.ogImage }],
      type: 'article',
      publishedTime: post.published_at || undefined,
      url: `${siteUrl}/blog/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: seoData.title,
      description: seoData.description,
      images: [seoData.ogImage],
    },
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`,
    }
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 py-12">
      
      <article>
        <div className="max-w-3xl mx-auto">
          <Link 
            href="/blog/" 
            className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to blog
          </Link>
          
          <time className="block text-sm text-muted-foreground">
            {formatDate(post.published_at)}
          </time>
          
          <h1 className="text-4xl font-bold tracking-tight mt-2 mb-4">{post.title}</h1>
          <p className="text-xl text-muted-foreground mb-8">{post.excerpt}</p>
          
          <div className="relative h-[400px] rounded-xl overflow-hidden mb-12">
            <Image 
              src={post.image_url} 
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </article>
    </div>
  );
}