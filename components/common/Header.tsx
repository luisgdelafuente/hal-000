'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Globe } from "lucide-react";

const navLinks = [
  { href: "/projects/", label: "Projects" },
  { href: "/blog/", label: "Blog" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  // Close menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  // Render overlay and drawer outside header for correct stacking
  return (
    <>
      <header
        className={`sticky top-0 z-30 w-full border-b border-slate-200 transition-shadow ${scrolled ? "shadow-md" : "shadow-none"}`}
        style={{
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
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

          {/* Desktop Nav */}
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

          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center text-slate-700"
            onClick={() => setIsMenuOpen((o) => !o)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>
      {/* Overlay and Drawer rendered outside header for correct stacking */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden"
            aria-hidden
            onClick={() => setIsMenuOpen(false)}
          />
          <aside
            className={`fixed top-0 right-0 h-full w-4/5 max-w-xs z-50 bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:hidden
            ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
            tabIndex={-1}
            aria-label="Mobile menu"
          >
            <nav className="flex flex-col h-full py-8 px-6 overflow-y-auto">
              <button
                className="self-end mb-8"
                aria-label="Close menu"
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="h-7 w-7" />
              </button>
              <div className="flex flex-col gap-6">
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
              </div>
              <div className="flex items-center space-x-2 py-4 mt-auto">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <span className="text-base font-medium">EN</span>
              </div>
            </nav>
          </aside>
        </>
      )}
    </>
  );
};

export default Header;
