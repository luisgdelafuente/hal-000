import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { blogPosts } from '@/lib/data';
import { notFound } from 'next/navigation';

interface PostFormProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function PostForm({ params }: PostFormProps) {
  const post = blogPosts.find(p => p.slug === params.slug);
  
  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Edit Blog Post</h1>
        <div className="flex gap-2">
          <Button>Save Changes</Button>
          <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
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
              <Input id="title" defaultValue={post.title} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" defaultValue={post.slug} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Publication Date</Label>
              <Input 
                id="date" 
                type="date" 
                defaultValue={post.date} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea 
                id="excerpt" 
                defaultValue={post.excerpt}
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Featured Image URL</Label>
              <Input id="image" defaultValue={post.image} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea 
                id="content" 
                defaultValue={post.content}
                className="min-h-[300px]"
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
                defaultValue={`${post.title} | HAL149 Blog`} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Textarea 
                id="metaDescription" 
                defaultValue={post.excerpt}
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ogImage">Open Graph Image URL</Label>
              <Input id="ogImage" defaultValue={post.image} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ogTitle">Open Graph Title</Label>
              <Input 
                id="ogTitle" 
                defaultValue={`${post.title} | HAL149 Blog`} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ogDescription">Open Graph Description</Label>
              <Textarea 
                id="ogDescription" 
                defaultValue={post.excerpt}
                className="min-h-[100px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 