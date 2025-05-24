'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getBlogPostBySlug, updateBlogPost } from '@/lib/db';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const blogPostFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  content: z.string().min(1, 'Content is required'),
  image_url: z.string().url('Must be a valid URL'),
  published: z.boolean().default(false),
  // SEO Metadata fields
  meta_title: z.string().optional().default(''),
  meta_description: z.string().optional().default(''),
  meta_keywords: z.string().optional().default(''),
  og_image_url: z.preprocess(
    (val) => (val === '' ? undefined : val), 
    z.string().url('Must be a valid URL').optional().or(z.literal(''))
  ),
});

export default function EditBlogPostPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const form = useForm<z.infer<typeof blogPostFormSchema>>({
    resolver: zodResolver(blogPostFormSchema),
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      image_url: '',
      published: false,
      // SEO Metadata defaults
      meta_title: '',
      meta_description: '',
      meta_keywords: '',
      og_image_url: '',
    },
  });

  useEffect(() => {
    async function loadPost() {
      try {
        const data = await getBlogPostBySlug(params.slug);
        setPost(data);
        form.reset({
          ...data,
          published: !!data.published_at,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error loading blog post:', error);
        setLoading(false);
      }
    }
    loadPost();
  }, [params.slug, form]);

  async function onSubmit(values: z.infer<typeof blogPostFormSchema>) {
    try {
      const postData = {
        title: values.title,
        slug: values.slug,
        excerpt: values.excerpt,
        content: values.content,
        image_url: values.image_url,
        published_at: values.published ? new Date().toISOString() : undefined,
        meta_title: values.meta_title,
        meta_description: values.meta_description,
        meta_keywords: values.meta_keywords,
        og_image_url: values.og_image_url,
      };
      await updateBlogPost(post.id, postData);

      // Revalidate the path
      const revalidationSecret = process.env.NEXT_PUBLIC_REVALIDATION_SECRET;
      const pathToRevalidate = `/blog/${values.slug}`;

      if (revalidationSecret) {
        try {
          // Revalidate the individual blog post
          const res = await fetch(`/api/revalidate?secret=${revalidationSecret}&path=${pathToRevalidate}`, {
            method: 'POST',
          });
          if (!res.ok) {
            console.error('Failed to revalidate blog post path:', await res.json());
          } else {
            console.log('Blog post path revalidated successfully:', await res.json());
          }

          // Also revalidate the blog listing page
          const listingRes = await fetch(`/api/revalidate?secret=${revalidationSecret}&path=/blog`, {
            method: 'POST',
          });
          if (!listingRes.ok) {
            console.error('Failed to revalidate blog listing page:', await listingRes.json());
          } else {
            console.log('Blog listing page revalidated successfully:', await listingRes.json());
          }
        } catch (error) {
          console.error('Error calling revalidation API for blog post:', error);
        }
      } else {
        console.warn('NEXT_PUBLIC_REVALIDATION_SECRET is not set. Skipping revalidation call.');
      }

      router.push('/admin/posts');
    } catch (error) {
      console.error('Error updating blog post:', error);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Blog post not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Edit Blog Post</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Blog post title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="blog-post-slug" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Publish Now</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      If checked, the post will be published immediately
                    </p>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Excerpt</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Brief post excerpt"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Blog post content"
                    className="min-h-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* SEO Metadata Fields */}
          <div className="space-y-4 rounded-md border p-4">
            <h3 className="text-lg font-medium">SEO & Social Media Metadata</h3>
            <FormField
              control={form.control}
              name="meta_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Page title for SEO" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="meta_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Page description for SEO (max 160 characters recommended)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="meta_keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Keywords</FormLabel>
                  <FormControl>
                    <Input placeholder="Comma-separated keywords" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="og_image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Open Graph Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image-for-social.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/posts')}
            >
              Cancel
            </Button>
            <Button type="submit">Update Post</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}