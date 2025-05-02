import { projects, blogPosts } from './data';

export async function getProjects() {
  return projects;
}

export async function getProject(slug: string) {
  return projects.find(project => project.slug === slug) || null;
}

export async function getBlogPosts() {
  return blogPosts;
}

export async function getBlogPost(slug: string) {
  return blogPosts.find(post => post.slug === slug) || null;
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