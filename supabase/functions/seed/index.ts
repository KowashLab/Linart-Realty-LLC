import { createClient } from "jsr:@supabase/supabase-js@2";

// Create Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Import KV store functions
async function kvSet(key: string, value: any) {
  const { error } = await supabase
    .from('kv_store_dcec270f')
    .upsert({ key, value: JSON.stringify(value) }, { onConflict: 'key' });
  
  if (error) {
    throw new Error(`KV set error for key ${key}: ${error.message}`);
  }
}

async function kvGet(key: string) {
  const { data, error } = await supabase
    .from('kv_store_dcec270f')
    .select('value')
    .eq('key', key)
    .maybeSingle();
  
  if (error) {
    throw new Error(`KV get error for key ${key}: ${error.message}`);
  }
  
  return data ? JSON.parse(data.value) : null;
}

async function kvDel(key: string) {
  const { error } = await supabase
    .from('kv_store_dcec270f')
    .delete()
    .eq('key', key);
  
  if (error) {
    throw new Error(`KV delete error for key ${key}: ${error.message}`);
  }
}

// Helper to clear ALL keys with a prefix
async function clearPrefix(prefix: string) {
  const { data, error } = await supabase
    .from('kv_store_dcec270f')
    .select('key')
    .like('key', `${prefix}%`);
  
  if (error) {
    console.log(`Error fetching keys with prefix ${prefix}:`, error);
    return;
  }
  
  if (data && data.length > 0) {
    console.log(`🧹 Deleting ${data.length} keys with prefix "${prefix}"...`);
    for (const row of data) {
      await kvDel(row.key);
    }
  }
}

// Generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Seed blog posts
async function seedBlogPosts() {
  console.log('🌱 Seeding blog posts...');
  
  // Clear ALL blog posts (both formats)
  await clearPrefix('blog:');
  await clearPrefix('blog_');
  await kvDel('blog_all_ids');
  await kvDel('seed:completed:blog');
  
  const posts = [
    {
      id: 'art-of-luxury-real-estate-investment',
      title: 'The Art of Luxury Real Estate Investment',
      slug: 'art-of-luxury-real-estate-investment',
      excerpt: 'Discover the secrets to investing in premium properties that appreciate in value and provide unparalleled returns.',
      content: `
        <p>Luxury real estate investment represents one of the most stable and prestigious forms of wealth preservation and growth. In this comprehensive guide, we explore the fundamental principles that distinguish successful luxury property investors.</p>
        
        <h2>Understanding Market Dynamics</h2>
        <p>The luxury real estate market operates on different principles than conventional property markets. Location, exclusivity, and unique architectural features play crucial roles in determining value appreciation.</p>
        
        <h2>Key Investment Strategies</h2>
        <ul>
          <li>Focus on prime locations with limited supply</li>
          <li>Seek properties with unique architectural significance</li>
          <li>Consider long-term appreciation over short-term gains</li>
          <li>Evaluate rental yield potential for income generation</li>
        </ul>
        
        <h2>Due Diligence Essentials</h2>
        <p>Thorough market research, property inspections, and financial analysis are non-negotiable elements of luxury real estate investment. Working with experienced advisors ensures informed decision-making.</p>
      `,
      image: '/images/blog/investment.jpg',
      category: 'Investment',
      type: 'article',
      published: true,
      author: 'Linart Realty Team',
      seoTitle: 'Luxury Real Estate Investment Guide 2025',
      seoDescription: 'Expert insights on luxury property investment strategies, market analysis, and wealth preservation through premium real estate.',
      seoKeywords: 'luxury real estate investment, premium property, wealth preservation',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
  
  for (const post of posts) {
    await kvSet(`blog:post:${post.id}`, post);
  }
  
  console.log(`✅ Seeded ${posts.length} blog posts`);
}

// Seed properties
async function seedProperties() {
  console.log('🌱 Seeding properties...');
  
  // Clear ALL properties (both formats)
  await clearPrefix('property:');
  await clearPrefix('property_');
  await kvDel('properties_all_ids');
  await kvDel('seed:completed:properties');
  
  const properties = [
    {
      id: 'waterfront-penthouse-estate',
      slug: 'waterfront-penthouse-estate',
      title: 'Waterfront Penthouse Estate',
      description: 'Spectacular waterfront penthouse featuring floor-to-ceiling windows, private terrace with infinity pool, and breathtaking panoramic views. This architectural masterpiece combines sophisticated design with unparalleled luxury amenities.',
      price: '$12,500,000',
      location: 'Miami Beach, FL',
      bedrooms: 5,
      bathrooms: 6,
      sqft: 8500,
      features: ['Infinity Pool', 'Private Beach Access', 'Smart Home System', 'Wine Cellar', 'Home Theater', 'Private Elevator'],
      images: [
        '/images/property-1.jpg',
        '/images/property-2.jpg',
        '/images/property-3.jpg'
      ],
      mainImage: '/images/property-1.jpg',
      propertyType: 'Waterfront',
      status: 'For Sale',
      published: true,
      featured: true,
      virtualTourUrl: '',
      seoTitle: 'Waterfront Penthouse Estate - $12.5M Miami Beach',
      seoDescription: 'Luxury waterfront penthouse in Miami Beach. 5 bed, 6 bath, 8500 sqft with infinity pool and private beach access.',
      seoKeywords: 'waterfront penthouse, miami beach luxury, infinity pool estate',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'oceanfront-mediterranean-estate',
      slug: 'oceanfront-mediterranean-estate',
      title: 'Oceanfront Mediterranean Estate',
      description: 'Magnificent Mediterranean-style estate with direct ocean views. This exquisite property features hand-crafted details, imported Italian marble, and expansive outdoor entertaining spaces overlooking the Atlantic Ocean.',
      price: '$18,900,000',
      location: 'Palm Beach, FL',
      bedrooms: 6,
      bathrooms: 8,
      sqft: 12000,
      features: ['Private Beach', 'Tennis Court', 'Infinity Pool', 'Guest Cottage', 'Ocean Views', 'Wine Cellar'],
      images: [
        '/images/property-1.jpg',
        '/images/property-4.jpg',
        '/images/property-3.jpg'
      ],
      mainImage: '/images/property-1.jpg',
      propertyType: 'Waterfront',
      status: 'For Sale',
      published: true,
      featured: true,
      virtualTourUrl: '',
      seoTitle: 'Oceanfront Mediterranean Estate - $18.9M Palm Beach',
      seoDescription: 'Spectacular Mediterranean estate in Palm Beach. 6 bed, 8 bath, 12000 sqft with private beach access.',
      seoKeywords: 'palm beach estate, oceanfront property, mediterranean villa, luxury beach house florida',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'modern-architectural-masterpiece',
      slug: 'modern-architectural-masterpiece',
      title: 'Modern Architectural Masterpiece',
      description: 'Contemporary architectural masterpiece designed by award-winning architects. Features open-concept living spaces, premium finishes throughout, and seamless indoor-outdoor integration with stunning Gulf views.',
      price: '$8,750,000',
      location: 'Naples, FL',
      bedrooms: 4,
      bathrooms: 5,
      sqft: 6200,
      features: ['Gulf Views', 'Outdoor Kitchen', 'Spa & Sauna', 'Guest House', 'Solar Panels', 'Smart Home'],
      images: [
        '/images/property-4.jpg',
        '/images/property-5.jpg'
      ],
      mainImage: '/images/property-4.jpg',
      propertyType: 'Waterfront',
      status: 'For Sale',
      published: true,
      featured: true,
      virtualTourUrl: '',
      seoTitle: 'Modern Architectural Masterpiece - $8.75M Naples',
      seoDescription: 'Award-winning contemporary villa in Naples. 4 bed, 5 bath, 6200 sqft with Gulf views.',
      seoKeywords: 'naples luxury home, architectural masterpiece, contemporary florida estate',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'boca-raton-golf-estate',
      slug: 'boca-raton-golf-estate',
      title: 'Boca Raton Golf Estate',
      description: 'Rare opportunity to own this pristine estate on championship golf course. This meticulously renovated residence blends classic elegance with modern luxury, featuring stunning fairway and water views.',
      price: '$6,950,000',
      location: 'Boca Raton, FL',
      bedrooms: 5,
      bathrooms: 6,
      sqft: 7800,
      features: ['Golf Course Views', 'Pool & Spa', 'Private Office', 'Chef\'s Kitchen', 'Wine Room', 'Smart Home'],
      images: [
        '/images/property-6.jpg',
        '/images/property-2.jpg'
      ],
      mainImage: '/images/property-6.jpg',
      propertyType: 'Residential',
      status: 'For Sale',
      published: true,
      featured: true,
      virtualTourUrl: '',
      seoTitle: 'Boca Raton Golf Estate - $6.95M',
      seoDescription: 'Luxury golf course estate in Boca Raton. 5 bed, 6 bath, 7800 sqft with fairway views.',
      seoKeywords: 'boca raton estate, golf course property, luxury florida home',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'key-west-island-paradise',
      slug: 'key-west-island-paradise',
      title: 'Key West Island Paradise',
      description: 'Exclusive island retreat in the heart of Key West. This stunning contemporary residence features panoramic ocean views, private dock, and the ultimate Florida Keys lifestyle with world-class amenities.',
      price: '$9,800,000',
      location: 'Key West, FL',
      bedrooms: 4,
      bathrooms: 5,
      sqft: 5800,
      features: ['Ocean Views', 'Private Dock', 'Infinity Pool', 'Rooftop Deck', 'Beach Access', 'Smart Home'],
      images: [
        '/images/property-2.jpg',
        '/images/property-6.jpg'
      ],
      mainImage: '/images/property-2.jpg',
      propertyType: 'Waterfront',
      status: 'For Sale',
      published: true,
      featured: true,
      virtualTourUrl: '',
      seoTitle: 'Key West Island Paradise - $9.8M',
      seoDescription: 'Luxury island home in Key West. 4 bed, 5 bath, 5800 sqft with private dock and ocean views.',
      seoKeywords: 'key west property, island estate, florida keys luxury, waterfront key west',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'gated-equestrian-estate',
      slug: 'gated-equestrian-estate',
      title: 'Gated Equestrian Estate',
      description: 'Sprawling estate on 25 acres featuring a magnificent main residence, professional equestrian center, and multiple guest houses. Perfect for the discerning equestrian enthusiast seeking privacy and luxury.',
      price: '$14,200,000',
      location: 'Wellington, FL',
      bedrooms: 7,
      bathrooms: 9,
      sqft: 15000,
      features: ['Equestrian Center', 'Guest Houses', 'Heated Pool', 'Tennis Court', '25 Acres', 'Security Gate'],
      images: [
        '/images/property-4.jpg',
        '/images/property-1.jpg',
        '/images/property-5.jpg'
      ],
      mainImage: '/images/property-4.jpg',
      propertyType: 'Residential',
      status: 'For Sale',
      published: true,
      featured: true,
      virtualTourUrl: '',
      seoTitle: 'Gated Equestrian Estate - $14.2M Wellington',
      seoDescription: 'Luxury equestrian estate in Wellington. 7 bed, 9 bath, 15000 sqft on 25 acres with full facilities.',
      seoKeywords: 'wellington equestrian estate, florida horse farm, luxury acreage florida',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'sarasota-bay-waterfront-villa',
      slug: 'sarasota-bay-waterfront-villa',
      title: 'Sarasota Bay Waterfront Villa',
      description: 'Sleek contemporary villa on Sarasota Bay with breathtaking water views. Floor-to-ceiling glass walls, minimalist design, and cutting-edge smart home technology create an unparalleled coastal living experience.',
      price: '$7,200,000',
      location: 'Sarasota, FL',
      bedrooms: 5,
      bathrooms: 6,
      sqft: 7800,
      features: ['Bay Views', 'Private Dock', 'Infinity Pool', 'Home Theater', 'Gym & Spa', 'Smart Home'],
      images: [
        '/images/property-5.jpg',
        '/images/property-2.jpg'
      ],
      mainImage: '/images/property-5.jpg',
      propertyType: 'Waterfront',
      status: 'For Sale',
      published: true,
      featured: true,
      virtualTourUrl: '',
      seoTitle: 'Sarasota Bay Waterfront Villa - $7.2M',
      seoDescription: 'Contemporary waterfront villa in Sarasota. 5 bed, 6 bath, 7800 sqft with bay views and private dock.',
      seoKeywords: 'sarasota waterfront, bay front property, luxury sarasota home',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'fort-lauderdale-intracoastal-estate',
      slug: 'fort-lauderdale-intracoastal-estate',
      title: 'Fort Lauderdale Intracoastal Estate',
      description: 'Stunning estate on the Intracoastal Waterway with 150 feet of water frontage. Features a private yacht dock, resort-style pool, and sophisticated interiors with imported finishes throughout.',
      price: '$11,500,000',
      location: 'Fort Lauderdale, FL',
      bedrooms: 6,
      bathrooms: 7,
      sqft: 9200,
      features: ['Yacht Dock', 'Intracoastal Views', 'Resort Pool', 'Summer Kitchen', 'Wine Cellar', 'Smart Home'],
      images: [
        '/images/property-3.jpg',
        '/images/property-1.jpg'
      ],
      mainImage: '/images/property-3.jpg',
      propertyType: 'Waterfront',
      status: 'For Sale',
      published: true,
      featured: false,
      virtualTourUrl: '',
      seoTitle: 'Fort Lauderdale Intracoastal Estate - $11.5M',
      seoDescription: 'Luxury intracoastal estate in Fort Lauderdale. 6 bed, 7 bath, 9200 sqft with yacht dock.',
      seoKeywords: 'fort lauderdale estate, intracoastal property, yacht dock florida',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'jupiter-island-oceanfront',
      slug: 'jupiter-island-oceanfront',
      title: 'Jupiter Island Oceanfront',
      description: 'Exclusive oceanfront residence on prestigious Jupiter Island. This architectural gem offers unobstructed Atlantic views, private beach access, and the ultimate in sophisticated coastal living.',
      price: '$16,800,000',
      location: 'Jupiter Island, FL',
      bedrooms: 5,
      bathrooms: 7,
      sqft: 10500,
      features: ['Ocean Views', 'Private Beach', 'Infinity Pool', 'Guest House', 'Elevator', 'Hurricane Impact Glass'],
      images: [
        '/images/property-6.jpg',
        '/images/property-3.jpg'
      ],
      mainImage: '/images/property-6.jpg',
      propertyType: 'Waterfront',
      status: 'Pending',
      published: true,
      featured: false,
      virtualTourUrl: '',
      seoTitle: 'Jupiter Island Oceanfront - $16.8M',
      seoDescription: 'Exclusive oceanfront estate on Jupiter Island. 5 bed, 7 bath, 10500 sqft with private beach.',
      seoKeywords: 'jupiter island property, oceanfront florida, exclusive beach estate',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
  
  for (const property of properties) {
    await kvSet(`property:${property.id}`, property);
  }
  
  console.log(`✅ Seeded ${properties.length} properties`);
}

// Seed testimonials
async function seedTestimonials() {
  console.log('🌱 Seeding testimonials...');
  
  // Clear ALL testimonials (both formats)
  await clearPrefix('testimonial:');
  await clearPrefix('testimonial_');
  await kvDel('testimonials_all_ids');
  await kvDel('seed:completed:testimonials');
  
  const testimonials = [
    {
      id: 'sarah-mitchell',
      name: 'Sarah Mitchell',
      title: 'CEO, Tech Innovations Inc.',
      content: 'Working with Linart Realty was an absolute pleasure. Their professionalism, market knowledge, and dedication to finding the perfect property exceeded all expectations. They truly understand luxury real estate.',
      rating: 5,
      image: '/images/testimonial-1.jpg',
      location: 'Miami Beach, FL',
      propertyType: 'Waterfront Estate',
      published: true,
      featured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'michael-chen',
      name: 'Michael Chen',
      title: 'Entrepreneur & Investor',
      content: 'The team at Linart Realty provided exceptional service throughout our property search. Their attention to detail and understanding of our needs made the entire process seamless and enjoyable.',
      rating: 5,
      image: '/images/testimonial-2.jpg',
      location: 'Scottsdale, AZ',
      propertyType: 'Modern Villa',
      published: true,
      featured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'elizabeth-harrison',
      name: 'Elizabeth Harrison',
      title: 'Medical Director',
      content: 'Exceptional expertise in luxury real estate. Linart Realty helped us find our dream home with patience and professionalism. Their market insights and negotiation skills are unmatched.',
      rating: 5,
      image: '/images/testimonial-3.jpg',
      location: 'New York, NY',
      propertyType: 'Penthouse',
      published: true,
      featured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'david-rodriguez',
      name: 'David Rodriguez',
      title: 'Investment Banker',
      content: 'Outstanding service from start to finish. The Linart team understood exactly what we were looking for and delivered beyond our expectations. Highly recommended for luxury property investments.',
      rating: 5,
      image: '/images/testimonial-4.jpg',
      location: 'Los Angeles, CA',
      propertyType: 'Contemporary Estate',
      published: true,
      featured: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
  
  for (const testimonial of testimonials) {
    await kvSet(`testimonial:${testimonial.id}`, testimonial);
  }
  
  console.log(`✅ Seeded ${testimonials.length} testimonials`);
}

// Main handler
Deno.serve(async (req) => {
  // Set CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log('🌱 Starting seed process...');
    
    await seedBlogPosts();
    await seedProperties();
    await seedTestimonials();
    
    console.log('✅ All data seeded successfully!');
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'All initial data seeded successfully',
        counts: {
          blog: 1,
          properties: 9,
          testimonials: 4
        },
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
