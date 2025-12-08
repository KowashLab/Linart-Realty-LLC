import { projectId, publicAnonKey } from './supabase/info';

/**
 * Base URL for all API requests to the server
 */
const BASE_URL = `https://${projectId}.supabase.co/functions/v1/server`;

/**
 * Public fetch - for public endpoints that don't require authentication
 * This function NEVER sends an Authorization header
 */
export async function publicFetch(endpoint: string, options?: RequestInit) {
  const url = `${BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
      // Explicitly do NOT include Authorization header
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Public API error (${response.status}): ${errorText}`);
  }

  return response.json();
}

/**
 * Authenticated fetch - for protected endpoints that require authentication
 * This function ALWAYS sends a valid access token
 */
export async function authenticatedFetch(
  endpoint: string,
  accessToken: string,
  options?: RequestInit
) {
  const url = `${BASE_URL}${endpoint}`;

  if (!accessToken) {
    throw new Error('Access token is required for authenticated requests');
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Authenticated API error (${response.status}): ${errorText}`);
  }

  return response.json();
}

/**
 * Hook for making authenticated API calls with automatic token management
 */
export function useAuthenticatedApi() {
  // This will be implemented with useAuth() to get the current access token
  // For now, it's a placeholder
  return {
    fetch: authenticatedFetch,
  };
}
