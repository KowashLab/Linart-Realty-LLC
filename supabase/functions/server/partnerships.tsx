import * as kv from './kv_store.tsx';

/*
═══════════════════════════════════════════════════════════════════
  PARTNERSHIPS API - Strategic Partners Management
═══════════════════════════════════════════════════════════════════
*/

export interface Partnership {
  id: string;
  name: string;
  description: string;
  logo: string; // Logo image URL
  website?: string;
  category: string; // e.g., "Financial", "Legal", "Technology", "Design"
  published: boolean;
  featured: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export async function getAllPublishedPartnerships(): Promise<Partnership[]> {
  const partnerships = await kv.getByPrefix<Partnership>('partnership:');
  return partnerships
    .filter(p => p.published)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getFeaturedPartnerships(): Promise<Partnership[]> {
  const partnerships = await getAllPublishedPartnerships();
  return partnerships.filter(p => p.featured);
}

export async function getAllPartnerships(): Promise<Partnership[]> {
  const partnerships = await kv.getByPrefix<Partnership>('partnership:');
  return partnerships.sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getPartnershipById(id: string): Promise<Partnership | null> {
  return await kv.get<Partnership>(`partnership:${id}`);
}

export async function createPartnership(data: Omit<Partnership, 'id' | 'createdAt' | 'updatedAt'>): Promise<Partnership> {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  
  const partnership: Partnership = {
    id,
    createdAt: now,
    updatedAt: now,
    ...data
  };
  
  await kv.set(`partnership:${id}`, partnership);
  return partnership;
}

export async function updatePartnership(id: string, updates: Partial<Partnership>): Promise<Partnership | null> {
  const existing = await getPartnershipById(id);
  if (!existing) return null;
  
  const updated: Partnership = {
    ...existing,
    ...updates,
    id: existing.id,
    createdAt: existing.createdAt,
    updatedAt: new Date().toISOString()
  };
  
  await kv.set(`partnership:${id}`, updated);
  return updated;
}

export async function deletePartnership(id: string): Promise<boolean> {
  const partnership = await getPartnershipById(id);
  if (!partnership) return false;
  
  await kv.del(`partnership:${id}`);
  return true;
}

export async function seedInitialPartnerships(): Promise<void> {
  const existing = await getAllPartnerships();
  if (existing.length > 0) return;
  
  const initialPartnerships = [
    {
      name: 'Goldman Sachs Private Wealth',
      description: 'Premier financial services partner providing exclusive wealth management and investment advisory services for our high-net-worth clients.',
      logo: '/images/partnership-1.jpg',
      website: 'https://goldmansachs.com',
      category: 'Financial',
      published: true,
      featured: true,
      displayOrder: 1
    },
    {
      name: 'Architectural Digest',
      description: 'Collaborating with the world\'s leading authority on interior design and architecture to showcase exceptional properties.',
      logo: '/images/partnership-2.jpg',
      website: 'https://architecturaldigest.com',
      category: 'Media',
      published: true,
      featured: true,
      displayOrder: 2
    },
    {
      name: 'Christie\'s International Real Estate',
      description: 'Strategic alliance with the world\'s most prestigious real estate network, providing global reach and unparalleled marketing.',
      logo: '/images/partnership-3.jpg',
      website: 'https://christiesrealestate.com',
      category: 'Real Estate Network',
      published: true,
      featured: true,
      displayOrder: 3
    },
    {
      name: 'Sotheby\'s Auction House',
      description: 'Partnership with the renowned auction house for exclusive property showcases and luxury asset acquisitions.',
      logo: '/images/partnership-4.jpg',
      website: 'https://sothebys.com',
      category: 'Luxury Services',
      published: true,
      featured: false,
      displayOrder: 4
    },
    {
      name: 'Bentley Motors',
      description: 'Exclusive automotive partnership offering premium concierge services and luxury vehicle experiences for our clients.',
      logo: '/images/partnership-5.jpg',
      website: 'https://bentleymotors.com',
      category: 'Luxury Brand',
      published: true,
      featured: false,
      displayOrder: 5
    },
    {
      name: 'Four Seasons Private Residences',
      description: 'Collaboration with Four Seasons to offer exclusive branded residences with world-class hospitality services.',
      logo: '/images/partnership-6.jpg',
      website: 'https://fourseasons.com',
      category: 'Hospitality',
      published: true,
      featured: false,
      displayOrder: 6
    }
  ];
  
  for (const partnershipData of initialPartnerships) {
    await createPartnership(partnershipData);
  }
}