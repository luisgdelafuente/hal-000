'use client';

import * as React from 'react';

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
import { createBlogPost } from '@/lib/db';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const blogPostFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  content: z.string().min(1, 'Content is required'),
  image_url: z.string().url('Must be a valid URL'),
  meta_title: z.string().optional().default(''),
  meta_description: z.string().optional().default(''),
  meta_keywords: z.string().optional().default(''),
  og_image_url: z.preprocess(
    (val) => (val === '' ? undefined : val),
    z.string().url('Must be a valid URL').optional().or(z.literal(''))
  ),
});

export default function NewBlogPostPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const form = useForm<z.infer<typeof blogPostFormSchema>>({
    resolver: zodResolver(blogPostFormSchema),
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      image_url: '',
      meta_title: '',
      meta_description: '',
      meta_keywords: '',
      og_image_url: '',
    },
  });

  async function onSubmit(values: z.infer<typeof blogPostFormSchema>) {
    setErrorMessage(null);
    try {
      const postData = {
        ...values,
        published_at: new Date().toISOString(),
        meta_title: values.meta_title,
        meta_description: values.meta_description,
        meta_keywords: values.meta_keywords,
        og_image_url: values.og_image_url,
      };
      await createBlogPost(postData);
      router.push('/admin/posts');
    } catch (error: any) {
      let msg = 'Error creating blog post.';
      if (error && typeof error === 'object' && 'message' in error) {
        msg = error.message as string;
      }
      setErrorMessage(msg);
      console.error('Error creating blog post:', error);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">New Blog Post</h1>
      </div>

      {errorMessage && (
        <div className="mb-4 p-3 rounded bg-red-100 text-red-800 border border-red-300">
          {errorMessage}
        </div>
      )}
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
            <Button type="submit">Create Post</Button>
          </div>
        </form>
      </Form>
    </div>
  );
} 