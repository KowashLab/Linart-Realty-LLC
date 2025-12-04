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

export async function seedInitialRecognitions(): Promise<void> {
  const existing = await getAllRecognitions();
  if (existing.length > 0) return;
  
  const initialRecognitions = [
    {
      title: 'Top Luxury Agency',
      organization: 'Forbes Real Estate Council',
      year: '2025',
      description: 'Recognized as a leading luxury real estate agency for exceptional service and market performance.',
      icon: 'Award',
      category: 'Industry Award',
      published: true,
      featured: true,
      displayOrder: 1
    },
    {
      title: 'Excellence in Service',
      organization: 'Luxury Real Estate Association',
      year: '2024',
      description: 'Awarded for outstanding client service and dedication to excellence in luxury property transactions.',
      icon: 'Trophy',
      category: 'Recognition',
      published: true,
      featured: true,
      displayOrder: 2
    },
    {
      title: 'Certified Luxury Specialist',
      organization: 'Institute for Luxury Home Marketing',
      year: '2023',
      description: 'Professional certification demonstrating expertise in luxury real estate marketing and sales.',
      icon: 'Medal',
      category: 'Certification',
      published: true,
      featured: true,
      displayOrder: 3
    },
    {
      title: 'Best in Market Innovation',
      organization: 'National Association of Realtors',
      year: '2024',
      description: 'Recognition for innovative marketing strategies and cutting-edge technology implementation.',
      icon: 'Star',
      category: 'Industry Award',
      published: true,
      featured: false,
      displayOrder: 4
    },
    {
      title: 'Client Choice Award',
      organization: 'Real Estate Excellence Board',
      year: '2025',
      description: 'Voted by clients as the preferred luxury real estate agency for exceptional results.',
      icon: 'Heart',
      category: 'Recognition',
      published: true,
      featured: false,
      displayOrder: 5
    }
  ];
  
  for (const recognitionData of initialRecognitions) {
    await createRecognition(recognitionData);
  }
}