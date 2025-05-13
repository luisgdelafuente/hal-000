import { Metadata } from 'next';
import { getSeoMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSeoMetadata('page', 'privacy'); 
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
      url: `${siteUrl}/privacy`, 
    },
    twitter: {
      card: 'summary_large_image',
      title: seoData.title,
      description: seoData.description,
      images: [seoData.ogImage],
    },
    alternates: {
      canonical: `${siteUrl}/privacy`, 
    }
  };
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 sm:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-6">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: April 15, 2025</p>
        
        <div className="prose max-w-none">
          <h2>Introduction</h2>
          <p>
            HAL149 ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, 
            use, disclose, and safeguard your information when you visit our website or use our services.
          </p>
          <p>
            Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, 
            please do not access the site or use our services.
          </p>
          
          <h2>Collection of Your Information</h2>
          <p>We may collect information about you in a variety of ways. The information we may collect includes:</p>
          
          <h3>Personal Data</h3>
          <p>
            Personally identifiable information, such as your name, email address, telephone number, and 
            other similar information that you voluntarily provide to us when registering or participating in our services.
          </p>
          
          <h3>Derivative Data</h3>
          <p>
            Information our servers automatically collect when you access our services, such as your IP address, 
            browser type, operating system, access times, and the pages you have viewed directly before and after accessing our services.
          </p>
          
          <h3>Mobile Device Data</h3>
          <p>
            Information from your mobile device, such as your mobile device ID number, model, 
            and manufacturer, if you access our services through a mobile device.
          </p>
          
          <h2>Use of Your Information</h2>
          <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via our services to:</p>
          <ul>
            <li>Create and manage your account</li>
            <li>Provide and deliver products and services you request</li>
            <li>Process transactions</li>
            <li>Send you technical notices, updates, security alerts, and support messages</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Communicate with you about products, services, offers, and events</li>
            <li>Develop and improve our services</li>
            <li>Monitor and analyze usage and trends to improve your experience</li>
            <li>Customize your experience and deliver content relevant to your interests</li>
          </ul>
          
          <h2>Disclosure of Your Information</h2>
          <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
          
          <h3>By Law or to Protect Rights</h3>
          <p>
            If we believe the release of information about you is necessary to respond to legal process, 
            to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, 
            we may share your information as permitted or required by any applicable law, rule, or regulation.
          </p>
          
          <h3>Third-Party Service Providers</h3>
          <p>
            We may share your information with third parties that perform services for us or on our behalf, 
            including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
          </p>
          
          <h2>Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information. 
            While we have taken reasonable steps to secure the personal information you provide to us, please be aware that 
            despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be 
            guaranteed against any interception or other type of misuse.
          </p>
          
          <h2>Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact us at:
          </p>
          <p>
            HAL149<br />
            123 AI Boulevard<br />
            San Francisco, CA 94107<br />
            United States<br />
            privacy@hal149.com
          </p>
        </div>
      </div>
    </div>
  );
}