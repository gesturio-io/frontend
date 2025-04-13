/**
 * Utility functions for tracking user activity
 */

import { logsService } from '@/lib/api';

// Keep track of last tracked URLs and their timestamps
const trackedUrls = new Map<string, number>();
const TRACKING_COOLDOWN = 2000; // 2 seconds cooldown between same URL tracking

/**
 * Tracks a page visit by sending the page URL to the backend
 * @param pageUrl The URL of the page being visited
 */
export async function trackPageVisit(pageUrl: string): Promise<void> {
  try {
    // Check if this URL was recently tracked
    const lastTrackedTime = trackedUrls.get(pageUrl);
    const now = Date.now();
    
    if (lastTrackedTime && now - lastTrackedTime < TRACKING_COOLDOWN) {
      // Skip if the same URL was tracked recently
      return;
    }

    // Update the tracking timestamp before making the request
    trackedUrls.set(pageUrl, now);

    // Ensure the URL is properly formatted
    // If it's just a path (e.g., "/dashboard"), add the origin
    const fullUrl = pageUrl.startsWith('http') 
      ? pageUrl 
      : `${window.location.origin}${pageUrl}`;
    
    // Format date as YYYY-MM-DD as required by the backend
    const now_date = new Date();
    const year = now_date.getFullYear();
    const month = String(now_date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(now_date.getDate()).padStart(2, '0');
    const visitDate = `${year}-${month}-${day}`;
    
    // Log the URL being sent for debugging
    console.log('Tracking page visit:', fullUrl, 'at', visitDate);
    
    await logsService.trackPageVisit(fullUrl, visitDate);

    // Clean up old entries from trackedUrls after 1 hour
    const ONE_HOUR = 3600000;
    for (const [url, timestamp] of trackedUrls.entries()) {
      if (now - timestamp > ONE_HOUR) {
        trackedUrls.delete(url);
      }
    }
  } catch (error) {
    console.error('Error tracking page visit:', error);
  }
}

/**
 * Fetches heatmap data from the backend
 * @returns Promise with the heatmap data
 */
export async function fetchHeatmapData(): Promise<any> {
  return logsService.getHeatmapData();
} 