import Link from 'next/link';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import BlogPreview from '@/components/home/BlogPreview';
import Newsletter from '@/components/common/Newsletter';
import { Metadata } from 'next';
import { getSeoMetadata } from '@/lib/metadata';

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata(): Promise<Metadata> {
  // For the home page, the 'identifier' in getSeoMetadata is 'home'
  const seoData = await getSeoMetadata('home', 'home'); 
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
      url: siteUrl || undefined, // URL of the home page
    },
    twitter: {
      card: 'summary_large_image',
      title: seoData.title,
      description: seoData.description,
      images: [seoData.ogImage],
      // site: '@yourTwitterHandle', // Optional
    },
    alternates: {
      canonical: siteUrl || undefined, // Canonical URL for the home page
    }
  };
}

export default async function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <Features />
      <FeaturedProjects />
      <BlogPreview />
      <Newsletter />
    </main>
  );
}