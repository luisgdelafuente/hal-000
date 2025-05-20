import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
//   throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
// }
// if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
//   throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY')
// }

export const supabase = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Helper for SSR/serverless usage
export function createClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Types for your database tables
export type BlogPost = {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  image_url: string
  published_at: string
  // New optional meta fields
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
  og_image_url?: string | null;
}

export type ContactMessage = {
  id: number
  name: string
  email: string
  subject: string
  message: string
  submitted_at: string | null
  read: boolean | null
}

export type PageContent = {
  id: number
  page: string
  content: any // jsonb type
  updated_at: string
  // New optional meta fields
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
  og_image_url?: string | null;
}

export type Project = {
  id: number
  title: string
  slug: string
  description: string
  content: string
  category: string
  image_url: string
  is_featured: boolean | null
  github_url: string | null
  demo_url: string | null
  // New optional meta fields
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
  og_image_url?: string | null;
}

export type User = {
  id: number
  username: string
  password: string
}

export type Waitlist = {
  id: number
  email: string
  submitted_at: string
}

export type Service = {
  id: string
  title: string
  description: string
  icon: string
  created_at: string
  updated_at: string
}

export type Testimonial = {
  id: string
  name: string
  role: string
  content: string
  image_url: string
  created_at: string
  updated_at: string
}