import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { getProjectBySlug, getProjects } from '@/lib/db';
import { getSeoMetadata } from '@/lib/metadata';
import type { Project } from '@/lib/supabase';
import type { Metadata } from 'next';

export const revalidate = 3600; // Revalidate every hour

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const projects = await getProjects();
  if (!projects) return [];
  return projects.map((project: Project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const seoData = await getSeoMetadata('project', params.slug);
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The project you are looking for does not exist.',
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
      url: project ? `${siteUrl}/projects/${project.slug}` : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: seoData.title,
      description: seoData.description,
      images: [seoData.ogImage],
    },
    alternates: {
      canonical: project ? `${siteUrl}/projects/${project.slug}` : undefined,
    }
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const project = await getProjectBySlug(params.slug);
  
  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 py-12">
      
      <div className="max-w-3xl mx-auto">
        <Link 
          href="/projects/" 
          className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to projects
        </Link>
        
        <h1 className="text-4xl font-bold tracking-tight mb-4">{project.title}</h1>
        <p className="text-lg text-muted-foreground mb-8">{project.description}</p>
        
        <div className="relative h-[400px] rounded-xl overflow-hidden mb-12">
          <Image 
            src={project.image_url} 
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: project.content }} />
      </div>
    </div>
  );
}