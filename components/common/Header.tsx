'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Globe, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect for better visual experience
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { href: '/projects/', label: 'Projects' },
    { href: '/blog/', label: 'Blog' },
    { href: '/about/', label: 'About' },
    { href: '/contact/', label: 'Contact' }
  ];

  return (
    <header className={`sticky top-0 z-50 w-full border-b border-slate-300 bg-white backdrop-blur supports-[backdrop-filter]:bg-background/60 ${scrolled ? 'shadow-sm' : ''}`}>
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

        {/* Desktop Navigation - hidden on mobile */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center space-x-1 border-l pl-4 ml-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">EN</span>
          </div>
        </nav>

        {/* Mobile menu button - visible only on mobile */}
        <button 
          className="md:hidden flex items-center text-slate-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMenuOpen(false)} />
      )}

      {/* Mobile menu drawer */}
      <div 
        className={`md:hidden fixed top-16 right-0 bottom-0 w-full sm:w-80 z-50 transform transition-transform duration-300 ease-in-out shadow-xl ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ backgroundColor: 'white' }}
      >
        <nav className="flex flex-col h-full py-6 px-6 bg-white">
          <div className="space-y-6 flex flex-col">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                className="text-lg font-medium py-2 text-slate-800 border-b border-slate-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center space-x-2 py-4 mt-auto">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <span className="text-base font-medium">EN</span>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
