import Link from 'next/link';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import BlogPreview from '@/components/home/BlogPreview';
import Newsletter from '@/components/common/Newsletter';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HAL149 - Unlocking Your Business Potential with AI',
  description: 'Transform your business with AI-powered solutions for strategy, automation, and application development.',
  openGraph: {
    title: 'HAL149 - Unlocking Your Business Potential with AI',
    description: 'Transform your business with AI-powered solutions for strategy, automation, and application development.',
    url: 'https://hal149.com',
    siteName: 'HAL149',
    images: [
      {
        url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
        width: 1200,
        height: 630,
        alt: 'HAL149 - AI Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HAL149 - Unlocking Your Business Potential with AI',
    description: 'Transform your business with AI-powered solutions for strategy, automation, and application development.',
    images: ['https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg'],
    creator: '@hal149',
  },
};

export default function Home() {
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