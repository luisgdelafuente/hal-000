'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Globe } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle menu state, body scroll, and keyboard/resize events
  useEffect(() => {
    // Prevent scrolling when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Close menu on Escape key press
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    // Close menu on resize to desktop
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-300 bg-white dark:bg-slate-900 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="https://spebrqnqmrmeacntsrmp.supabase.co/storage/v1/object/public/assets//hallogoblack480.webp"
              alt="HAL149 Logo"
              width={200}
              height={50}
              className="h-12 w-auto"
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            href="/projects/" 
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Projects
          </Link>
          <Link 
            href="/blog/" 
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Blog
          </Link>
          <Link 
            href="/about/" 
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
          <Link 
            href="/contact/" 
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Contact
          </Link>
          <div className="flex items-center space-x-1 border-l pl-4 ml-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">EN</span>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-md text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Mobile Menu and Overlay */}
        {isMenuOpen && (
          <>
            {/* Overlay - covers the entire screen and closes menu when clicked */}
            <div 
              className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden" 
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />
            
            {/* Slide-in Menu Panel */}
            <div 
              id="mobile-menu"
              className="fixed top-0 right-0 z-50 h-full w-3/4 max-w-sm bg-white dark:bg-slate-900 shadow-lg md:hidden"
              role="dialog"
              aria-modal="true"
            >
              {/* Menu Content */}
              <nav className="p-6 pt-16">
                <ul className="space-y-6">
                  <li>
                    <Link 
                      href="/projects/" 
                      className="block text-lg font-medium hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/blog/" 
                      className="block text-lg font-medium hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/about/" 
                      className="block text-lg font-medium hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/contact/" 
                      className="block text-lg font-medium hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
                
                {/* Language Selector */}
                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <span className="text-lg font-medium">EN</span>
                  </div>
                </div>
              </nav>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
