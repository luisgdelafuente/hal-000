import { Metadata } from 'next';
import { getSeoMetadata } from '@/lib/metadata';
import ContactForm from '../components/contact/ContactForm';

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSeoMetadata('page', 'contact'); 
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
      url: `${siteUrl}/contact`, 
    },
    twitter: {
      card: 'summary_large_image',
      title: seoData.title,
      description: seoData.description,
      images: [seoData.ogImage],
    },
    alternates: {
      canonical: `${siteUrl}/contact`, 
    }
  };
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 sm:px-8 py-12">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Contact Us</h1>
        <p className="text-lg text-muted-foreground">
          Get in touch with our team for more information about our AI solutions
        </p>
      </div>
      
      <div className="flex justify-center mt-8">
        <div className="w-full max-w-xl">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}