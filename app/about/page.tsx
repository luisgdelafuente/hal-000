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
  let pageTitleContent = "About Us"; // Default page title
  let visionContent = "[[DEFAULT VISION TEXT - SHOULD BE OVERWRITTEN]]";

  try {
    const aboutPageData = await getPageContent('about');

    if (!aboutPageData) {
      pageTitleContent = "About Page Not Found";
      visionContent = "[[FALLBACK: No data returned for 'about' page from database.]]";
    } else if (aboutPageData.content === null || aboutPageData.content === undefined) {
      pageTitleContent = "About Page Content Missing";
      visionContent = "[[FALLBACK: 'about' page data found, but its 'content' field is null or undefined.]]";
    } else if (typeof aboutPageData.content === 'string') {
      try {
        const parsedContent = JSON.parse(aboutPageData.content);
        
        if (typeof parsedContent !== 'object' || parsedContent === null) {
          pageTitleContent = "Invalid Page Structure";
          visionContent = "[[FALLBACK: 'content' string parsed, but is not a valid object.]]";
        } else {
          const pageSpecificContent = parsedContent as { title?: unknown; vision?: unknown; [key: string]: unknown };

          // Set Page Title from JSON
          if (pageSpecificContent.hasOwnProperty('title') && typeof pageSpecificContent.title === 'string' && pageSpecificContent.title.trim() !== '') {
            pageTitleContent = pageSpecificContent.title;
          } else {
            pageTitleContent = "About (Title Missing)"; // Fallback if title is not a valid string
            console.warn("'title' field is missing, not a string, or empty in 'about' page content.");
          }

          // Set Vision Content from JSON
          if (!pageSpecificContent.hasOwnProperty('vision')) {
            visionContent = "[[FALLBACK: Parsed 'content' object found, but 'vision' key is missing.]]";
          } else if (pageSpecificContent.vision === null || pageSpecificContent.vision === undefined) {
            visionContent = "[[FALLBACK: 'vision' key found, but its value is null or undefined.]]";
          } else if (typeof pageSpecificContent.vision !== 'string') {
            visionContent = `[[FALLBACK: 'vision' key found, but its value is not a string. Type: ${typeof pageSpecificContent.vision}]]`;
          } else if (pageSpecificContent.vision === '') {
            visionContent = "[[INFO: 'vision' content is an empty string.]]";
          } else {
            visionContent = pageSpecificContent.vision; // Success for vision
          }
        }
      } catch (parseError: any) {
        console.error("Error parsing 'about' page content string as JSON:", parseError);
        pageTitleContent = "Content Error";
        visionContent = `[[ERROR: Failed to parse 'content' string as JSON: ${parseError.message}]]`;
      }
    } else {
      // This case handles if content is already an object, which it shouldn't be if DB stores it as string.
      // Adding for completeness, assuming it might be an object in some scenarios.
      pageTitleContent = "Unexpected Content Format";
      visionContent = `[[FALLBACK: 'about' page 'content' field was an object, not a string as expected. Type: ${typeof aboutPageData.content}]]`;
       // If it IS an object, you could try to read title/vision directly here, similar to above.
       const directObjectContent = aboutPageData.content as { title?: unknown; vision?: unknown; [key: string]: unknown };
       if (directObjectContent.hasOwnProperty('title') && typeof directObjectContent.title === 'string' && directObjectContent.title.trim() !== ''){
           pageTitleContent = directObjectContent.title;
       } // else it keeps "Unexpected Content Format"
       if (directObjectContent.hasOwnProperty('vision') && typeof directObjectContent.vision === 'string'){
           visionContent = directObjectContent.vision;
       } // else it keeps the fallback for vision
    }
  } catch (error: any) {
    console.error("Error fetching 'about' page content for About page:", error);
    pageTitleContent = "Page Load Error";
    visionContent = `[[ERROR: An exception occurred while fetching content: ${error.message}]]`;
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 py-12">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        {/* Use the dynamic pageTitleContent here */}
        <h1 className="text-4xl font-bold tracking-tight mb-4">{pageTitleContent}</h1>
        {/* The hardcoded subtitle <p> tag below has been removed */}
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