import { projectId, publicAnonKey } from '../utils/supabase/info';

/*
═══════════════════════════════════════════════════════════════════
  SEED DATA UTILITY
  - Seeds initial data into the database
  - Run once on first app load
═══════════════════════════════════════════════════════════════════
*/

// Use the dedicated `seed` function endpoint (reliable and tested).
// The `server` function has issues with cold starts/timeouts.
const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/seed`;

export async function seedAllData() {
  try {
    console.log('🌱 Seeding initial data...');
    
    const response = await fetch(API_BASE_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      console.error('❌ Seed error:', errorData);
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Seed completed successfully:', result);
    return result;
  } catch (error) {
    console.error('❌ Seed failed:', error);
    throw error;
  }
}

// Check if data has been seeded
export function hasBeenSeeded(): boolean {
  return localStorage.getItem('data_seeded') === 'true';
}

// Mark data as seeded
export function markAsSeeded(): void {
  localStorage.setItem('data_seeded', 'true');
}

// Auto-seed on first load
export async function autoSeed() {
  if (!hasBeenSeeded()) {
    try {
      await seedAllData();
      markAsSeeded();
      return true;
    } catch (error) {
      console.error('Auto-seed failed:', error);
      return false;
    }
  }
  return false;
}