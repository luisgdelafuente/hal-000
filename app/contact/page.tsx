import { Mail, MapPin, Phone } from 'lucide-react';
import { Metadata } from 'next';
import ContactForm from '../components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact | HAL149',
  description: 'Get in touch with HAL149 for AI solutions tailored to your business needs.',
  openGraph: {
    title: 'Contact HAL149',
    description: 'Get in touch with HAL149 for AI solutions tailored to your business needs.',
    url: 'https://hal149.com/contact',
    images: [
      {
        url: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
        width: 1200,
        height: 630,
        alt: 'Contact HAL149',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact HAL149',
    description: 'Get in touch with HAL149 for AI solutions tailored to your business needs.',
    images: ['https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg'],
  },
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 sm:px-8 py-12">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Contact Us</h1>
        <p className="text-lg text-muted-foreground">
          Get in touch with our team for more information about our AI solutions
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <div className="bg-muted/30 p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">info@hal149.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-muted-foreground">
                    123 AI Boulevard<br />
                    San Francisco, CA 94107<br />
                    United States
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-muted/30 p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-6">Business Hours</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monday - Friday</span>
                <span>9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Saturday</span>
                <span>10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sunday</span>
                <span>Closed</span>
              </div>
            </div>
          </div>
        </div>
        
        <ContactForm />
      </div>
    </div>
  );
}