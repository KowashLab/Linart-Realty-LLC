import * as kv from './kv_store.ts';

/*
═══════════════════════════════════════════════════════════════════
  TESTIMONIALS API - Client Reviews Management
═══════════════════════════════════════════════════════════════════
*/

export interface Testimonial {
  id: string;
  name: string;
  title: string; // e.g., "CEO, Tech Corporation"
  content: string;
  rating: number; // 1-5
  image: string;
  location?: string;
  propertyType?: string; // What they purchased
  published: boolean;
  featured: boolean; // Show on homepage
  createdAt: string;
  updatedAt: string;
}

export async function getAllPublishedTestimonials(): Promise<Testimonial[]> {
  const testimonials = await kv.getByPrefix<Testimonial>('testimonial:');
  return testimonials
    .filter(t => t.published)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  const testimonials = await getAllPublishedTestimonials();
  return testimonials.filter(t => t.featured);
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const testimonials = await kv.getByPrefix<Testimonial>('testimonial:');
  return testimonials.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getTestimonialById(id: string): Promise<Testimonial | null> {
  return await kv.get<Testimonial>(`testimonial:${id}`);
}

export async function createTestimonial(data: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>): Promise<Testimonial> {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  
  const testimonial: Testimonial = {
    id,
    createdAt: now,
    updatedAt: now,
    ...data
  };
  
  await kv.set(`testimonial:${id}`, testimonial);
  return testimonial;
}

export async function updateTestimonial(id: string, updates: Partial<Testimonial>): Promise<Testimonial | null> {
  const existing = await getTestimonialById(id);
  if (!existing) return null;
  
  const updated: Testimonial = {
    ...existing,
    ...updates,
    id: existing.id,
    createdAt: existing.createdAt,
    updatedAt: new Date().toISOString()
  };
  
  await kv.set(`testimonial:${id}`, updated);
  return updated;
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const testimonial = await getTestimonialById(id);
  if (!testimonial) return false;
  
  await kv.del(`testimonial:${id}`);
  return true;
}

export async function seedInitialTestimonials(): Promise<void> {
  const existing = await getAllTestimonials();
  if (existing.length > 0) return;
  
  const initialTestimonials = [
    {
      name: 'Sarah Mitchell',
      title: 'CEO, Tech Innovations Inc.',
      content: 'Working with Linart Realty was an absolute pleasure. Their professionalism, market knowledge, and dedication to finding the perfect property exceeded all expectations. They truly understand luxury real estate.',
      rating: 5,
      image: '/images/testimonial-1.jpg',
      location: 'Miami Beach, FL',
      propertyType: 'Waterfront Estate',
      published: true,
      featured: true
    },
    {
      name: 'Michael Chen',
      title: 'Entrepreneur & Investor',
      content: 'The team at Linart Realty provided exceptional service throughout our property search. Their attention to detail and understanding of our needs made the entire process seamless and enjoyable.',
      rating: 5,
      image: '/images/testimonial-2.jpg',
      location: 'Scottsdale, AZ',
      propertyType: 'Modern Villa',
      published: true,
      featured: true
    },
    {
      name: 'Elizabeth Harrison',
      title: 'Medical Director',
      content: 'Exceptional expertise in luxury real estate. Linart Realty helped us find our dream home with patience and professionalism. Their market insights and negotiation skills are unmatched.',
      rating: 5,
      image: '/images/testimonial-3.jpg',
      location: 'New York, NY',
      propertyType: 'Penthouse',
      published: true,
      featured: true
    },
    {
      name: 'David Rodriguez',
      title: 'Investment Banker',
      content: 'Outstanding service from start to finish. The Linart team understood exactly what we were looking for and delivered beyond our expectations. Highly recommended for luxury property investments.',
      rating: 5,
      image: '/images/testimonial-4.jpg',
      location: 'Los Angeles, CA',
      propertyType: 'Contemporary Estate',
      published: true,
      featured: false
    }
  ];
  
  for (const testimonialData of initialTestimonials) {
    await createTestimonial(testimonialData);
  }
}