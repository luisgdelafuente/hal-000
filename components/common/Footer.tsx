import Link from 'next/link';
import { Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full border-t border-border/40 py-12" style={{ backgroundColor: '#f1f5f9' }}>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <span className="text-xl font-bold">HAL149</span>
            <p className="text-muted-foreground text-sm max-w-xs">
              Empowering the future with intelligent solutions.
            </p>
            <p className="text-xs text-muted-foreground/80">
              © 2025 HAL149. All rights reserved.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/about" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/blog" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/legal" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Legal
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/documentation" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/api-reference" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/support" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Language</h3>
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">English</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;