import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { projects } from '@/lib/data';

const FeaturedProjects = () => {
  return (
    <section className="w-full py-20">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Featured Projects</h2>
            <p className="text-muted-foreground max-w-2xl">
              Discover how our AI solutions are transforming industries and driving tangible business results.
            </p>
          </div>
          <Link 
            href="/projects"
            className="inline-flex items-center text-sm font-medium mt-4 md:mt-0 hover:underline"
          >
            View all projects <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Link 
              key={index} 
              href={`/projects/${project.slug}`}
              className="group overflow-hidden rounded-xl border border-border/40 bg-background shadow-sm hover:shadow-md transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <Image 
                  src={project.image} 
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
    </section>
  );
};

export default FeaturedProjects;