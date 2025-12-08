import { useAuth } from '../contexts/AuthContext';
import { projectId } from './supabase/info';

// Base URL for the Edge Function.
// NOTE: Assumes projectId is imported from './supabase/info'
const SERVER_URL = `https://${projectId}.supabase.co/functions/v1/server`;

/**
 * Executes a public API call to the Edge Function.
 * This function is guaranteed NOT to send the Authorization header, 
 * allowing access to public endpoints (/properties, /blog/posts).
 * @param path Relative path (e.g., '/properties', '/blog/posts').
 * @param options Standard Fetch options.
 * @returns Parsed JSON response.
 */
export async function publicFetch(
  path: string,
  options: RequestInit = {}
): Promise<any> {
  const url = `${SERVER_URL}${path}`;
  
  // Create a copy of the headers and remove Authorization if present. 
  // This is critical for fixing the 401 error on public routes.
  const headers = new Headers(options.headers || {});
  if (headers.has('Authorization')) {
    headers.delete('Authorization');
  }
  
  const response = await fetch(url, {
    ...options,
    headers,
  });

  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch (parseError) {
    console.error('JSON parse error in publicFetch:', parseError, text);
    throw new Error(`Server returned invalid JSON: ${text.substring(0, 100)}`);
  }
  
  if (!response.ok) {
    const status = response.status;
    const errorMessage = data.error || `API Error: ${status}`;
    console.error(`Public Fetch failed on ${path}:`, errorMessage, data);
    throw new Error(errorMessage);
  }

  return data;
}

/**
 * Custom hook for performing an authenticated API call to the Edge Function.
 * Must be used for ALL /admin/* and /auth/* routes.
 * @returns An asynchronous function that performs an authenticated fetch.
 */
export function useAuthenticatedApi() {
  const { getAccessToken } = useAuth();

  const authenticatedFetch = async (
    path: string,
    options: RequestInit = {}
  ): Promise<any> => {
    const token = await getAccessToken();
    if (!token) {
      // This should only happen if the user tries to access Admin while logged out, 
      // or if Supabase cannot find a session.
      throw new Error('Unauthorized: User token not found. Please log in.');
    }

    const url = `${SERVER_URL}${path}`;

    const headers = new Headers(options.headers || {});
    headers.set('Authorization', `Bearer ${token}`);
    
    // Default Content-Type is JSON
    if (!headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });
    
    if (response.status === 401) {
        // If 401 is received on an authenticated route, the token is expired.
        throw new Error('Unauthorized: Session expired or invalid token.');
    }

    const text = await response.text();
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch (parseError) {
      console.error('JSON parse error in authenticatedFetch:', parseError, text);
      throw new Error(`Server returned invalid JSON: ${text.substring(0, 100)}`);
    }
    
    if (!response.ok) {
      const status = response.status;
      const errorMessage = data.error || `API Error: ${status}`;
      console.error(`Authenticated Fetch failed on ${path}:`, errorMessage, data);
      throw new Error(errorMessage);
    }

    return data;
  };

  return authenticatedFetch;
}