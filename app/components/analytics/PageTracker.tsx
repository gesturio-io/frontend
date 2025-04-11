'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageVisit } from '@/app/utils/analytics';
import { requiresAuth } from '@/app/utils/auth';

/**
 * A component that tracks page visits for authenticated routes
 * Wrap any page component with this to track visits
 */
export function PageTracker({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true when component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only track page visits on the client side and for authenticated routes
  useEffect(() => {
    if (isClient && pathname && requiresAuth(pathname)) {
      // Add a small delay to ensure the page is fully loaded
      const timer = setTimeout(() => {
        trackPageVisit(pathname);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [pathname, isClient]);

  return <>{children}</>;
} 