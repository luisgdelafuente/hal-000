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
  content: z.string().min(1, 'Content is required'),
});

export default function EditPageContentPage({ params }: { params: { page: string } }) {
  const router = useRouter();
  const [pageContent, setPageContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const form = useForm<z.infer<typeof pageContentFormSchema>>({
    resolver: zodResolver(pageContentFormSchema),
    defaultValues: {
      content: '',
    },
  });

  useEffect(() => {
    async function loadPageContent() {
      try {
        const data = await getPageContent(params.page);
        setPageContent(data);
        form.reset({
          content: data.content,
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
      await updatePageContent(pageContent.id, values);
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
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Page content"
                    className="min-h-[400px]"
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