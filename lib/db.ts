import { supabase } from './supabase'
import type { BlogPost, ContactMessage, PageContent, Project, User, Waitlist } from './supabase'

// Projects
export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('id', { ascending: false })
  
  if (error) throw error
  return data as Project[]
}

export async function getProjectBySlug(slug: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
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
export async function getBlogPosts() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('published_at', { ascending: false })
  
  if (error) throw error
  return data as BlogPost[]
}

export async function getBlogPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
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
    .select('*')
    .eq('page', page)
    .single()
  
  if (error) throw error
  return data as PageContent
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