import { getSupabaseClient } from './client';

/*
═══════════════════════════════════════════════════════════════════
  KV STORE CLIENT - Direct access to Supabase KV store from frontend
  - Bypasses Edge Functions for faster development
  - Uses ANON key for safe public access
═══════════════════════════════════════════════════════════════════
*/

export async function kvGet(key: string) {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('kv_store_dcec270f')
      .select('value')
      .eq('key', key)
      .single();

    if (error) {
      console.error(`KV Get error for key ${key}:`, error);
      return null;
    }

    return data?.value || null;
  } catch (error) {
    console.error(`KV Get exception for key ${key}:`, error);
    return null;
  }
}

export async function kvGetByPrefix(prefix: string) {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('kv_store_dcec270f')
      .select('key, value')
      .like('key', `${prefix}%`)
      .order('key');

    if (error) {
      console.error(`KV GetByPrefix error for prefix ${prefix}:`, error);
      return [];
    }

    return data?.map(item => item.value) || [];
  } catch (error) {
    console.error(`KV GetByPrefix exception for prefix ${prefix}:`, error);
    return [];
  }
}

export async function kvSet(key: string, value: any) {
  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from('kv_store_dcec270f')
      .upsert({ key, value }, { onConflict: 'key' });

    if (error) {
      console.error(`KV Set error for key ${key}:`, error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error(`KV Set exception for key ${key}:`, error);
    throw error;
  }
}

export async function kvDelete(key: string) {
  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from('kv_store_dcec270f')
      .delete()
      .eq('key', key);

    if (error) {
      console.error(`KV Delete error for key ${key}:`, error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error(`KV Delete exception for key ${key}:`, error);
    throw error;
  }
}
