'use client';

import { useState } from 'react';
import Link from 'next/link';
import { addToWaitlist } from '@/lib/db';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      await addToWaitlist(email);
      setIsSuccess(true);
      setEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full py-20 border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-8 max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Join the Waitlist</h2>
        <p className="text-muted-foreground mb-8">
          Be the first to experience the future of AI. Sign up for early access.
        </p>
        
        {isSuccess ? (
          <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 mb-8">
            <p className="font-medium">Thank you for joining our waitlist!</p>
            <p className="text-sm">We'll notify you when we launch.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-10 px-4 py-2 bg-primary text-primary-foreground shadow hover:bg-primary/90 disabled:opacity-50"
              >
                {isSubmitting ? 'Joining...' : 'Join Waitlist'}
              </button>
            </div>
            {error && (
              <p className="text-sm text-red-500 mt-2">{error}</p>
            )}
          </form>
        )}
        
        <p className="text-xs text-muted-foreground">
          By signing up, you agree to our{' '}
          <Link href="/privacy/" className="underline hover:text-foreground">
            Privacy Policy
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Newsletter;