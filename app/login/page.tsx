'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authService } from '@/lib/api';
import { User, Lock, Mail } from 'lucide-react';
import { images } from '@/app/Images/images';
import { ProfileCompletion } from '@/app/components/profile/ProfileCompletion';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showProfileCompletion, setShowProfileCompletion] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Function to check profile completion status from cookie
  const checkProfileStatus = () => {
    const isProfileCompleteRaw = document.cookie
      .split('; ')
      .find(row => row.startsWith('isProfileComplete='))
      ?.split('=')[1];

    console.log('Cookie value for isProfileComplete:', isProfileCompleteRaw);

    // Check if the cookie value is exactly "True" (case-sensitive)
    const isProfileComplete = isProfileCompleteRaw === 'True';
    console.log('Is profile complete?', isProfileComplete);

    if (!isProfileComplete) {
      console.log('Profile not complete, showing form');
      setShowProfileCompletion(true);
      return true;
    }

    console.log('Profile is complete, proceeding to dashboard');
    return false;
  };

  async function handleGoogleAuth() {
    setError('');
    setGoogleLoading(true);

    try {
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/accounts/google/login/`;
    } catch (err) {
      setError('Failed to redirect to Google login');
      setGoogleLoading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const credentials = {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    };

    try {
      await authService.login(credentials);
      
      // Wait a brief moment for cookies to be set
      setTimeout(() => {
        const needsProfile = checkProfileStatus();
        if (!needsProfile) {
          console.log('Profile complete, redirecting to dashboard');
          router.push('/dashboard');
        }
      }, 500);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  }

  if (showProfileCompletion) {
    console.log('Rendering ProfileCompletion component');
    return <ProfileCompletion />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
        <div className="flex flex-col items-center space-y-2">
          <Image
            src={images.mainLogo}
            alt="Logo"
            width={64}
            height={64}
            className="rounded-full"
          />
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">
            Enter your credentials to sign in
          </p>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <Input
                id="username"
                name="username"
                type="text"
                required
                className="pl-10"
                placeholder="Enter your username"
              />
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="pl-10"
                placeholder="Enter your password"
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogleAuth}
            disabled={googleLoading}
          >
            <Mail className="mr-2 h-5 w-5 text-[#4285F4]" />
            {googleLoading ? 'Redirecting...' : 'Continue with Google'}
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Don't have an account? </span>
          <Link href="/register" className="text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

