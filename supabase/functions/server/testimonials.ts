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

export async function seedInitialTestimonials(): Promise<boolean> {
  // Check if seeding has already been completed (using KV flag)
  const seedFlag = await kv.get('seed:completed:testimonials');
  if (seedFlag) {
    console.log('Testimonials already seeded (flag exists), skipping...');
    return true; // Already seeded
  }
  
  console.log('Starting testimonials seeding (will create all 8 testimonials)...');
  
  const initialTestimonials = [
    {
      name: 'Richard Ashford',
      title: 'CEO, Ashford Capital',
      content: 'Working with Linart Realty was transformative for our portfolio expansion. Their deep market knowledge and strategic approach to luxury real estate investment yielded exceptional returns. The team\'s professionalism and attention to detail are unmatched in the Florida market.',
      rating: 5,
      image: '/images/testimonial-1.jpg',
      location: 'Boca Raton, FL',
      propertyType: 'Investment Portfolio',
      published: true,
      featured: true
    },
    {
      name: 'Victoria Sterling',
      title: 'Portfolio Director, Sterling Ventures',
      content: 'Linart Realty\'s expertise in Miami\'s luxury waterfront market is extraordinary. They guided us through multiple high-value acquisitions with precision and discretion. Their network and market intelligence provided us with exclusive off-market opportunities.',
      rating: 5,
      image: '/images/testimonial-2.jpg',
      location: 'Miami, FL',
      propertyType: 'Waterfront Estate',
      published: true,
      featured: true
    },
    {
      name: 'James & Catherine Porter',
      title: 'Homeowners, Private Clients',
      content: 'Finding our dream home in Boca Raton exceeded every expectation thanks to Linart Realty. Their patience, understanding of our needs, and dedication to excellence made the entire process seamless. We couldn\'t be happier with our new estate.',
      rating: 5,
      image: '/images/testimonial-3.jpg',
      location: 'Boca Raton, FL',
      propertyType: 'Luxury Estate',
      published: true,
      featured: true
    },
    {
      name: 'Isabella Rosewood',
      title: 'Principal, Rosewood Estates',
      content: 'As a real estate professional myself, I can confidently say Linart Realty operates at the highest level. Their marketing strategies, client relationships, and market positioning are exemplary. A true partner in luxury real estate.',
      rating: 5,
      image: '/images/testimonial-4.jpg',
      location: 'Naples, FL',
      propertyType: 'Golf Course Estate',
      published: true,
      featured: true
    },
    {
      name: 'Alexander Drake',
      title: 'Investment Director, Drake Properties',
      content: 'The Linart team\'s investment acumen and market analysis helped us identify premium opportunities in Fort Lauderdale\'s competitive market. Their strategic guidance has been invaluable to our portfolio growth.',
      rating: 5,
      image: '/images/testimonial-5.jpg',
      location: 'Fort Lauderdale, FL',
      propertyType: 'Commercial Investment',
      published: true,
      featured: true
    },
    {
      name: 'Diana Montgomery',
      title: 'Art Collector, Private Client',
      content: 'Linart Realty understood my unique requirements for displaying my art collection. They found a Palm Beach estate with the perfect gallery spaces and architectural character. Their attention to my specific needs was remarkable.',
      rating: 5,
      image: '/images/testimonial-6.jpg',
      location: 'Palm Beach, FL',
      propertyType: 'Estate with Gallery',
      published: true,
      featured: true
    },
    {
      name: 'Robert Chen',
      title: 'Technology Entrepreneur, Private Client',
      content: 'As a tech entrepreneur, I value efficiency and innovation. Linart Realty delivered on both fronts, using cutting-edge technology and market insights to help me find the perfect smart home estate in Boca Raton.',
      rating: 5,
      image: '/images/testimonial-7.jpg',
      location: 'Boca Raton, FL',
      propertyType: 'Smart Home Estate',
      published: true,
      featured: true
    },
    {
      name: 'Margaret & William Hartford',
      title: 'Retired Executives, Private Clients',
      content: 'After successful careers, we wanted a serene waterfront retreat in Key Biscayne. Linart Realty made our retirement dream come true. Their professionalism, market knowledge, and genuine care for our happiness made all the difference.',
      rating: 5,
      image: '/images/testimonial-8.jpg',
      location: 'Key Biscayne, FL',
      propertyType: 'Waterfront Retreat',
      published: true,
      featured: false
    }
  ];
  
  // Create all testimonials in parallel for speed
  console.log(`Creating ${initialTestimonials.length} testimonials in parallel...`);
  await Promise.all(
    initialTestimonials.map(testimonialData => createTestimonial(testimonialData))
  );
  console.log(`✅ Created ${initialTestimonials.length} testimonials`);
  
  console.log('Testimonials seeding completed, setting flag...');
  // Set flag to prevent future seeding
  await kv.set('seed:completed:testimonials', { completed: true, timestamp: new Date().toISOString() });
  return true;
}