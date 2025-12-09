import { createClient } from 'jsr:@supabase/supabase-js@2';
import * as kv from '../server/kv_store.ts';

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);

// Import seed data from server modules (reuse the same data)
import { seedInitialProperties } from '../server/properties.ts';
import { seedInitialTestimonials } from '../server/testimonials.ts';
import { seedInitialRecognitions } from '../server/recognition.ts';
import { seedInitialPartnerships } from '../server/partnerships.ts';
import { seedInitialPosts } from '../server/blog.ts';

Deno.serve(async (req) => {
  // CORS headers
  if (req.method === 'OPTIONS') {
    return new Response('ok', { 
      headers: { 
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      } 
    });
  }

  try {
    console.log('🌱 Starting seed process...');
    
    // Check for force parameter to reset seed flags
    const url = new URL(req.url);
    const force = url.searchParams.get('force') === 'true';
    const clean = url.searchParams.get('clean') === 'true';
    
    if (clean) {
      console.log('🧹 Clean mode enabled - deleting ALL data...');
      // Delete all properties
      const { error: propsError } = await supabase
        .from('kv_store_dcec270f')
        .delete()
        .like('key', 'property:%');
      if (propsError) console.error('Error deleting properties:', propsError);
      
      // Delete all testimonials
      const { error: testimonialsError } = await supabase
        .from('kv_store_dcec270f')
        .delete()
        .like('key', 'testimonial:%');
      if (testimonialsError) console.error('Error deleting testimonials:', testimonialsError);
      
      console.log('✅ All data deleted');
    }
    
    if (force || clean) {
      console.log('⚠️ Force mode enabled - deleting seed flags...');
      await kv.del('seed:completed:blog');
      await kv.del('seed:completed:properties');
      await kv.del('seed:completed:testimonials');
      await kv.del('seed:completed:recognition');
      await kv.del('seed:completed:partnerships');
      console.log('✅ Seed flags deleted');
    }
    
    const results = {
      blog: 0,
      properties: 0,
      testimonials: 0,
      recognition: 0,
      partnerships: 0,
    };

    // Seed blog
    await seedInitialPosts();
    const { count: blogCount } = await supabase
      .from('kv_store_dcec270f')
      .select('key', { count: 'exact', head: true })
      .like('key', 'blog:post:%');
    results.blog = blogCount || 0;

    // Seed properties
    const propsResult = await seedInitialProperties();
    const { count: propsCount } = await supabase
      .from('kv_store_dcec270f')
      .select('key', { count: 'exact', head: true })
      .like('key', 'property:%');
    results.properties = propsCount || 0;
    console.log('Properties result:', JSON.stringify(propsResult));

    // Seed testimonials
    const testimonialsResult = await seedInitialTestimonials();
    const { count: testimonialsCount } = await supabase
      .from('kv_store_dcec270f')
      .select('key', { count: 'exact', head: true })
      .like('key', 'testimonial:%');
    results.testimonials = testimonialsCount || 0;
    console.log('Testimonials result:', JSON.stringify(testimonialsResult));

    // Seed recognition
    await seedInitialRecognitions();
    const { count: recognitionCount } = await supabase
      .from('kv_store_dcec270f')
      .select('key', { count: 'exact', head: true })
      .like('key', 'recognition:%');
    results.recognition = recognitionCount || 0;

    // Seed partnerships
    await seedInitialPartnerships();
    const { count: partnershipsCount } = await supabase
      .from('kv_store_dcec270f')
      .select('key', { count: 'exact', head: true })
      .like('key', 'partnership:%');
    results.partnerships = partnershipsCount || 0;

    console.log('✅ Seed completed:', results);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'All initial data seeded successfully',
        counts: results,
        details: {
          properties: propsResult,
          testimonials: testimonialsResult,
        },
        timestamp: new Date().toISOString(),
      }),
      { 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        } 
      },
    );
  } catch (error) {
    console.error('❌ Seed error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: String(error),
        message: 'Seed failed'
      }),
      { 
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        } 
      },
    );
  }
});
