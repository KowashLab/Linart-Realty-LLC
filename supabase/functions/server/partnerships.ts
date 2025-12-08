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

export async function seedInitialPartnerships(): Promise<boolean> {
  // Check if seeding has already been completed (using KV flag)
  const seedFlag = await kv.get('seed:completed:partnerships');
  if (seedFlag) {
    console.log('Partnerships already seeded (flag exists), skipping...');
    return true; // Already seeded
  }
  
  const existing = await getAllPartnerships();
  if (existing.length > 0) {
    console.log('Partnerships already exist, setting flag...');
    // Set flag to prevent future seeding
    await kv.set('seed:completed:partnerships', { completed: true, timestamp: new Date().toISOString() });
    return true;
  }
  
  console.log('Starting partnerships seeding...');
  
  const initialPartnerships = [
    {
      name: 'Sotheby\'s International Realty',
      description: 'Luxury partner providing global reach and prestige to our exclusive property portfolio.',
      logo: '/images/partnership-1.jpg',
      website: 'https://sothebysrealty.com',
      category: 'Luxury Partner',
      published: true,
      featured: true,
      displayOrder: 1
    },
    {
      name: 'Christie\'s Real Estate',
      description: 'Global network partnership offering international marketing and worldwide buyer access.',
      logo: '/images/partnership-2.jpg',
      website: 'https://christiesrealestate.com',
      category: 'Global Network',
      published: true,
      featured: true,
      displayOrder: 2
    },
    {
      name: 'Knight Frank',
      description: 'Strategic alliance providing international property investment expertise and market intelligence.',
      logo: '/images/partnership-3.jpg',
      website: 'https://knightfrank.com',
      category: 'Strategic Alliance',
      published: true,
      featured: true,
      displayOrder: 3
    },
    {
      name: 'Savills',
      description: 'International partner delivering comprehensive real estate services and global market access.',
      logo: '/images/partnership-4.jpg',
      website: 'https://savills.com',
      category: 'International Partner',
      published: true,
      featured: true,
      displayOrder: 4
    },
    {
      name: 'Engel & Völkers',
      description: 'Premium network partnership offering luxury property marketing and international clientele.',
      logo: '/images/partnership-5.jpg',
      website: 'https://engelvoelkers.com',
      category: 'Premium Network',
      published: true,
      featured: true,
      displayOrder: 5
    },
    {
      name: 'Coldwell Banker Global Luxury',
      description: 'Elite partner providing extensive luxury market reach and exclusive buyer network.',
      logo: '/images/partnership-6.jpg',
      website: 'https://coldwellbanker.com',
      category: 'Elite Partner',
      published: true,
      featured: true,
      displayOrder: 6
    }
  ];
  
  for (const partnershipData of initialPartnerships) {
    await createPartnership(partnershipData);
  }
  
  // Set flag to prevent future seeding
  await kv.set('seed:completed:partnerships', { completed: true, timestamp: new Date().toISOString() });
  console.log('Partnerships seeding completed.');
  return true;
}