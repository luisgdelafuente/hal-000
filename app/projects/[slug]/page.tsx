import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { getProject, getProjects } from '@/lib/api';
import type { Metadata } from 'next';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = await getProject(params.slug);
  
  if (!project) {
    return {
      title: 'Project Not Found | HAL149',
      description: 'The requested project could not be found.',
    };
  }

  return {
    title: `${project.title} | HAL149 Projects`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
      url: `https://hal149.com/projects/${project.slug}/`,
      images: [
        {
          url: project.image_url,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [project.image_url],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const project = await getProject(params.slug);
  
  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 py-12">
      <Link 
        href="/projects/" 
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
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
  );
}