import { getPageContent, PageContent } from '@/lib/db'; // Assuming PageContent type is exported or adjust as needed
import { getSeoMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Optional: Time-based revalidation (e.g., every hour)
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getPageContent('legal');

  if (!pageData) {
    // Fallback metadata if pageData is not found, or you can choose to throw an error
    return getSeoMetadata({
      title: 'Legal Information',
      description: 'Privacy Policy and Terms of Service.',
    });
  }

  return getSeoMetadata({
    title: pageData.meta_title || 'Legal Information',
    description: pageData.meta_description || 'Our Privacy Policy and Terms of Service.',
    keywords: pageData.meta_keywords ? pageData.meta_keywords.split(',').map(k => k.trim()) : ['legal', 'privacy', 'terms'],
    og_image_url: pageData.og_image_url,
  });
}

interface Section {
  title: string;
  content: string;
}

interface LegalContent {
  title?: string; // For the main H1
  sections?: Section[];
  // The 'metadata' object from the user's JSON is handled by 
  // pageData.meta_title, pageData.meta_description etc. in generateMetadata
}

// Helper function to format plain text with newlines into HTML paragraphs
function formatTextToHtml(text: string): string {
  if (!text) return '';
  return text
    .split('\n\n') // Split by double newlines for paragraphs
    .map(paragraph => `<p>${paragraph.replace(/\n/g, '<br />')}</p>`) // Replace single newlines with <br>
    .join('');
}

export default async function LegalPage() {
  const pageData = await getPageContent('legal');

  console.log('--- DEBUG: Raw pageData ---', pageData);

  if (!pageData || !pageData.content) {
    console.error('--- DEBUG: pageData or pageData.content is missing ---');
    notFound(); // Or display a more user-friendly message
  }

  console.log('--- DEBUG: pageData.content (before type assertion) ---', JSON.stringify(pageData.content, null, 2));

  const content = pageData.content as LegalContent;

  console.log('--- DEBUG: content (after type assertion) ---', JSON.stringify(content, null, 2));
  console.log('--- DEBUG: content.title ---', content.title);
  console.log('--- DEBUG: content.sections ---', content.sections);

  const pageTitle = content.title || pageData.meta_title || 'Legal Information';

  return (
    <div className="container mx-auto px-4 sm:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{pageTitle}</h1>
        </div>
        <article className="prose max-w-none mx-auto">
          {content.sections && content.sections.length > 0 ? (
            content.sections.map((section, index) => (
              <section key={index} className={index < content.sections!.length - 1 ? "mb-12" : ""}>
                <h2 className="text-2xl font-semibold mb-4 border-b pb-2 dark:border-slate-700">
                  {section.title}
                </h2>
                <div dangerouslySetInnerHTML={{ __html: formatTextToHtml(section.content) }} />
              </section>
            ))
          ) : (
            <p>Legal content is not yet available. Please check back later.</p>
          )}
        </article>
      </div>
    </div>
  );
}
