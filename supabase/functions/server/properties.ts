import * as kv from './kv_store.ts';

/*
═══════════════════════════════════════════════════════════════════
  PROPERTIES API - Luxury Real Estate Management
═══════════════════════════════════════════════════════════════════
*/

export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  features: string[];
  images: string[]; // Array of image URLs
  mainImage: string;
  propertyType: string; // 'Residential', 'Commercial', 'Waterfront', etc.
  status: 'For Sale' | 'Sold' | 'Pending';
  published: boolean;
  featured: boolean; // Featured on homepage
  createdAt: string;
  updatedAt: string;
  virtualTourUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function getAllPublishedProperties(): Promise<Property[]> {
  const properties = await kv.getByPrefix<Property>('property:');
  return properties
    .filter(p => p.published)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getFeaturedProperties(): Promise<Property[]> {
  const properties = await getAllPublishedProperties();
  return properties.filter(p => p.featured);
}

export async function getAllProperties(): Promise<Property[]> {
  const properties = await kv.getByPrefix<Property>('property:');
  return properties.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  const properties = await kv.getByPrefix<Property>('property:');
  return properties.find(p => p.slug === slug && p.published) || null;
}

export async function getPropertyById(id: string): Promise<Property | null> {
  return await kv.get<Property>(`property:${id}`);
}

export async function createProperty(data: Omit<Property, 'id' | 'createdAt' | 'updatedAt' | 'slug'>): Promise<Property> {
  const id = crypto.randomUUID();
  const slug = generateSlug(data.title);
  const now = new Date().toISOString();
  
  const property: Property = {
    id,
    slug,
    createdAt: now,
    updatedAt: now,
    ...data
  };
  
  await kv.set(`property:${id}`, property);
  return property;
}

export async function updateProperty(id: string, updates: Partial<Property>): Promise<Property | null> {
  const existing = await getPropertyById(id);
  if (!existing) return null;
  
  const updated: Property = {
    ...existing,
    ...updates,
    id: existing.id,
    createdAt: existing.createdAt,
    slug: updates.title ? generateSlug(updates.title) : existing.slug,
    updatedAt: new Date().toISOString()
  };
  
  await kv.set(`property:${id}`, updated);
  return updated;
}

export async function deleteProperty(id: string): Promise<boolean> {
  const property = await getPropertyById(id);
  if (!property) return false;
  
  await kv.del(`property:${id}`);
  return true;
}

export async function seedInitialProperties(): Promise<void> {
  // Check if seeding has already been completed (using KV flag)
  const seedFlag = await kv.get('seed:completed:properties');
  if (seedFlag) {
    console.log('Properties already seeded (flag exists), skipping...');
    return; // Already seeded
  }
  
  const existing = await getAllProperties();
  if (existing.length > 0) {
    console.log('Properties already exist, setting flag...');
    // Set flag to prevent future seeding
    await kv.set('seed:completed:properties', { completed: true, timestamp: new Date().toISOString() });
    return;
  }
  
  console.log('Starting properties seeding...');
  
  const initialProperties = [
    // ═══════════════════════════════════════════════════════════════
    // FEATURED PROPERTIES (6) - Displayed on Homepage
    // ═══════════════════════════════════════════════════════════════
    {
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
      status: 'For Sale' as const,
      published: true,
      featured: true,
      virtualTourUrl: '',
      seoTitle: 'Oceanfront Estate - $18.75M Boca Raton Luxury Real Estate',
      seoDescription: 'Luxury oceanfront estate in Boca Raton, FL. 6 bed, 8 bath, 11,000 sqft with private beach and deep water dock.',
      seoKeywords: 'boca raton oceanfront estate, luxury florida real estate, private beach property'
    },
    {
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
      status: 'For Sale' as const,
      published: true,
      featured: true,
      virtualTourUrl: '',
      seoTitle: 'Platinum Tower - $42.5M Miami Commercial Real Estate',
      seoDescription: 'Class A commercial office tower in Miami, FL. 85,400 sqft smart building in financial district.',
      seoKeywords: 'miami commercial real estate, class a office tower, smart building florida'
    },
    {
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
      status: 'For Sale' as const,
      published: true,
      featured: true,
      virtualTourUrl: '',
      seoTitle: 'Coastal Villa - $24.9M Palm Beach Luxury Estate',
      seoDescription: 'Luxury coastal villa in Palm Beach, FL. 7 bed, 9 bath, 13,850 sqft with ocean views and infinity pool.',
      seoKeywords: 'palm beach luxury villa, ocean view estate florida, infinity pool property'
    },
    {
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
      status: 'For Sale' as const,
      published: true,
      featured: true,
      virtualTourUrl: '',
      seoTitle: 'Mizner Park Plaza - $36.2M Boca Raton Commercial Investment',
      seoDescription: 'Premium mixed-use commercial plaza in Boca Raton, FL. 124,500 sqft retail and office complex.',
      seoKeywords: 'boca raton commercial real estate, mizner park investment, mixed use development florida'
    },
    {
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
      status: 'For Sale' as const,
      published: true,
      featured: true,
      virtualTourUrl: '',
      seoTitle: 'Bayfront Residence - $15.2M Fort Lauderdale Waterfront',
      seoDescription: 'Luxury bayfront residence in Fort Lauderdale, FL. 5 bed, 6 bath, 8,900 sqft with marina access.',
      seoKeywords: 'fort lauderdale waterfront, bayfront property florida, marina access luxury home'
    },
    {
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
      status: 'For Sale' as const,
      published: true,
      featured: true,
      virtualTourUrl: '',
      seoTitle: 'Harbor Complex - $28.75M Naples Commercial Waterfront',
      seoDescription: 'Premier waterfront commercial complex in Naples, FL. 95,300 sqft multi-tenant office and retail.',
      seoKeywords: 'naples commercial real estate, waterfront office building florida, investment property'
    },
    
    // ═══════════════════════════════════════════════════════════════
    // ADDITIONAL PROPERTIES (6) - Not Featured on Homepage
    // ═══════════════════════════════════════════════════════════════
    {
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
      status: 'For Sale' as const,
      published: true,
      featured: false,
      virtualTourUrl: '',
      seoTitle: 'Mediterranean Masterpiece - $21.5M Palm Beach Estate',
      seoDescription: 'Luxury Mediterranean villa in Palm Beach, FL. 6 bed, 7 bath, 10,200 sqft with ocean access.',
      seoKeywords: 'palm beach mediterranean villa, luxury estate florida, italian style mansion'
    },
    {
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
      status: 'For Sale' as const,
      published: true,
      featured: false,
      virtualTourUrl: '',
      seoTitle: 'Downtown Miami Penthouse - $16.9M Luxury Sky Residence',
      seoDescription: 'Ultra-luxury penthouse in Miami, FL. 4 bed, 5 bath, 6,800 sqft with rooftop pool and 360 views.',
      seoKeywords: 'miami penthouse, luxury sky residence florida, rooftop pool penthouse'
    },
    {
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
      status: 'Pending' as const,
      published: true,
      featured: false,
      virtualTourUrl: '',
      seoTitle: 'Waterfront Estate Mansion - $27.8M Fort Lauderdale',
      seoDescription: 'Grand waterfront mansion in Fort Lauderdale, FL. 7 bed, 9 bath, 14,500 sqft with yacht dock.',
      seoKeywords: 'fort lauderdale waterfront mansion, yacht dock estate florida, luxury water frontage'
    },
    {
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
      status: 'For Sale' as const,
      published: true,
      featured: false,
      virtualTourUrl: '',
      seoTitle: 'Key Biscayne Beach House - $12.4M Island Retreat',
      seoDescription: 'Luxury beach house in Key Biscayne, FL. 5 bed, 5 bath, 5,600 sqft with direct beach access.',
      seoKeywords: 'key biscayne beach house, island retreat florida, ocean view property'
    },
    {
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
      status: 'For Sale' as const,
      published: true,
      featured: false,
      virtualTourUrl: '',
      seoTitle: 'Naples Golf Estate - $11.75M Championship Course Property',
      seoDescription: 'Luxury golf course estate in Naples, FL. 5 bed, 6 bath, 9,200 sqft with fairway views.',
      seoKeywords: 'naples golf estate, championship course property florida, luxury golf home'
    },
    {
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
      status: 'For Sale' as const,
      published: true,
      featured: false,
      virtualTourUrl: '',
      seoTitle: 'Sarasota Bay Contemporary - $13.9M Modern Waterfront',
      seoDescription: 'Contemporary waterfront residence in Sarasota, FL. 4 bed, 5 bath, 7,400 sqft with bay views.',
      seoKeywords: 'sarasota contemporary home, bay front property florida, modern waterfront estate'
    }
  ];
  
  for (const propertyData of initialProperties) {
    await createProperty(propertyData);
  }
  
  // Set flag to prevent future seeding
  await kv.set('seed:completed:properties', { completed: true, timestamp: new Date().toISOString() });
  console.log('Properties seeding completed.');
}