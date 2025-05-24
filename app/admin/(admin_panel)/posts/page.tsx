'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getAllBlogPosts, deleteBlogPost } from '@/lib/db';
import { 
  Eye, 
  Edit, 
  Trash2 
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function BlogPostsPage() {
  const [posts, setPosts] = useState<Awaited<ReturnType<typeof getAllBlogPosts>>>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const data = await getAllBlogPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    
    try {
      await deleteBlogPost(id);
      
      // Revalidate the blog listing page and home page after deleting post
      const revalidationSecret = process.env.NEXT_PUBLIC_REVALIDATION_SECRET;
      if (revalidationSecret) {
        try {
          // Revalidate the blog listing page
          const listingRes = await fetch(`/api/revalidate?secret=${revalidationSecret}&path=/blog`, {
            method: 'POST',
          });
          if (!listingRes.ok) {
            console.error('Failed to revalidate blog listing page:', await listingRes.json());
          } else {
            console.log('Blog listing page revalidated successfully:', await listingRes.json());
          }

          // Revalidate home page (in case it shows latest blog posts)
          const homeRes = await fetch(`/api/revalidate?secret=${revalidationSecret}&path=/`, {
            method: 'POST',
          });
          if (!homeRes.ok) {
            console.error('Failed to revalidate home page:', await homeRes.json());
          } else {
            console.log('Home page revalidated successfully:', await homeRes.json());
          }
        } catch (error) {
          console.error('Error calling revalidation API for deleted blog post:', error);
        }
      } else {
        console.warn('NEXT_PUBLIC_REVALIDATION_SECRET is not set. Skipping revalidation call.');
      }
      
      await fetchPosts();
    } catch (error) {
      console.error('Error deleting blog post:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <Button asChild>
          <Link href="/admin/posts/new/">
            New Post
          </Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Published At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.published_at ? 'Published' : 'Draft'}</TableCell>
              <TableCell>
                {post.published_at
                  ? new Date(post.published_at).toLocaleDateString()
                  : '-'}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Link href={`/blog/${post.slug}/`} target="_blank">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="icon" asChild>
                    <Link href={`/admin/posts/${post.slug}/`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(post.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 