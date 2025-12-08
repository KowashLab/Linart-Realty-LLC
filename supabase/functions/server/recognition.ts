import * as kv from './kv_store.ts';

/*
═══════════════════════════════════════════════════════════════════
  RECOGNITION API - Awards & Achievements Management
═══════════════════════════════════════════════════════════════════
*/

export interface Recognition {
  id: string;
  title: string;
  organization: string; // e.g., "Forbes Real Estate Council"
  year: string;
  description: string;
  icon: string; // Icon name or image URL
  category: string; // e.g., "Industry Award", "Certification", "Recognition"
  published: boolean;
  featured: boolean;
  displayOrder: number; // For manual sorting
  createdAt: string;
  updatedAt: string;
}

export async function getAllPublishedRecognitions(): Promise<Recognition[]> {
  const recognitions = await kv.getByPrefix<Recognition>('recognition:');
  return recognitions
    .filter(r => r.published)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getFeaturedRecognitions(): Promise<Recognition[]> {
  const recognitions = await getAllPublishedRecognitions();
  return recognitions.filter(r => r.featured);
}

export async function getAllRecognitions(): Promise<Recognition[]> {
  const recognitions = await kv.getByPrefix<Recognition>('recognition:');
  return recognitions.sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getRecognitionById(id: string): Promise<Recognition | null> {
  return await kv.get<Recognition>(`recognition:${id}`);
}

export async function createRecognition(data: Omit<Recognition, 'id' | 'createdAt' | 'updatedAt'>): Promise<Recognition> {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  
  const recognition: Recognition = {
    id,
    createdAt: now,
    updatedAt: now,
    ...data
  };
  
  await kv.set(`recognition:${id}`, recognition);
  return recognition;
}

export async function updateRecognition(id: string, updates: Partial<Recognition>): Promise<Recognition | null> {
  const existing = await getRecognitionById(id);
  if (!existing) return null;
  
  const updated: Recognition = {
    ...existing,
    ...updates,
    id: existing.id,
    createdAt: existing.createdAt,
    updatedAt: new Date().toISOString()
  };
  
  await kv.set(`recognition:${id}`, updated);
  return updated;
}

export async function deleteRecognition(id: string): Promise<boolean> {
  const recognition = await getRecognitionById(id);
  if (!recognition) return false;
  
  await kv.del(`recognition:${id}`);
  return true;
}

export async function seedInitialRecognitions(): Promise<boolean> {
  // Check if seeding has already been completed (using KV flag)
  const seedFlag = await kv.get('seed:completed:recognition');
  if (seedFlag) {
    console.log('Recognition already seeded (flag exists), skipping...');
    return true; // Already seeded
  }
  
  const existing = await getAllRecognitions();
  if (existing.length > 0) {
    console.log('Recognition already exists, setting flag...');
    // Set flag to prevent future seeding
    await kv.set('seed:completed:recognition', { completed: true, timestamp: new Date().toISOString() });
    return true;
  }
  
  console.log('Starting recognition seeding...');
  
  const initialRecognitions = [
    {
      title: 'Top Luxury Brokerage',
      organization: 'Florida Real Estate',
      year: '2024',
      description: 'Recognized as the leading luxury real estate brokerage in Florida for exceptional service, market expertise, and record-breaking sales performance.',
      icon: 'Trophy',
      category: 'Industry Award',
      published: true,
      featured: true,
      displayOrder: 1
    },
    {
      title: 'Excellence in Design',
      organization: 'Architectural Digest',
      year: '2024',
      description: 'Honored for exceptional property presentation, marketing design excellence, and innovative approaches to showcasing luxury real estate.',
      icon: 'Award',
      category: 'Recognition',
      published: true,
      featured: true,
      displayOrder: 2
    },
    {
      title: 'Best Commercial Portfolio',
      organization: 'Real Estate Weekly',
      year: '2025',
      description: 'Awarded for outstanding commercial real estate portfolio management and strategic investment advisory services.',
      icon: 'Star',
      category: 'Industry Award',
      published: true,
      featured: true,
      displayOrder: 3
    },
    {
      title: 'Platinum Service Award',
      organization: 'Luxury Real Estate',
      year: '2023',
      description: 'Distinguished recognition for exceptional client service, dedication to excellence, and commitment to exceeding client expectations.',
      icon: 'Medal',
      category: 'Recognition',
      published: true,
      featured: true,
      displayOrder: 4
    }
  ];
  
  for (const recognitionData of initialRecognitions) {
    await createRecognition(recognitionData);
  }
  
  // Set flag to prevent future seeding
  await kv.set('seed:completed:recognition', { completed: true, timestamp: new Date().toISOString() });
  console.log('Recognition seeding completed.');
  return true;
}