import { projectId, publicAnonKey } from '../supabase/info';

/*
═══════════════════════════════════════════════════════════════════
  API CLIENT - Fetch data from Edge Function endpoints
  - Uses server Edge Function for all API requests
  - Public endpoints don't require auth but we send token anyway
  - Admin endpoints require valid user session
═══════════════════════════════════════════════════════════════════
*/

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-dcec270f`;

// Helper function to make authenticated requests
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Always include Authorization header with public anon key
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${publicAnonKey}`,
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`API Error [${endpoint}]:`, errorText);
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/*
═══════════════════════════════════════════════════════════════════
  PROPERTIES API
═══════════════════════════════════════════════════════════════════
*/

export async function fetchProperties() {
  try {
    const data = await fetchAPI('/api/properties');
    console.log('Loaded properties:', data.properties?.length || 0);
    return data.properties || [];
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
}

export async function fetchPropertyById(id: string) {
  try {
    const data = await fetchAPI(`/api/properties/${id}`);
    return data.property || null;
  } catch (error) {
    console.error(`Error fetching property ${id}:`, error);
    return null;
  }
}

/*
═══════════════════════════════════════════════════════════════════
  TESTIMONIALS API
═══════════════════════════════════════════════════════════════════
*/

export async function fetchTestimonials() {
  try {
    const data = await fetchAPI('/api/testimonials');
    console.log('Loaded testimonials:', data.testimonials?.length || 0);
    return data.testimonials || [];
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

export async function fetchTestimonialById(id: string) {
  try {
    const data = await fetchAPI(`/api/testimonials/${id}`);
    return data.testimonial || null;
  } catch (error) {
    console.error(`Error fetching testimonial ${id}:`, error);
    return null;
  }
}

/*
═══════════════════════════════════════════════════════════════════
  RECOGNITION API
═══════════════════════════════════════════════════════════════════
*/

export async function fetchRecognitions() {
  try {
    const data = await fetchAPI('/api/recognition');
    console.log('Loaded recognition:', data.recognitions?.length || 0);
    return data.recognitions || [];
  } catch (error) {
    console.error('Error fetching recognitions:', error);
    return [];
  }
}

export async function fetchRecognitionById(id: string) {
  try {
    const data = await fetchAPI(`/api/recognition/${id}`);
    return data.recognition || null;
  } catch (error) {
    console.error(`Error fetching recognition ${id}:`, error);
    return null;
  }
}

/*
═══════════════════════════════════════════════════════════════════
  PARTNERSHIPS API
═══════════════════════════════════════════════════════════════════
*/

export async function fetchPartnerships() {
  try {
    const data = await fetchAPI('/api/partnerships');
    console.log('Loaded partnerships:', data.partnerships?.length || 0);
    return data.partnerships || [];
  } catch (error) {
    console.error('Error fetching partnerships:', error);
    return [];
  }
}

export async function fetchPartnershipById(id: string) {
  try {
    const data = await fetchAPI(`/api/partnerships/${id}`);
    return data.partnership || null;
  } catch (error) {
    console.error(`Error fetching partnership ${id}:`, error);
    return null;
  }
}

/*
═══════════════════════════════════════════════════════════════════
  BLOG API
═══════════════════════════════════════════════════════════════════
*/

export async function fetchBlogPosts() {
  try {
    const data = await fetchAPI('/api/blog/posts');
    console.log('Loaded blog posts:', data.posts?.length || 0);
    return data.posts || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function fetchBlogPostBySlug(slug: string) {
  try {
    const data = await fetchAPI(`/api/blog/posts/${slug}`);
    return data.post || null;
  } catch (error) {
    console.error(`Error fetching blog post ${slug}:`, error);
    return null;
  }
}