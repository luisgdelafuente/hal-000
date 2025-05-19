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

import { getPageContent } from '@/lib/db';

export default async function HomePage() {
  let content = {
    hero: {
      badge: 'Welcome to HAL149!',
      title: 'Next-Gen AI for Real Business',
      subtitle: 'Empower your company with industry-specific AI solutions. Automate, analyze, and grow.',
      cta1: { label: 'Explore Solutions', href: '/projects' },
      cta2: { label: 'Contact Us', href: '/contact' }
    },
    features: [
      { title: 'No-Code Automation', description: 'Build and deploy workflows with a simple drag-and-drop interface.' },
      { title: 'Custom AI Models', description: 'Train, fine-tune, and deploy models tailored to your business needs.' },
      { title: '24/7 Support', description: 'Our team is always available to help you succeed with AI.' }
    ],
    featuredProjects: {
      title: 'Featured Projects',
      subtitle: 'See how our clients use HAL149 AI in the real world'
    },
    blogPreview: {
      title: 'From Our Blog',
      subtitle: 'Latest insights and updates from our team'
    },
    newsletter: {
      title: 'Stay in the Loop',
      subtitle: 'Subscribe to our newsletter for AI news and updates',
      placeholder: 'Enter your email',
      button: 'Subscribe'
    }
  };
  try {
    const pageData = await getPageContent('home');
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
    <main className="flex min-h-screen flex-col">
      <Hero content={content.hero} />
      <Features features={content.features} />
      <FeaturedProjects section={content.featuredProjects} />
      <BlogPreview section={content.blogPreview} />
      <Newsletter section={content.newsletter} />
    </main>
  );
}