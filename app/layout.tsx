import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://hal149.com'),
  title: {
    default: 'HAL149 - AI Services for Business',
    template: '%s | HAL149',
  },
  description: 'Empowering businesses with intelligent AI solutions',
  keywords: ['AI', 'Artificial Intelligence', 'Business Solutions', 'Machine Learning', 'Data Analytics'],
  authors: [{ name: 'HAL149 Team' }],
  creator: 'HAL149',
  publisher: 'HAL149',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hal149.com',
    siteName: 'HAL149',
    title: 'HAL149 - AI Services for Business',
    description: 'Empowering businesses with intelligent AI solutions',
    images: [
      {
        url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
        width: 1200,
        height: 630,
        alt: 'HAL149 - AI Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HAL149 - AI Services for Business',
    description: 'Empowering businesses with intelligent AI solutions',
    images: ['https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg'],
    creator: '@hal149',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
          @tailwind base;
          @tailwind components;
          @tailwind utilities;
          :root {
            --foreground-rgb: 0, 0, 0;
            --background-start-rgb: 214, 219, 220;
            --background-end-rgb: 255, 255, 255;
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --foreground-rgb: 255, 255, 255;
              --background-start-rgb: 0, 0, 0;
              --background-end-rgb: 0, 0, 0;
            }
          }
          /* ...rest of your globals.css here... */
        `}</style>
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}