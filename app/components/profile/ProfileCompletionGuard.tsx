'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ProfileCompletion } from './ProfileCompletion';

interface ProfileCompletionGuardProps {
  children: React.ReactNode;
}

export function ProfileCompletionGuard({ children }: ProfileCompletionGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [showProfileCompletion, setShowProfileCompletion] = useState(false);
  const [loading, setLoading] = useState(true);

  // Handler for successful profile completion
  const handleProfileComplete = () => {
    console.log('Profile completed successfully');
    setShowProfileCompletion(false);
    document.body.classList.remove('hide-sidebar');
    // Set the cookie to True since profile is now complete
    document.cookie = 'isProfileComplete=True; path=/';
    // Redirect to dashboard
    router.push('/dashboard');
  };

  useEffect(() => {
    const checkProfileStatus = () => {
      const isProfileCompleteRaw = document.cookie
        .split('; ')
        .find(row => row.startsWith('isProfileComplete='))
        ?.split('=')[1];

      console.log('Guard - Cookie value for isProfileComplete:', isProfileCompleteRaw);

      if (isProfileCompleteRaw !== 'True') {
        console.log('Profile not complete, showing form');
        setShowProfileCompletion(true);
        document.body.classList.add('hide-sidebar');
        
        // If we're not already on the dashboard page, redirect there
        if (pathname !== '/dashboard') {
          router.push('/dashboard');
        }
      } else {
        document.body.classList.remove('hide-sidebar');
      }
      setLoading(false);
    };

    checkProfileStatus();

    return () => {
      document.body.classList.remove('hide-sidebar');
    };
  }, [pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  if (showProfileCompletion) {
    return <ProfileCompletion onProfileComplete={handleProfileComplete} />;
  }

  return <>{children}</>;
} 