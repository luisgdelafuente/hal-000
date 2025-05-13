// app/admin/(admin_panel)/layout.tsx
import { ReactNode } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  FileText, 
  BarChart, 
  Settings, 
  LayoutGrid, 
  Mail,
  UserRound
} from 'lucide-react';
import { createSupabaseServerClient } from '@/lib/supabase/server'; 
import { cookies } from 'next/headers'; 
import LogoutButton from './components/LogoutButton'; 

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = async ({ children }: AdminLayoutProps) => { 
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="border-r bg-muted/40 lg:block lg:w-60">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-2 text-sm font-medium">
                <Link
                  href="/admin" 
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="/admin/posts"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <FileText className="h-4 w-4" />
                  Blog Posts
                </Link>
                <Link
                  href="/admin/projects"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <BarChart className="h-4 w-4" />
                  Projects
                </Link>
                <Link
                  href="/admin/pages"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <LayoutGrid className="h-4 w-4" />
                  Page Content
                </Link>
                <Link
                  href="/admin/waitlist"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <UserRound className="h-4 w-4" />
                  Waitlist
                </Link>
                <Link
                  href="/admin/messages"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Mail className="h-4 w-4" />
                  Contact Messages
                </Link>
                <Link
                  href="/admin/settings"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Settings className="h-4 w-4" />
                  Site Settings
                </Link>
              </nav>
            </div>
            <div className="mt-auto p-4">
              <LogoutButton /> 
              {user && (
                <div className="mt-4 text-xs text-muted-foreground">
                  Logged in as <span className="font-medium">{user.email}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <div className="container py-6 pl-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
