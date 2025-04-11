/**
 * Utility functions for authentication
 */

/**
 * Determines if a route requires authentication
 * @param path The current path
 * @returns boolean indicating if the route requires authentication
 */
export function requiresAuth(path: string): boolean {
  // Routes that require authentication
  const protectedRoutes = [
    '/dashboard',
    '/dashboard/profile',
    '/dashboard/settings',
    '/dashboard/learn',
    '/dashboard/practice',
  ];
  
  // Check if the current path starts with any of the protected routes
  return protectedRoutes.some(route => path.startsWith(route));
} 