/**
 * Utility functions for tracking user activity
 */

/**
 * Tracks a page visit by sending the page URL to the backend
 * @param pageUrl The URL of the page being visited
 */
export async function trackPageVisit(pageUrl: string): Promise<void> {
  try {
    // Ensure the URL is properly formatted
    // If it's just a path (e.g., "/dashboard"), add the origin
    const fullUrl = pageUrl.startsWith('http') 
      ? pageUrl 
      : `${window.location.origin}${pageUrl}`;
    
    // Format date as YYYY-MM-DD as required by the backend
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const visitDate = `${year}-${month}-${day}`;
    
    // Log the URL being sent for debugging
    console.log('Tracking page visit:', fullUrl, 'at', visitDate);
    
    const response = await fetch('http://127.0.0.1:8000/accounts/logs/', {
      method: 'POST',
      credentials: 'include', // This ensures cookies are sent with the request
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page_url: fullUrl,
        visit_date: visitDate,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to track page visit:', errorText);
      
      // Try to parse the error message for more details
      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.message && Array.isArray(errorJson.message)) {
          console.error('Error details:', errorJson.message.join(', '));
        }
      } catch (e) {
        // If parsing fails, just use the raw error text
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
  try {
    const response = await fetch('http://127.0.0.1:8000/accounts/logs?view=heatmap', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch heatmap data');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching heatmap data:', error);
    return null;
  }
} 