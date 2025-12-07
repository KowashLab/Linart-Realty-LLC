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

// Seed properties (12 TOTAL - 6 featured + 6 additional)
async function seedProperties() {
  console.log('🌱 Seeding properties...');
  
  // Clear ALL properties (both formats)
  await clearPrefix('property:');
  await clearPrefix('property_');
  await kvDel('properties_all_ids');
  await kvDel('seed:completed:properties');
  
  const properties = [
    // ═══════════════════════════════════════════════════════════════
    // FEATURED PROPERTIES (6) - Displayed on Homepage
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'oceanfront-estate',
      slug: 'oceanfront-estate',
      title: 'Oceanfront Estate',
      description: 'Spectacular oceanfront residential estate in prestigious Boca Raton offering unparalleled luxury living. This magnificent property features private beach access, deep water dock for yachts, and breathtaking Atlantic Ocean views from every room.',
      price: '$18,750,000',
      location: 'Boca Raton, FL',
      bedrooms: 6,
      bathrooms: 8,
      sqft: 11000,
      features: ['Private Beach', 'Deep Water Dock', 'Ocean Views', 'Smart Home System', 'Wine Cellar', 'Home Theater', 'Infinity Pool', 'Guest House'],
      images: ['/images/property-apartment-building.jpg'],
      mainImage: '/images/property-apartment-building.jpg',
      propertyType: 'Residential',
      status: 'For Sale',
      published: true,
      featured: true,
      virtualTourUrl: '',
      seoTitle: 'Oceanfront Estate - $18.75M Boca Raton Luxury Real Estate',
      seoDescription: 'Luxury oceanfront estate in Boca Raton, FL. 6 bed, 8 bath, 11,000 sqft with private beach and deep water dock.',
      seoKeywords: 'boca raton oceanfront estate, luxury florida real estate, private beach property',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'platinum-tower',
      slug: 'platinum-tower',
      title: 'Platinum Tower',
      description: 'Premier Class A commercial office tower in the heart of Miami\'s financial district. This exclusive 85,400 sq ft smart building offers cutting-edge technology, panoramic city views, and unmatched prestige for discerning corporate clients.',
      price: '$42,500,000',
      location: 'Miami, FL',
      bedrooms: 0,
      bathrooms: 0,
      sqft: 85400,
      features: ['Class A Office', 'Smart Building', 'High-Speed Elevators', 'Executive Parking', 'Rooftop Terrace', 'Conference Center', 'Fiber Optic', 'Security System'],
      images: ['/images/property-office-building.jpg'],
      mainImage: '/images/property-office-building.jpg',
      propertyType: 'Commercial',
      status: 'For Sale',
      published: true,
      featured: true,
      virtualTourUrl: '',
      seoTitle: 'Platinum Tower - $42.5M Miami Commercial Real Estate',
      seoDescription: 'Class A commercial office tower in Miami, FL. 85,400 sqft smart building in financial district.',
      seoKeywords: 'miami commercial real estate, class a office tower, smart building florida',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'coastal-villa',
      slug: 'coastal-villa',
      title: 'Coastal Villa',
      description: 'Exquisite coastal estate in prestigious Palm Beach featuring unobstructed ocean views and infinity pool. This architectural masterpiece spans 13,850 sq ft of sophisticated living space with 7 bedrooms, 9 bathrooms, and world-class amenities.',
      price: '$24,900,000',
      location: 'Palm Beach, FL',
      bedrooms: 7,
      bathrooms: 9,
      sqft: 13850,
      features: ['Ocean Views', 'Infinity Pool', 'Private Beach Access', 'Wine Cellar', 'Home Automation', 'Guest Cottage', 'Outdoor Kitchen', 'Spa & Sauna'],
      images: ['/images/property-island-beach-house.jpg'],
      mainImage: '/images/property-island-beach-house.jpg',
      propertyType: 'Residential',
      status: 'For Sale',
      published: true,
      featured: true,
      virtualTourUrl: '',
      seoTitle: 'Coastal Villa - $24.9M Palm Beach Luxury Estate',
      seoDescription: 'Luxury coastal villa in Palm Beach, FL. 7 bed, 9 bath, 13,850 sqft with ocean views and infinity pool.',
      seoKeywords: 'palm beach luxury villa, ocean view estate florida, infinity pool property',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'mizner-park-plaza',
      slug: 'mizner-park-plaza',
      title: 'Mizner Park Plaza',
      description: 'Prestigious mixed-use commercial development in the heart of Boca Raton\'s Mizner Park. This 124,500 sq ft premium retail and office complex offers exceptional visibility, foot traffic, and investment potential in one of Florida\'s most desirable locations.',
      price: '$36,200,000',
      location: 'Boca Raton, FL',
      bedrooms: 0,
      bathrooms: 0,
      sqft: 124500,
      features: ['Mixed Use', 'Premium Retail', 'High Traffic Location', 'Parking Garage', 'Upscale Dining', 'Professional Offices', 'Prime Location', 'Investment Opportunity'],
      images: ['/images/property-shopping-plaza.jpg'],
      mainImage: '/images/property-shopping-plaza.jpg',
      propertyType: 'Commercial',
      status: 'For Sale',
      published: true,
      featured: true,
      virtualTourUrl: '',
      seoTitle: 'Mizner Park Plaza - $36.2M Boca Raton Commercial Investment',
      seoDescription: 'Premium mixed-use commercial plaza in Boca Raton, FL. 124,500 sqft retail and office complex.',
      seoKeywords: 'boca raton commercial real estate, mizner park investment, mixed use development florida',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'bayfront-residence',
      slug: 'bayfront-residence',
      title: 'Bayfront Residence',
      description: 'Stunning contemporary bayfront residence in Fort Lauderdale featuring 8,900 sq ft of luxury living space. This architectural gem offers 5 bedrooms, 6 bathrooms, marina access for yachts, and a spectacular rooftop terrace with panoramic Intracoastal views.',
      price: '$15,200,000',
      location: 'Fort Lauderdale, FL',
      bedrooms: 5,
      bathrooms: 6,
      sqft: 8900,
      features: ['Marina Access', 'Rooftop Terrace', 'Intracoastal Views', 'Private Dock', 'Infinity Pool', 'Smart Home', 'Wine Cellar', 'Home Theater'],
      images: ['/images/property-modern-house.jpg'],
      mainImage: '/images/property-modern-house.jpg',
      propertyType: 'Residential',
      status: 'For Sale',
      published: true,
      featured: true,
      virtualTourUrl: '',
      seoTitle: 'Bayfront Residence - $15.2M Fort Lauderdale Waterfront',
      seoDescription: 'Luxury bayfront residence in Fort Lauderdale, FL. 5 bed, 6 bath, 8,900 sqft with marina access.',
      seoKeywords: 'fort lauderdale waterfront, bayfront property florida, marina access luxury home',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'harbor-complex',
      slug: 'harbor-complex',
      title: 'Harbor Complex',
      description: 'Premier waterfront commercial complex in Naples offering 95,300 sq ft of Class A office and retail space. This exclusive multi-tenant development features stunning harbor views, modern amenities, and exceptional investment returns in Southwest Florida\'s most prestigious market.',
      price: '$28,750,000',
      location: 'Naples, FL',
      bedrooms: 0,
      bathrooms: 0,
      sqft: 95300,
      features: ['Waterfront', 'Multi-Tenant', 'Harbor Views', 'Class A Office', 'Retail Space', 'Executive Parking', 'Modern Design', 'Investment Grade'],
      images: ['/images/property-corporate-headquarters.jpg'],
      mainImage: '/images/property-corporate-headquarters.jpg',
      propertyType: 'Commercial',
      status: 'For Sale',
      published: true,
      featured: true,
      virtualTourUrl: '',
      seoTitle: 'Harbor Complex - $28.75M Naples Commercial Waterfront',
      seoDescription: 'Premier waterfront commercial complex in Naples, FL. 95,300 sqft multi-tenant office and retail.',
      seoKeywords: 'naples commercial real estate, waterfront office building florida, investment property',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    
    // ═══════════════════════════════════════════════════════════════
    // ADDITIONAL PROPERTIES (6) - Not Featured on Homepage
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'mediterranean-masterpiece',
      slug: 'mediterranean-masterpiece',
      title: 'Mediterranean Masterpiece',
      description: 'Spectacular Mediterranean-style villa in exclusive Palm Beach showcasing Old World elegance and modern luxury. This 10,200 sq ft estate features imported Italian marble, hand-painted ceilings, lush gardens, and direct ocean access.',
      price: '$21,500,000',
      location: 'Palm Beach, FL',
      bedrooms: 6,
      bathrooms: 7,
      sqft: 10200,
      features: ['Mediterranean Style', 'Ocean Access', 'Italian Marble', 'Gourmet Kitchen', 'Wine Cellar', 'Pool & Spa', 'Guest House', 'Formal Gardens'],
      images: ['/images/property-mediterranean-villa.jpg'],
      mainImage: '/images/property-mediterranean-villa.jpg',
      propertyType: 'Residential',
      status: 'For Sale',
      published: true,
      featured: false,
      virtualTourUrl: '',
      seoTitle: 'Mediterranean Masterpiece - $21.5M Palm Beach Estate',
      seoDescription: 'Luxury Mediterranean villa in Palm Beach, FL. 6 bed, 7 bath, 10,200 sqft with ocean access.',
      seoKeywords: 'palm beach mediterranean villa, luxury estate florida, italian style mansion',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'downtown-miami-penthouse',
      slug: 'downtown-miami-penthouse',
      title: 'Downtown Miami Penthouse',
      description: 'Ultra-luxury penthouse atop Miami\'s most prestigious residential tower. This 6,800 sq ft sky residence features floor-to-ceiling glass, private rooftop terrace with pool, and breathtaking 360-degree views of Biscayne Bay and the Atlantic Ocean.',
      price: '$16,900,000',
      location: 'Miami, FL',
      bedrooms: 4,
      bathrooms: 5,
      sqft: 6800,
      features: ['Rooftop Terrace', 'Private Pool', 'Bay Views', 'Ocean Views', 'Smart Home', 'Concierge Service', 'Wine Storage', 'Private Elevator'],
      images: ['/images/property-miami-penthouse.jpg'],
      mainImage: '/images/property-miami-penthouse.jpg',
      propertyType: 'Residential',
      status: 'For Sale',
      published: true,
      featured: false,
      virtualTourUrl: '',
      seoTitle: 'Downtown Miami Penthouse - $16.9M Luxury Sky Residence',
      seoDescription: 'Ultra-luxury penthouse in Miami, FL. 4 bed, 5 bath, 6,800 sqft with rooftop pool and 360 views.',
      seoKeywords: 'miami penthouse, luxury sky residence florida, rooftop pool penthouse',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'waterfront-estate-mansion',
      slug: 'waterfront-estate-mansion',
      title: 'Waterfront Estate Mansion',
      description: 'Grand waterfront mansion offering the ultimate in Florida luxury living. This 14,500 sq ft estate features 200 feet of water frontage, private yacht dock, resort-style pool complex, and impeccable designer interiors throughout.',
      price: '$27,800,000',
      location: 'Fort Lauderdale, FL',
      bedrooms: 7,
      bathrooms: 9,
      sqft: 14500,
      features: ['Private Yacht Dock', 'Water Frontage', 'Resort Pool', 'Home Theater', 'Wine Room', 'Guest Wing', 'Outdoor Kitchen', 'Smart Technology'],
      images: ['/images/property-waterfront-mansion.jpg'],
      mainImage: '/images/property-waterfront-mansion.jpg',
      propertyType: 'Residential',
      status: 'Pending',
      published: true,
      featured: false,
      virtualTourUrl: '',
      seoTitle: 'Waterfront Estate Mansion - $27.8M Fort Lauderdale',
      seoDescription: 'Grand waterfront mansion in Fort Lauderdale, FL. 7 bed, 9 bath, 14,500 sqft with yacht dock.',
      seoKeywords: 'fort lauderdale waterfront mansion, yacht dock estate florida, luxury water frontage',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'key-biscayne-beach-house',
      slug: 'key-biscayne-beach-house',
      title: 'Key Biscayne Beach House',
      description: 'Exclusive island retreat on pristine Key Biscayne featuring direct beach access and stunning ocean views. This 5,600 sq ft contemporary beach house offers sophisticated coastal living with floor-to-ceiling glass and seamless indoor-outdoor flow.',
      price: '$12,400,000',
      location: 'Key Biscayne, FL',
      bedrooms: 5,
      bathrooms: 5,
      sqft: 5600,
      features: ['Beach Access', 'Ocean Views', 'Contemporary Design', 'Infinity Pool', 'Outdoor Living', 'Smart Home', 'Hurricane Impact Glass', 'Private Paradise'],
      images: ['/images/property-1.jpg'],
      mainImage: '/images/property-1.jpg',
      propertyType: 'Residential',
      status: 'For Sale',
      published: true,
      featured: false,
      virtualTourUrl: '',
      seoTitle: 'Key Biscayne Beach House - $12.4M Island Retreat',
      seoDescription: 'Luxury beach house in Key Biscayne, FL. 5 bed, 5 bath, 5,600 sqft with direct beach access.',
      seoKeywords: 'key biscayne beach house, island retreat florida, ocean view property',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'naples-golf-estate',
      slug: 'naples-golf-estate',
      title: 'Naples Golf Estate',
      description: 'Magnificent estate on championship golf course in prestigious Naples community. This 9,200 sq ft residence features panoramic fairway views, resort-style amenities, and award-winning interior design by renowned Florida architects.',
      price: '$11,750,000',
      location: 'Naples, FL',
      bedrooms: 5,
      bathrooms: 6,
      sqft: 9200,
      features: ['Golf Course Views', 'Championship Course', 'Resort Amenities', 'Pool & Spa', 'Outdoor Kitchen', 'Wine Cellar', 'Home Office', 'Guest Suite'],
      images: ['/images/property-2.jpg'],
      mainImage: '/images/property-2.jpg',
      propertyType: 'Residential',
      status: 'For Sale',
      published: true,
      featured: false,
      virtualTourUrl: '',
      seoTitle: 'Naples Golf Estate - $11.75M Championship Course Property',
      seoDescription: 'Luxury golf course estate in Naples, FL. 5 bed, 6 bath, 9,200 sqft with fairway views.',
      seoKeywords: 'naples golf estate, championship course property florida, luxury golf home',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'sarasota-bay-contemporary',
      slug: 'sarasota-bay-contemporary',
      title: 'Sarasota Bay Contemporary',
      description: 'Award-winning contemporary residence on Sarasota Bay featuring cutting-edge architecture and smart home technology. This 7,400 sq ft masterpiece offers floor-to-ceiling glass, private dock, and breathtaking sunset views over the bay.',
      price: '$13,900,000',
      location: 'Sarasota, FL',
      bedrooms: 4,
      bathrooms: 5,
      sqft: 7400,
      features: ['Bay Views', 'Private Dock', 'Smart Home', 'Contemporary Design', 'Infinity Pool', 'Sunset Views', 'Gourmet Kitchen', 'Rooftop Deck'],
      images: ['/images/property-3.jpg'],
      mainImage: '/images/property-3.jpg',
      propertyType: 'Residential',
      status: 'For Sale',
      published: true,
      featured: false,
      virtualTourUrl: '',
      seoTitle: 'Sarasota Bay Contemporary - $13.9M Modern Waterfront',
      seoDescription: 'Contemporary waterfront residence in Sarasota, FL. 4 bed, 5 bath, 7,400 sqft with bay views.',
      seoKeywords: 'sarasota contemporary home, bay front property florida, modern waterfront estate',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
  
  for (const property of properties) {
    await kvSet(`property:${property.id}`, property);
  }
  
  console.log(`✅ Seeded ${properties.length} properties`);
}

// Seed testimonials (8 TOTAL - 7 featured + 1 not featured)
async function seedTestimonials() {
  console.log('🌱 Seeding testimonials...');
  
  // Clear ALL testimonials (both formats)
  await clearPrefix('testimonial:');
  await clearPrefix('testimonial_');
  await kvDel('testimonials_all_ids');
  await kvDel('seed:completed:testimonials');
  
  const testimonials = [
    {
      id: 'richard-ashford',
      name: 'Richard Ashford',
      title: 'CEO, Ashford Capital',
      content: 'Working with Linart Realty was transformative for our portfolio expansion. Their deep market knowledge and strategic approach to luxury real estate investment yielded exceptional returns. The team\'s professionalism and attention to detail are unmatched in the Florida market.',
      rating: 5,
      image: '/images/testimonial-1.jpg',
      location: 'Boca Raton, FL',
      propertyType: 'Investment Portfolio',
      published: true,
      featured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'victoria-sterling',
      name: 'Victoria Sterling',
      title: 'Portfolio Director, Sterling Ventures',
      content: 'Linart Realty\'s expertise in Miami\'s luxury waterfront market is extraordinary. They guided us through multiple high-value acquisitions with precision and discretion. Their network and market intelligence provided us with exclusive off-market opportunities.',
      rating: 5,
      image: '/images/testimonial-2.jpg',
      location: 'Miami, FL',
      propertyType: 'Waterfront Estate',
      published: true,
      featured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'james-catherine-porter',
      name: 'James & Catherine Porter',
      title: 'Homeowners, Private Clients',
      content: 'Finding our dream home in Boca Raton exceeded every expectation thanks to Linart Realty. Their patience, understanding of our needs, and dedication to excellence made the entire process seamless. We couldn\'t be happier with our new estate.',
      rating: 5,
      image: '/images/testimonial-3.jpg',
      location: 'Boca Raton, FL',
      propertyType: 'Luxury Estate',
      published: true,
      featured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'isabella-rosewood',
      name: 'Isabella Rosewood',
      title: 'Principal, Rosewood Estates',
      content: 'As a real estate professional myself, I can confidently say Linart Realty operates at the highest level. Their marketing strategies, client relationships, and market positioning are exemplary. A true partner in luxury real estate.',
      rating: 5,
      image: '/images/testimonial-4.jpg',
      location: 'Naples, FL',
      propertyType: 'Golf Course Estate',
      published: true,
      featured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'alexander-drake',
      name: 'Alexander Drake',
      title: 'Investment Director, Drake Properties',
      content: 'The Linart team\'s investment acumen and market analysis helped us identify premium opportunities in Fort Lauderdale\'s competitive market. Their strategic guidance has been invaluable to our portfolio growth.',
      rating: 5,
      image: '/images/testimonial-5.jpg',
      location: 'Fort Lauderdale, FL',
      propertyType: 'Commercial Investment',
      published: true,
      featured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'diana-montgomery',
      name: 'Diana Montgomery',
      title: 'Art Collector, Private Client',
      content: 'Linart Realty understood my unique requirements for displaying my art collection. They found a Palm Beach estate with the perfect gallery spaces and architectural character. Their attention to my specific needs was remarkable.',
      rating: 5,
      image: '/images/testimonial-6.jpg',
      location: 'Palm Beach, FL',
      propertyType: 'Estate with Gallery',
      published: true,
      featured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'robert-chen',
      name: 'Robert Chen',
      title: 'Technology Entrepreneur, Private Client',
      content: 'As a tech entrepreneur, I value efficiency and innovation. Linart Realty delivered on both fronts, using cutting-edge technology and market insights to help me find the perfect smart home estate in Boca Raton.',
      rating: 5,
      image: '/images/testimonial-7.jpg',
      location: 'Boca Raton, FL',
      propertyType: 'Smart Home Estate',
      published: true,
      featured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'margaret-william-hartford',
      name: 'Margaret & William Hartford',
      title: 'Retired Executives, Private Clients',
      content: 'After successful careers, we wanted a serene waterfront retreat in Key Biscayne. Linart Realty made our retirement dream come true. Their professionalism, market knowledge, and genuine care for our happiness made all the difference.',
      rating: 5,
      image: '/images/testimonial-8.jpg',
      location: 'Key Biscayne, FL',
      propertyType: 'Waterfront Retreat',
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

// Seed recognition awards (4 TOTAL)
async function seedRecognitions() {
  console.log('🌱 Seeding recognitions...');
  
  // Clear ALL recognitions (both formats)
  await clearPrefix('recognition:');
  await clearPrefix('recognition_');
  await kvDel('recognitions_all_ids');
  await kvDel('seed:completed:recognition');
  
  const recognitions = [
    {
      id: 'top-luxury-brokerage',
      title: 'Top Luxury Brokerage',
      organization: 'Florida Real Estate',
      year: '2024',
      description: 'Recognized as the leading luxury real estate brokerage in Florida for exceptional service, market expertise, and record-breaking sales performance.',
      icon: 'Trophy',
      category: 'Industry Award',
      published: true,
      featured: true,
      displayOrder: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'excellence-in-design',
      title: 'Excellence in Design',
      organization: 'Architectural Digest',
      year: '2024',
      description: 'Honored for exceptional property presentation, marketing design excellence, and innovative approaches to showcasing luxury real estate.',
      icon: 'Award',
      category: 'Recognition',
      published: true,
      featured: true,
      displayOrder: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'best-commercial-portfolio',
      title: 'Best Commercial Portfolio',
      organization: 'Real Estate Weekly',
      year: '2025',
      description: 'Awarded for outstanding commercial real estate portfolio management and strategic investment advisory services.',
      icon: 'Star',
      category: 'Industry Award',
      published: true,
      featured: true,
      displayOrder: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'platinum-service-award',
      title: 'Platinum Service Award',
      organization: 'Luxury Real Estate',
      year: '2023',
      description: 'Distinguished recognition for exceptional client service, dedication to excellence, and commitment to exceeding client expectations.',
      icon: 'Medal',
      category: 'Recognition',
      published: true,
      featured: true,
      displayOrder: 4,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
  
  for (const recognition of recognitions) {
    await kvSet(`recognition:${recognition.id}`, recognition);
  }
  
  console.log(`✅ Seeded ${recognitions.length} recognitions`);
}

// Seed strategic partnerships (6 TOTAL)
async function seedPartnerships() {
  console.log('🌱 Seeding partnerships...');
  
  // Clear ALL partnerships (both formats)
  await clearPrefix('partnership:');
  await clearPrefix('partnership_');
  await kvDel('partnerships_all_ids');
  await kvDel('seed:completed:partnerships');
  
  const partnerships = [
    {
      id: 'sothebys-international',
      name: 'Sotheby\'s International Realty',
      description: 'Luxury partner providing global reach and prestige to our exclusive property portfolio.',
      logo: '/images/partnership-1.jpg',
      website: 'https://sothebysrealty.com',
      category: 'Luxury Partner',
      published: true,
      featured: true,
      displayOrder: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'christies-real-estate',
      name: 'Christie\'s Real Estate',
      description: 'Global network partnership offering international marketing and worldwide buyer access.',
      logo: '/images/partnership-2.jpg',
      website: 'https://christiesrealestate.com',
      category: 'Global Network',
      published: true,
      featured: true,
      displayOrder: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'knight-frank',
      name: 'Knight Frank',
      description: 'Strategic alliance providing international property investment expertise and market intelligence.',
      logo: '/images/partnership-3.jpg',
      website: 'https://knightfrank.com',
      category: 'Strategic Alliance',
      published: true,
      featured: true,
      displayOrder: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'savills',
      name: 'Savills',
      description: 'International partner delivering comprehensive real estate services and global market access.',
      logo: '/images/partnership-4.jpg',
      website: 'https://savills.com',
      category: 'International Partner',
      published: true,
      featured: true,
      displayOrder: 4,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'engel-volkers',
      name: 'Engel & Völkers',
      description: 'Premium network partnership offering luxury property marketing and international clientele.',
      logo: '/images/partnership-5.jpg',
      website: 'https://engelvoelkers.com',
      category: 'Premium Network',
      published: true,
      featured: true,
      displayOrder: 5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'coldwell-banker-global-luxury',
      name: 'Coldwell Banker Global Luxury',
      description: 'Elite partner providing extensive luxury market reach and exclusive buyer network.',
      logo: '/images/partnership-6.jpg',
      website: 'https://coldwellbanker.com',
      category: 'Elite Partner',
      published: true,
      featured: true,
      displayOrder: 6,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
  
  for (const partnership of partnerships) {
    await kvSet(`partnership:${partnership.id}`, partnership);
  }
  
  console.log(`✅ Seeded ${partnerships.length} partnerships`);
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
    await seedRecognitions();
    await seedPartnerships();
    
    console.log('✅ All data seeded successfully!');
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'All initial data seeded successfully',
        counts: {
          blog: 1,
          properties: 12,
          testimonials: 8,
          recognitions: 4,
          partnerships: 6
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