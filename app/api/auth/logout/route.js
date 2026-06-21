import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('session');

    return NextResponse.json({
      success: true,
      message: 'Logged out successfully.'
    });
  } catch (error) {
    console.error('Error logging out:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during logout.' },
      { status: 500 }
    );
  }
}
export async function GET() {
  // Support GET logout requests if accessed via link
  try {
    const cookieStore = await cookies();
    cookieStore.delete('session');

    return NextResponse.redirect(new URL('/LoginParablelabs', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
  } catch (error) {
    console.error('Error in GET logout redirect:', error);
    return NextResponse.json({ error: 'Failed redirect' }, { status: 500 });
  }
}
