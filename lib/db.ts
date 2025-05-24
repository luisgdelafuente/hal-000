import { supabase } from './supabase'
import type { BlogPost, ContactMessage, PageContent, Project, User, Waitlist } from './supabase'

// Projects
export async function getProjects(options?: { limit?: number }) {
  let query = supabase
    .from('projects')
    .select('*')
    .order('id', { ascending: false });

  // Apply limit if provided
  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;
  
  if (error) throw error
  return data as Project[]
}

export async function getProjectBySlug(slug: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('id, title, slug, description, content, category, image_url, is_featured, github_url, demo_url, meta_title, meta_description, meta_keywords, og_image_url')
    .eq('slug', slug)
    .single()
  
  if (error) throw error
  return data as Project
}

export async function createProject(project: Omit<Project, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select()
    .single()
  
  if (error) throw error
  return data as Project
}

export async function updateProject(id: number, updates: Partial<Project>) {
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data as Project
}

export async function deleteProject(id: number) {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}

// Blog Posts
export async function getBlogPosts(options?: { limit?: number }) {
  let query = supabase
    .from('blog_posts')
    .select('*')
    .not('published_at', 'is', null) // Only get published posts
    .order('published_at', { ascending: false });

  // Apply limit if provided
  if (options?.limit) {
    query = query.limit(options.limit);
  }
  
  const { data, error } = await query;
  
  if (error) throw error
  return data as BlogPost[]
}

export async function getAllBlogPosts(options?: { limit?: number }) {
  let query = supabase
    .from('blog_posts')
    .select('*')
    .order('id', { ascending: false }); // Order by ID for admin (creation order)

  // Apply limit if provided
  if (options?.limit) {
    query = query.limit(options.limit);
  }
  
  const { data, error } = await query;
  
  if (error) throw error
  return data as BlogPost[]
}

export async function getBlogPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, content, image_url, published_at, meta_title, meta_description, meta_keywords, og_image_url')
    .eq('slug', slug)
    .single()
  
  if (error) throw error
  return data as BlogPost
}

export async function createBlogPost(post: Omit<BlogPost, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([post])
    .select()
    .single()
  
  if (error) throw error
  return data as BlogPost
}

export async function updateBlogPost(id: number, updates: Partial<BlogPost>) {
  const { data, error } = await supabase
    .from('blog_posts')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data as BlogPost
}

export async function deleteBlogPost(id: number) {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}

// Page Contents
export async function getPageContent(page: string) {
  const { data, error } = await supabase
    .from('page_contents')
    .select('id, page, content, meta_title, meta_description, meta_keywords, og_image_url')
    .eq('page', page)
    .single();

  // ONE-TIME DEBUG LOG
  if (page === 'contact') {
    console.log('[DEBUG] getPageContent raw data for contact:', data);
  }

  if (error) throw error;
  return data as PageContent;
}

export async function updatePageContent(id: number, updates: Partial<PageContent>) {
  const { data, error } = await supabase
    .from('page_contents')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data as PageContent
}

export async function getAllPages() {
  const { data, error } = await supabase
    .from('page_contents')
    .select('*')
    .order('page', { ascending: true });

  if (error) throw error;
  return data as PageContent[];
}

// Contact Messages
export async function createContactMessage(message: Omit<ContactMessage, 'id' | 'submitted_at' | 'read'>) {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert([message])
    .select()
    .single()
  
  if (error) throw error
  return data as ContactMessage
}

export async function deleteContactMessage(id: number) {
  const { error } = await supabase
    .from('contact_messages')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}

// Waitlist
export async function addToWaitlist(email: string) {
  const { data, error } = await supabase
    .from('waitlist')
    .insert([{ email }])
    .select()
    .single()
  
  if (error) throw error
  return data as Waitlist
}

export async function getAllWaitlist() {
  const { data, error } = await supabase
    .from('waitlist')
    .select('*')
    .order('submitted_at', { ascending: false });

  if (error) throw error;
  return data as Waitlist[];
}

// Services
export async function getServices() {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('id', { ascending: true });
  if (error) throw error;
  return data;
}

// Admin Functions
export async function getUnreadMessages() {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .eq('read', false)
    .order('submitted_at', { ascending: false })
  
  if (error) throw error
  return data as ContactMessage[]
}

export async function markMessageAsRead(id: number) {
  const { data, error } = await supabase
    .from('contact_messages')
    .update({ read: true })
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data as ContactMessage
} 