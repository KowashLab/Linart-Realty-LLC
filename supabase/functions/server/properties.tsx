import * as kv from './kv_store.tsx';

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
  const existing = await getAllProperties();
  if (existing.length > 0) return;
  
  const initialProperties = [
    {
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
      status: 'For Sale' as const,
      published: true,
      featured: true,
      virtualTourUrl: '',
      seoTitle: 'Waterfront Penthouse Estate - $12.5M Miami Beach',
      seoDescription: 'Luxury waterfront penthouse in Miami Beach. 5 bed, 6 bath, 8500 sqft with infinity pool and private beach access.',
      seoKeywords: 'waterfront penthouse, miami beach luxury, infinity pool estate'
    },
    {
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
      status: 'For Sale' as const,
      published: true,
      featured: true,
      virtualTourUrl: '',
      seoTitle: 'Oceanfront Mediterranean Estate - $18.9M Palm Beach',
      seoDescription: 'Spectacular Mediterranean estate in Palm Beach. 6 bed, 8 bath, 12000 sqft with private beach access.',
      seoKeywords: 'palm beach estate, oceanfront property, mediterranean villa, luxury beach house florida'
    },
    {
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
      status: 'For Sale' as const,
      published: true,
      featured: true,
      virtualTourUrl: '',
      seoTitle: 'Modern Architectural Masterpiece - $8.75M Naples',
      seoDescription: 'Award-winning contemporary villa in Naples. 4 bed, 5 bath, 6200 sqft with Gulf views.',
      seoKeywords: 'naples luxury home, architectural masterpiece, contemporary florida estate'
    },
    {
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
      status: 'For Sale' as const,
      published: true,
      featured: true,
      virtualTourUrl: '',
      seoTitle: 'Boca Raton Golf Estate - $6.95M',
      seoDescription: 'Luxury golf course estate in Boca Raton. 5 bed, 6 bath, 7800 sqft with fairway views.',
      seoKeywords: 'boca raton estate, golf course property, luxury florida home'
    },
    {
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
      status: 'For Sale' as const,
      published: true,
      featured: true,
      virtualTourUrl: '',
      seoTitle: 'Key West Island Paradise - $9.8M',
      seoDescription: 'Luxury island home in Key West. 4 bed, 5 bath, 5800 sqft with private dock and ocean views.',
      seoKeywords: 'key west property, island estate, florida keys luxury, waterfront key west'
    },
    {
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
      status: 'For Sale' as const,
      published: true,
      featured: true,
      virtualTourUrl: '',
      seoTitle: 'Gated Equestrian Estate - $14.2M Wellington',
      seoDescription: 'Luxury equestrian estate in Wellington. 7 bed, 9 bath, 15000 sqft on 25 acres with full facilities.',
      seoKeywords: 'wellington equestrian estate, florida horse farm, luxury acreage florida'
    },
    {
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
      status: 'For Sale' as const,
      published: true,
      featured: true,
      virtualTourUrl: '',
      seoTitle: 'Sarasota Bay Waterfront Villa - $7.2M',
      seoDescription: 'Contemporary waterfront villa in Sarasota. 5 bed, 6 bath, 7800 sqft with bay views and private dock.',
      seoKeywords: 'sarasota waterfront, bay front property, luxury sarasota home'
    },
    {
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
      status: 'For Sale' as const,
      published: true,
      featured: false,
      virtualTourUrl: '',
      seoTitle: 'Fort Lauderdale Intracoastal Estate - $11.5M',
      seoDescription: 'Luxury intracoastal estate in Fort Lauderdale. 6 bed, 7 bath, 9200 sqft with yacht dock.',
      seoKeywords: 'fort lauderdale estate, intracoastal property, yacht dock florida'
    },
    {
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
      status: 'Pending' as const,
      published: true,
      featured: false,
      virtualTourUrl: '',
      seoTitle: 'Jupiter Island Oceanfront - $16.8M',
      seoDescription: 'Exclusive oceanfront estate on Jupiter Island. 5 bed, 7 bath, 10500 sqft with private beach.',
      seoKeywords: 'jupiter island property, oceanfront florida, exclusive beach estate'
    }
  ];
  
  for (const propertyData of initialProperties) {
    await createProperty(propertyData);
  }
}