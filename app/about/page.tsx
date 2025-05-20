import { Metadata } from 'next';
import { getSeoMetadata } from '@/lib/metadata';
import { getPageContent } from '@/lib/db';

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSeoMetadata('page', 'about'); 
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';

  return {
    title: seoData.title, 
    description: seoData.description, 
    keywords: seoData.keywords,
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      images: [{ url: seoData.ogImage }],
      type: 'website',
      url: `${siteUrl}/about`, 
    },
    twitter: {
      card: 'summary_large_image',
      title: seoData.title,
      description: seoData.description,
      images: [seoData.ogImage],
    },
    alternates: {
      canonical: `${siteUrl}/about`, 
    }
  };
}

export default async function AboutPage() {
  let pageTitleContent = "About Us";
  let visionContent = "";

  try {
    const aboutPageData = await getPageContent('about');
    if (!aboutPageData || !aboutPageData.content) {
      pageTitleContent = "About Page Not Found";
      visionContent = "";
    } else {
      let parsedContent: { title?: string; vision?: string } | undefined = undefined;
      if (typeof aboutPageData.content === 'string') {
        try {
          parsedContent = JSON.parse(aboutPageData.content);
        } catch {
          parsedContent = undefined;
        }
      } else {
        parsedContent = aboutPageData.content;
      }
      if (parsedContent) {
        if (parsedContent.title && typeof parsedContent.title === 'string' && parsedContent.title.trim() !== '') {
          pageTitleContent = parsedContent.title;
        }
        if (parsedContent.vision && typeof parsedContent.vision === 'string') {
          visionContent = parsedContent.vision;
        }
      }
    }
  } catch (error: any) {
    pageTitleContent = "Page Load Error";
    visionContent = "";
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 py-12">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">{pageTitleContent}</h1>
      </div>
      <div className="max-w-3xl mx-auto mb-12">
        <article className="prose max-w-none mx-auto">
          {visionContent.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </article>
      </div>
    </div>
  );
}