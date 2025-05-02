import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { projects } from '@/lib/data';
import { notFound } from 'next/navigation';

interface ProjectFormProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectForm({ params }: ProjectFormProps) {
  const project = projects.find(p => p.slug === params.slug);
  
  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Edit Project</h1>
        <div className="flex gap-2">
          <Button>Save Changes</Button>
          <a href={`/projects/${project.slug}`} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" type="button">View</Button>
          </a>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Basic Information</h2>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" defaultValue={project.title} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" defaultValue={project.slug} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input id="industry" defaultValue={project.industry} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                defaultValue={project.description}
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Featured Image URL</Label>
              <Input id="image" defaultValue={project.image} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="technologies">Technologies (comma separated)</Label>
              <Input 
                id="technologies" 
                defaultValue={project.technologies.join(', ')} 
              />
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Content Sections</h2>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="about">About</Label>
              <Textarea 
                id="about" 
                defaultValue={project.content.about}
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="challenge">Challenge</Label>
              <Textarea 
                id="challenge" 
                defaultValue={project.content.challenge}
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="solution">Solution</Label>
              <Textarea 
                id="solution" 
                defaultValue={project.content.solution}
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="results">Results</Label>
              <Textarea 
                id="results" 
                defaultValue={project.content.results}
                className="min-h-[100px]"
              />
            </div>
          </div>
        </div>

        {/* SEO & Social */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">SEO & Social Media</h2>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="metaTitle">Meta Title</Label>
              <Input 
                id="metaTitle" 
                defaultValue={`${project.title} | HAL149`} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Textarea 
                id="metaDescription" 
                defaultValue={project.description}
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ogImage">Open Graph Image URL</Label>
              <Input id="ogImage" defaultValue={project.image} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ogTitle">Open Graph Title</Label>
              <Input 
                id="ogTitle" 
                defaultValue={`${project.title} | HAL149`} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ogDescription">Open Graph Description</Label>
              <Textarea 
                id="ogDescription" 
                defaultValue={project.description}
                className="min-h-[100px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 