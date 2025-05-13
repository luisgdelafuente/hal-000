// app/admin/(admin_panel)/components/LogoutButton.tsx
'use client';

import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component
import { LogOut } from 'lucide-react'; // Assuming you use lucide-react for icons
import { useState } from 'react';

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    setIsLoading(true);
    setError(null);
    const { error: signOutError } = await supabase.auth.signOut();
    setIsLoading(false);

    if (signOutError) {
      console.error('Error signing out:', signOutError);
      setError(signOutError.message);
      // Optionally, display a more user-friendly error message to the user
      return;
    }

    // Redirect to login page and refresh to clear session state properly
    router.push('/admin/login');
    router.refresh(); 
  };

  return (
    <>
      <Button variant="outline" className="w-full" onClick={handleLogout} disabled={isLoading}>
        <LogOut className="mr-2 h-4 w-4" />
        {isLoading ? 'Logging out...' : 'Logout'}
      </Button>
      {error && <p style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.5rem', textAlign: 'center' }}>{error}</p>}
    </>
  );
}
