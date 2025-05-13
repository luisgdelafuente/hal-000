// middleware.ts
import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  // Refresh session if expired - important to do before checking for session
  const { data: { session } } = await supabase.auth.getSession();

  const isAuthenticated = !!session;
  const { pathname } = request.nextUrl;

  // Normalize pathnames (remove trailing slash if not root)
  const normalizedPathname = pathname.length > 1 && pathname.endsWith('/') 
    ? pathname.slice(0, -1) 
    : pathname;

  // If the user is trying to access the login page
  if (normalizedPathname === '/admin/login') {
    if (isAuthenticated) {
      // If authenticated, redirect to the admin dashboard
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    // If not authenticated, allow access to the login page
    // Return the potentially modified response (if cookies were set/removed by getSession)
    return response; 
  }

  // If the user is trying to access any other admin page
  if (normalizedPathname.startsWith('/admin')) {
    if (!isAuthenticated) {
      // If not authenticated, redirect to the login page
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // For all other routes, or if authenticated and accessing admin, allow access
  // Return the potentially modified response (if cookies were set/removed by getSession)
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api (API routes - adjust if you have admin-specific API routes to protect)
     * - any other static assets or public paths
     */
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
    '/admin/:path*', // Ensure admin paths are matched
  ],
};
