import { getProjectBySlug, getProjects as getSupabaseProjects, getBlogPostBySlug, getBlogPosts as getSupabaseBlogPosts } from './db';

export async function getProjects() {
  return getSupabaseProjects();
}

export async function getProject(slug: string) {
  return getProjectBySlug(slug);
}

export async function getBlogPosts() {
  return getSupabaseBlogPosts();
}

export async function getBlogPost(slug: string) {
  return getBlogPostBySlug(slug);
}

export async function submitContactForm(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return true;
}