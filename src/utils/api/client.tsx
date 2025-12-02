import { projectId, publicAnonKey } from '../supabase/info';

/*
═══════════════════════════════════════════════════════════════════
  API CLIENT - Fetch data from Edge Function endpoints
  - Uses Edge Function for production-ready data access
  - All requests go through /server endpoints
═══════════════════════════════════════════════════════════════════
*/

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/server`;

// Helper function to make authenticated requests
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      console.error(`API Error for ${endpoint}:`, errorData);
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Request failed for ${endpoint}:`, error);
    throw error;
  }
}

/*
═══════════════════════════════════════════════════════════════════
  PROPERTIES API
═══════════════════════════════════════════════════════════════════
*/

export async function fetchProperties() {
  try {
    const data = await apiRequest('/properties');
    console.log('Loaded properties:', data.properties?.length || 0);
    return data.properties || [];
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
}

export async function fetchPropertyById(id: string) {
  try {
    const data = await apiRequest(`/properties/${id}`);
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
    const data = await apiRequest('/testimonials');
    console.log('Loaded testimonials:', data.testimonials?.length || 0);
    return data.testimonials || [];
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

export async function fetchTestimonialById(id: string) {
  try {
    const data = await apiRequest(`/testimonials/${id}`);
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
    const data = await apiRequest('/recognition');
    console.log('Loaded recognition:', data.recognitions?.length || 0);
    return data.recognitions || [];
  } catch (error) {
    console.error('Error fetching recognitions:', error);
    return [];
  }
}

export async function fetchRecognitionById(id: string) {
  try {
    const data = await apiRequest(`/recognition/${id}`);
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
    const data = await apiRequest('/partnerships');
    console.log('Loaded partnerships:', data.partnerships?.length || 0);
    return data.partnerships || [];
  } catch (error) {
    console.error('Error fetching partnerships:', error);
    return [];
  }
}

export async function fetchPartnershipById(id: string) {
  try {
    const data = await apiRequest(`/partnerships/${id}`);
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
    const data = await apiRequest('/blog/posts');
    console.log('Loaded blog posts:', data.posts?.length || 0);
    return data.posts || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function fetchBlogPostBySlug(slug: string) {
  try {
    const data = await apiRequest(`/blog/posts/${slug}`);
    return data.post || null;
  } catch (error) {
    console.error(`Error fetching blog post ${slug}:`, error);
    return null;
  }
}