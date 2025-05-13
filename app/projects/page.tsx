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

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="container mx-auto px-4 sm:px-8 py-12">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Our Projects</h1>
        <p className="text-lg text-muted-foreground">
          Explore how our AI solutions are transforming industries
        </p>
      </div>
      
      <div className="mb-8 flex justify-center flex-wrap gap-2">
        {industries.map((industry, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              industry === "All" 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {industry}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <Link 
            key={index} 
            href={`/projects/${project.slug}/`}
            className="group overflow-hidden rounded-xl border border-border/40 bg-background shadow-sm hover:shadow-md transition-all"
          >
            <div className="relative h-48 overflow-hidden">
              <div className="absolute top-3 right-3 z-10 bg-background/90 px-3 py-1 rounded-full text-xs font-medium">
                {project.category}
              </div>
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