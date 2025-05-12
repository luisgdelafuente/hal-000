import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { getBlogPost, getBlogPosts } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import type { Metadata } from 'next';

export const revalidate = 3600; // Revalidate every hour

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | HAL149',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${post.title} | HAL149 Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `https://hal149.com/blog/${post.slug}/`,
      images: [
        {
          url: post.image_url,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image_url],
    },
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