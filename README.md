# HAL149 Web Application

HAL149 is a modern web application built with Next.js for the company site of HAL149, an AI & technology consulting company. The platform serves as a dynamic showcase of the company's expertise, projects, blog articles, customer cases, and provides robust content management through a secure admin panel.

## 🚀 Features

- **Home Page:**
  - Hero section introducing the company
  - Features segment highlighting core services and differentiators
  - Highlighted projects and customer cases
  - Latest blog posts
  - Footer with menu and quick access links
- **Blog:**
  - Articles on AI, technology, and company updates
- **Projects & Customer Cases:**
  - Portfolio of completed projects and case studies
- **Contact Page:**
  - Contact form for inquiries
- **Legal Pages:**
  - Privacy Policy and Terms of Service
- **SEO & Social Optimization:**
  - All pages feature customizable metadata (title, description, keywords, Open Graph, Twitter Cards) for SEO and social sharing

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Database & Auth:** [Supabase](https://supabase.com/) (Postgres, Auth, Storage)
- **UI:** React, Tailwind CSS (or your chosen styling solution)
- **Hosting:** Vercel, Netlify, or compatible platforms

## 🗂️ Project Structure

- `app/` — Next.js app directory (pages, layouts, API routes)
- `components/` — Reusable React components (e.g., Hero, Features, Footer)
- `lib/supabase/` — Supabase client helpers for server and client
- `app/admin/` — Admin panel (login, dashboard, content editors)
- `app/api/` — API routes for revalidation and admin actions

## 🔐 Admin Panel

- **Authentication:**
  - Secure login with Supabase Auth
  - Route protection via Next.js middleware
- **Content Management:**
  - Manage blog posts, projects, customer cases, and static pages
  - Edit SEO metadata (title, description, keywords, og:image) for every page
  - All content and users are stored and managed in Supabase
- **Revalidation:**
  - On-demand and time-based cache revalidation for instant content updates

## 📈 SEO & Social Media

- Metadata for every page is editable via the admin panel
- Supports Open Graph and Twitter Card tags for rich sharing
- Home page provides default fallbacks for metadata

## ⚡ Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-org/hal149.git
   cd hal149
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Set up environment variables:**
   - Copy `.env.example` to `.env.local` and fill in your Supabase and site configuration.
   - Required variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY` (for server-side/admin operations)
     - `NEXT_PUBLIC_SITE_URL`

4. **Run locally:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

## 🚀 Deployment

- Deploy on Vercel, Netlify, or any platform that supports Next.js and environment variables.
- Ensure environment variables are set in your deployment dashboard.

## 📄 License

(C) HAL149. All rights reserved. For internal or client use only.

---

For questions or support, contact [info@hal149.com](mailto:info@hal149.com).
