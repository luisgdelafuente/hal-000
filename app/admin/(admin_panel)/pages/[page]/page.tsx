'use client';

import { Button } from '@/components/ui/button';
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
import { getPageContent, updatePageContent } from '@/lib/db';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const pageContentFormSchema = z.object({
  content: z.string().min(1, 'Content is required').refine((val) => {
    try {
      JSON.parse(val);
      return true;
    } catch {
      return false;
    }
  }, { message: 'Content must be valid JSON.' }),
  // SEO Metadata fields
  meta_title: z.string().optional().default(''),
  meta_description: z.string().optional().default(''),
  meta_keywords: z.string().optional().default(''),
  og_image_url: z.preprocess(
    (val) => (val === '' ? undefined : val), 
    z.string().url('Must be a valid URL').optional().or(z.literal(''))
  ),
});

export default function EditPageContentPage({ params }: { params: { page: string } }) {
  const router = useRouter();
  const [pageContent, setPageContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const form = useForm<z.infer<typeof pageContentFormSchema>>({
    resolver: zodResolver(pageContentFormSchema),
    defaultValues: {
      content: '',
      // SEO Metadata defaults
      meta_title: '',
      meta_description: '',
      meta_keywords: '',
      og_image_url: '',
    },
  });

  useEffect(() => {
    async function loadPageContent() {
      try {
        const data = await getPageContent(params.page);
        setPageContent(data);
        let contentString = '';
        if (!data || !data.content) {
          // Provide mock content for new pages
          if (params.page === 'about') {
            contentString = JSON.stringify({ title: 'About Us', vision: 'Our mission is to empower users with AI.' }, null, 2);
          } else if (params.page === 'legal') {
            contentString = JSON.stringify({ title: 'Legal Information', sections: [{ title: 'Terms', content: 'Sample legal terms.' }] }, null, 2);
          } else if (params.page === 'privacy') {
            contentString = JSON.stringify({ title: 'Privacy Policy', sections: [{ title: 'Introduction', content: 'Your privacy matters.' }] }, null, 2);
          } else if (params.page === 'terms') {
            contentString = JSON.stringify({ title: 'Terms of Service', sections: [{ title: 'Agreement', content: 'These are the terms.' }] }, null, 2);
          } else {
            contentString = JSON.stringify({ title: params.page, content: '' }, null, 2);
          }
        } else if (typeof data.content === 'string') {
          contentString = data.content;
        } else {
          // If content is an object, stringify it for editing
          contentString = JSON.stringify(data.content, null, 2);
        }
        form.reset({
          content: contentString,
          meta_title: data.meta_title || '',
          meta_description: data.meta_description || '',
          meta_keywords: data.meta_keywords || '',
          og_image_url: data.og_image_url || '',
        });
        setLoading(false);
      } catch (error) {
        console.error('Error loading page content:', error);
        setLoading(false);
      }
    }
    loadPageContent();
  }, [params.page, form]);

  async function onSubmit(values: z.infer<typeof pageContentFormSchema>) {
    try {
      // Always save content as a JSON string
      const toSave = {
        ...values,
        content: JSON.stringify(JSON.parse(values.content)), // Ensure valid JSON string
      };
      await updatePageContent(pageContent.id, toSave);

      // Revalidate the path
      const revalidationSecret = process.env.NEXT_PUBLIC_REVALIDATION_SECRET;
      let pathToRevalidate = `/${params.page}`;
      if (params.page === 'home') {
        pathToRevalidate = '/';
      }

      if (revalidationSecret) {
        try {
          const res = await fetch(`/api/revalidate?secret=${revalidationSecret}&path=${pathToRevalidate}`, {
            method: 'POST',
          });
          if (!res.ok) {
            console.error(`Failed to revalidate static page path (${pathToRevalidate}):`, await res.json());
          } else {
            console.log(`Static page path (${pathToRevalidate}) revalidated successfully:`, await res.json());
          }
        } catch (error) {
          console.error(`Error calling revalidation API for static page (${pathToRevalidate}):`, error);
        }
      } else {
        console.warn('NEXT_PUBLIC_REVALIDATION_SECRET is not set. Skipping revalidation call.');
      }

      router.push('/admin/pages');
    } catch (error) {
      console.error('Error updating page content:', error);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!pageContent) {
    return <div>Page content not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Edit {params.page} Page</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                    <Input placeholder="Page title for SEO" {...field} value={field.value || ''} />
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
                      value={field.value || ''}
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
                    <Input placeholder="Comma-separated keywords" {...field} value={field.value || ''} />
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
                    <Input placeholder="https://example.com/image-for-social.jpg" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content (JSON)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='{"title": "Page Title", "subtitle": "Page subtitle", ...}'
                    className="min-h-[400px] font-mono"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/pages')}
            >
              Cancel
            </Button>
            <Button type="submit">Update Page</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}