import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { Metadata } from 'next';
import { getBlogPosts } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Blog | HAL149',
  description: 'Latest insights and articles on AI, machine learning, and technology trends.',
  openGraph: {
    title: 'HAL149 Blog',
    description: 'Latest insights and articles on AI, machine learning, and technology trends.',
    url: 'https://hal149.com/blog',
    images: [
      {
        url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
        width: 1200,
        height: 630,
        alt: 'HAL149 Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HAL149 Blog',
    description: 'Latest insights and articles on AI, machine learning, and technology trends.',
    images: ['https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg'],
  },
};

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  return (
    <div className="container mx-auto px-4 sm:px-8 py-12">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Our Blog</h1>
        <p className="text-lg text-muted-foreground">
          Stay updated with the latest insights in AI and technology
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <article 
            key={index} 
            className="group overflow-hidden rounded-xl border border-border/40 bg-background shadow-sm hover:shadow-md transition-all"
          >
            <Link href={`/blog/${post.slug}`}>
              <div className="relative h-48 overflow-hidden">
                <Image 
                  src={post.image} 
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <time className="text-sm text-muted-foreground">
                  {formatDate(post.date)}
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