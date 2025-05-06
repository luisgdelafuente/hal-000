'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle menu state and body scroll
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    // Prevent scrolling when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleEscape);
    
    // Cleanup
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-300 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
          className="md:hidden p-2 rounded-md text-muted-foreground hover:bg-muted/50 transition-colors"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Mobile Menu Overlay */}
        <div 
          className={cn(
            "fixed inset-0 z-30 bg-background/80 backdrop-blur-sm transition-opacity duration-300 md:hidden",
            isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Mobile Menu */}
        <div 
          className={cn(
            "fixed top-16 inset-x-0 bottom-0 z-40 bg-background shadow-lg transition-all duration-300 ease-in-out md:hidden overflow-y-auto",
            isMenuOpen ? "translate-y-0 opacity-100 visible" : "translate-y-[100vh] opacity-0 invisible"
          )}
          aria-hidden={!isMenuOpen}
        >
          <nav className="flex flex-col h-full">
            <div className="flex-1 px-6 py-8 space-y-4">
              <Link 
                href="/projects/" 
                className="block text-lg font-medium py-3 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
              <Link 
                href="/blog/" 
                className="block text-lg font-medium py-3 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/about/" 
                className="block text-lg font-medium py-3 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact/" 
                className="block text-lg font-medium py-3 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
            <div className="border-t px-6 py-4">
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <span className="text-base font-medium">EN</span>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
