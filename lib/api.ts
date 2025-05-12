import { getProjectBySlug, getProjects as getSupabaseProjects, getBlogPostBySlug, getBlogPosts as getSupabaseBlogPosts } from './db';

export async function getProjects() {
  return getSupabaseProjects();
}

// Add function to get limited number of featured projects
export async function getFeaturedProjects(limit: number = 3) {
  // Assuming getSupabaseProjects accepts a limit and returns the latest
  return getSupabaseProjects({ limit });
}

export async function getProject(slug: string) {
  return getProjectBySlug(slug);
}

// Modify getBlogPosts to accept an optional limit
export async function getBlogPosts(limit?: number) {
  // Assuming getSupabaseBlogPosts accepts a limit and returns the latest
  return getSupabaseBlogPosts({ limit });
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