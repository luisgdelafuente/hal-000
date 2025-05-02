import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function NewProjectForm() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">New Project</h1>
        <Button>Create Project</Button>
      </div>

      <div className="grid gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Basic Information</h2>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter project title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" placeholder="Enter URL slug" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input id="industry" placeholder="Enter industry" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Enter project description"
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Featured Image URL</Label>
              <Input id="image" placeholder="Enter image URL" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="technologies">Technologies (comma separated)</Label>
              <Input 
                id="technologies" 
                placeholder="Enter technologies" 
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
                placeholder="Enter about section"
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="challenge">Challenge</Label>
              <Textarea 
                id="challenge" 
                placeholder="Enter challenge section"
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="solution">Solution</Label>
              <Textarea 
                id="solution" 
                placeholder="Enter solution section"
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="results">Results</Label>
              <Textarea 
                id="results" 
                placeholder="Enter results section"
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
                placeholder="Enter meta title" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Textarea 
                id="metaDescription" 
                placeholder="Enter meta description"
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ogImage">Open Graph Image URL</Label>
              <Input id="ogImage" placeholder="Enter Open Graph image URL" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ogTitle">Open Graph Title</Label>
              <Input 
                id="ogTitle" 
                placeholder="Enter Open Graph title" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ogDescription">Open Graph Description</Label>
              <Textarea 
                id="ogDescription" 
                placeholder="Enter Open Graph description"
                className="min-h-[100px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 