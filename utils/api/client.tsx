import { getSupabaseClient } from '../supabase/client';

/*
═══════════════════════════════════════════════════════════════════
  API CLIENT - Read data directly from Supabase KV store
  - Fetches data from kv_store_dcec270f table
  - Uses .like() to find items by prefix
  - No server edge function calls
═══════════════════════════════════════════════════════════════════
*/

const KV_TABLE = 'kv_store_dcec270f';
const supabase = getSupabaseClient();

// Helper to get items by prefix (like getByPrefix from server)
async function getByPrefix<T = any>(prefix: string): Promise<T[]> {
  try {
    const { data, error } = await supabase
      .from(KV_TABLE)
      .select('key, value')
      .like('key', prefix + '%');

    if (error) {
      console.error(`Error fetching prefix "${prefix}":`, error);
      return [];
    }

    return (data || [])
      .map(item => {
        try {
          const parsed = typeof item.value === 'string' 
            ? JSON.parse(item.value) 
            : item.value;
          return parsed;
        } catch (e) {
          console.error(`Error parsing KV value for key ${item.key}:`, e);
          return null;
        }
      })
      .filter((item): item is T => item !== null);
  } catch (error) {
    console.error(`Unexpected error fetching prefix "${prefix}":`, error);
    return [];
  }
}

/*
═══════════════════════════════════════════════════════════════════
  PROPERTIES API
═══════════════════════════════════════════════════════════════════
*/

export async function fetchProperties() {
  try {
    const properties = await getByPrefix<any>('property:');
    const published = properties.filter(p => p.published !== false);
    console.log('Loaded properties:', published.length);
    return published;
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
}

export async function fetchPropertyById(id: string) {
  try {
    const properties = await getByPrefix<any>('property:');
    return properties.find(p => p.id === id) || null;
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
    const testimonials = await getByPrefix<any>('testimonial:');
    const published = testimonials.filter(t => t.published !== false);
    console.log('Loaded testimonials:', published.length);
    return published;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

export async function fetchTestimonialById(id: string) {
  try {
    const testimonials = await getByPrefix<any>('testimonial:');
    return testimonials.find(t => t.id === id) || null;
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
    const recognitions = await getByPrefix<any>('recognition:');
    const published = recognitions.filter(r => r.published !== false);
    console.log('Loaded recognition:', published.length);
    return published;
  } catch (error) {
    console.error('Error fetching recognitions:', error);
    return [];
  }
}

export async function fetchRecognitionById(id: string) {
  try {
    const recognitions = await getByPrefix<any>('recognition:');
    return recognitions.find(r => r.id === id) || null;
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
    const partnerships = await getByPrefix<any>('partnership:');
    const published = partnerships.filter(p => p.published !== false);
    console.log('Loaded partnerships:', published.length);
    return published;
  } catch (error) {
    console.error('Error fetching partnerships:', error);
    return [];
  }
}

export async function fetchPartnershipById(id: string) {
  try {
    const partnerships = await getByPrefix<any>('partnership:');
    return partnerships.find(p => p.id === id) || null;
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
    const posts = await getByPrefix<any>('blog:post:');
    const published = posts.filter(p => p.published !== false);
    console.log('Loaded blog posts:', published.length);
    return published;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function fetchBlogPostBySlug(slug: string) {
  try {
    const posts = await getByPrefix<any>('blog:post:');
    return posts.find(p => p.slug === slug && p.published !== false) || null;
  } catch (error) {
    console.error(`Error fetching blog post ${slug}:`, error);
    return null;
  }
}