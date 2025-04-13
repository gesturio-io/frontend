import { NextResponse } from 'next/server';
import { authService } from '@/lib/api';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Call the authService to update the profile
    await authService.updateProfile(data);

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
} 