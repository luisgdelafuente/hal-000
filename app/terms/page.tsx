import { Metadata } from 'next';
import { getSeoMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSeoMetadata('page', 'terms'); 
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
      url: `${siteUrl}/terms`, 
    },
    twitter: {
      card: 'summary_large_image',
      title: seoData.title,
      description: seoData.description,
      images: [seoData.ogImage],
    },
    alternates: {
      canonical: `${siteUrl}/terms`, 
    }
  };
}

import { getPageContent } from '@/lib/db';

interface Section { title: string; content: string; }
interface TermsContent { title?: string; sections?: Section[]; }

function formatTextToHtml(text: string): string {
  if (!text) return '';
  return text
    .split('\n\n')
    .map(paragraph => `<p>${paragraph.replace(/\n/g, '<br />')}</p>`)
    .join('');
}

export default async function TermsPage() {
  const pageData = await getPageContent('terms');
  if (!pageData || !pageData.content) return <div>Terms of Service not found.</div>;

  let content: TermsContent | undefined;
  if (typeof pageData.content === 'string') {
    try {
      content = JSON.parse(pageData.content);
    } catch {
      content = undefined;
    }
  } else {
    content = pageData.content as TermsContent;
  }
  const pageTitle = content?.title || pageData.meta_title || 'Terms of Service';

  return (
    <div className="container mx-auto px-4 sm:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{pageTitle}</h1>
        </div>
        <article className="prose max-w-none mx-auto">
          {content?.sections && content.sections.length > 0 ? (
            content.sections.map((section, index) => (
              <section key={index} className={index < content.sections.length - 1 ? "mb-12" : ""}>
                <h2 className="text-2xl font-semibold mb-4 border-b pb-2 dark:border-slate-700">
                  {section.title}
                </h2>
                <div dangerouslySetInnerHTML={{ __html: formatTextToHtml(section.content) }} />
              </section>
            ))
          ) : (
            <p>Terms content is not yet available. Please check back later.</p>
          )}
        </article>
      </div>
    </div>
  );
}