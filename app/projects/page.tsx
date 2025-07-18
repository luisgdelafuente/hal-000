import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { getProjects } from '@/lib/api';
import { getSeoMetadata } from '@/lib/metadata';

export const revalidate = 3600; // Revalidate every hour

const industries = ["All", "Finance", "Healthcare", "Manufacturing"];

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSeoMetadata('page', 'projects_listing'); 
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
      url: `${siteUrl}/projects`, 
    },
    twitter: {
      card: 'summary_large_image',
      title: seoData.title,
      description: seoData.description,
      images: [seoData.ogImage],
    },
    alternates: {
      canonical: `${siteUrl}/projects`, 
    }
  };
}

import { getPageContent } from '@/lib/db';

export default async function ProjectsPage() {
  const projects = await getProjects();
  const pageData = await getPageContent('projects_listing');
  let content: { title?: string; subtitle?: string } = {};
  if (pageData && pageData.content) {
    if (typeof pageData.content === 'string') {
      content = JSON.parse(pageData.content);
    } else {
      content = pageData.content;
    }
  }
  if (!content.title || !content.subtitle) {
    throw new Error('Projects listing page content (title/subtitle) missing in database.');
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
        {projects.map((project, index) => (
          <Link 
            key={index} 
            href={`/projects/${project.slug}/`}
            className="group overflow-hidden rounded-xl border border-border/40 bg-background shadow-sm hover:shadow-md transition-all"
          >
            <div className="relative h-48 overflow-hidden">
              
              <Image 
                src={project.image_url} 
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground">{project.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}