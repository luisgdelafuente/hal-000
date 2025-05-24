// app/api/revalidate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// Use the same environment variable that the admin panel uses
const REVALIDATION_SECRET = process.env.NEXT_PUBLIC_REVALIDATION_SECRET;

export async function POST(request: NextRequest) {
  // Check for secret to confirm this is a valid request
  const secret = request.nextUrl.searchParams.get('secret');
  if (!REVALIDATION_SECRET) {
    console.error('NEXT_PUBLIC_REVALIDATION_SECRET is not set in environment variables.');
    return NextResponse.json({ message: 'Server configuration error: Secret not set.' }, { status: 500 });
  }
  if (secret !== REVALIDATION_SECRET) {
    console.warn('Invalid revalidation secret attempt.');
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  // Get the path to revalidate from the query parameters
  const path = request.nextUrl.searchParams.get('path');

  if (!path) {
    return NextResponse.json({ message: 'Missing path parameter' }, { status: 400 });
  }

  if (!path.startsWith('/')) {
     return NextResponse.json({ message: 'Invalid path parameter. Path must start with /' }, { status: 400 });
  }

  try {
    console.log(`Revalidating path: ${path}`);
    // Revalidate the specific page path
    revalidatePath(path, 'page'); 
    // Optionally, revalidate layout if needed: revalidatePath(path, 'layout');

    // Also revalidate listing pages if a single item was updated
    if (path.startsWith('/projects/')) {
        revalidatePath('/projects', 'page');
        revalidatePath('/', 'page'); // Revalidate home page
        console.log('Revalidated /projects listing page and home page.');
    } else if (path.startsWith('/blog/')) {
        revalidatePath('/blog', 'page');
        revalidatePath('/', 'page'); // Revalidate home page
        console.log('Revalidated /blog listing page and home page.');
    }
    
    return NextResponse.json({ revalidated: true, now: Date.now(), path });
  } catch (err) {
    let message = 'Error revalidating';
    if (err instanceof Error) {
      message = err.message;
    }
    console.error(`Error during revalidation for path ${path}:`, err);
    return NextResponse.json({ revalidated: false, message }, { status: 500 });
  }
}
