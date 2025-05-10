'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { getBlogPosts } from '@/lib/api';

type BlogPost = {
  title: string;
  slug: string;
  published_at: string;
  image_url: string;
  excerpt: string;
  content: string;
};

const BlogPreview = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const posts = await getBlogPosts();
      setBlogPosts(posts.slice(0, 3));
      setIsLoading(false);
    }
    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <section className="w-full py-20" style={{ backgroundColor: '#f1f5f9' }}>
        <div className="container mx-auto px-4 sm:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-xl p-4 space-y-4" style={{ backgroundColor: 'white' }}>
                  <div className="h-48 bg-muted rounded-xl"></div>
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-20" style={{ backgroundColor: '#f1f5f9' }}>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 min-h-[140px]">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-4 min-h-[40px]">Latest from Our Blog</h2>
            <p className="text-muted-foreground max-w-2xl min-h-[24px]">
              Stay updated with the latest insights in AI and technology
            </p>
          </div>
          <Link 
            href="/blog/"
            className="inline-flex items-center text-sm font-medium mt-4 md:mt-0 hover:underline"
          >
            View all posts <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article 
              key={index} 
              className="group overflow-hidden rounded-xl border border-border/40 shadow-sm hover:shadow-md transition-all min-h-[380px]"
              style={{ backgroundColor: 'white' }}
            >
              <Link href={`/blog/${post.slug}/`}>
                <div className="relative h-48 min-h-[192px] overflow-hidden">
                  <Image 
                    src={post.image_url} 
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    priority={index === 0}
                  />
                </div>
                <div className="p-6">
                  <time className="text-sm text-muted-foreground">
                    {formatDate(post.published_at)}
                  </time>
                  <h3 className="text-xl font-semibold mt-2 mb-2 group-hover:text-primary transition-colors min-h-[28px]">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground min-h-[20px]">{post.excerpt}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;