'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="w-full py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-8 text-center">
        <div 
          className="inline-block px-3 py-1 mb-6 text-sm font-medium rounded-full dark:bg-slate-700" 
          style={{ backgroundColor: '#e2e8f0' }} /* Forcing slate-200 background */
        >
          Coming Soon
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl mx-auto mb-6 min-h-[56px]">
          Industry-Specific AI Applications
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Transform data into insights, automate workflows, and stay ahead
          of the competition.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/blog"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-10 px-4 py-2 shadow hover:bg-black/90"
            style={{ backgroundColor: 'black', color: 'white' }}
          >
            Read Our Blog
          </Link>
          <Link 
            href="#waitlist"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-10 px-4 py-2 text-secondary-foreground shadow hover:bg-slate-300 dark:hover:bg-slate-600 dark:bg-slate-700"
            style={{ backgroundColor: '#e2e8f0' }} /* Forcing slate-200 background */
          >
            Join Waitlist
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;