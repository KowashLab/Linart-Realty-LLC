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

// Seed functions
async function seedBlogPosts() {
  const posts = [
    {
      id: "miami-luxury-market-2024",
      title: "Miami Luxury Real Estate Market Trends 2024",
      slug: "miami-luxury-market-2024",
      excerpt: "Discover the latest trends shaping Miami's ultra-luxury real estate landscape, from waterfront penthouses to exclusive gated communities.",
      content: "Miami's luxury real estate market continues to attract high-net-worth individuals from around the globe. With its pristine beaches, world-class amenities, and favorable tax environment, South Florida remains a premier destination for luxury property investments...",
      author: "Linart Realty Team",
      category: "Market Insights",
      tags: ["Miami", "Luxury Market", "Investment", "Trends"],
      featured_image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200",
      published: true,
      publishedAt: "2024-01-15T10:00:00Z",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "florida-waterfront-investment",
      title: "The Ultimate Guide to Florida Waterfront Properties",
      slug: "florida-waterfront-investment",
      excerpt: "Explore the benefits of investing in Florida's most prestigious waterfront estates and what makes them exceptional.",
      content: "Florida waterfront properties represent the pinnacle of luxury living. From private yacht access to panoramic ocean views, these estates offer unparalleled lifestyle benefits...",
      author: "Linart Realty Team",
      category: "Investment Guide",
      tags: ["Waterfront", "Florida", "Luxury Estates", "Investment"],
      featured_image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200",
      published: true,
      publishedAt: "2024-02-01T10:00:00Z",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "palm-beach-luxury-living",
      title: "Palm Beach: Where Luxury Meets Elegance",
      slug: "palm-beach-luxury-living",
      excerpt: "Discover why Palm Beach remains one of America's most exclusive addresses for ultra-high-net-worth families.",
      content: "Palm Beach has long been synonymous with wealth, sophistication, and refined living. This barrier island paradise offers more than just stunning ocean views...",
      author: "Linart Realty Team",
      category: "Lifestyle",
      tags: ["Palm Beach", "Luxury Living", "Exclusive Communities"],
      featured_image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200",
      published: true,
      publishedAt: "2024-02-15T10:00:00Z",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "smart-home-luxury-estates",
      title: "Smart Home Technology in Modern Luxury Estates",
      slug: "smart-home-luxury-estates",
      excerpt: "How cutting-edge technology is transforming luxury real estate in Florida, from automated systems to AI-powered security.",
      content: "Today's luxury estates are technological marvels, seamlessly blending sophistication with innovation. Smart home systems have become essential features...",
      author: "Linart Realty Team",
      category: "Technology",
      tags: ["Smart Homes", "Technology", "Modern Luxury", "Innovation"],
      featured_image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200",
      published: true,
      publishedAt: "2024-03-01T10:00:00Z",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "tampa-bay-emerging-market",
      title: "Tampa Bay: Florida's Emerging Luxury Market",
      slug: "tampa-bay-emerging-market",
      excerpt: "Why Tampa Bay is becoming the next hotspot for luxury real estate investment in Florida.",
      content: "While Miami and Palm Beach have traditionally dominated Florida's luxury market, Tampa Bay is rapidly emerging as a premier destination...",
      author: "Linart Realty Team",
      category: "Market Insights",
      tags: ["Tampa", "Emerging Markets", "Investment Opportunity"],
      featured_image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200",
      published: true,
      publishedAt: "2024-03-15T10:00:00Z",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "architectural-masterpieces-florida",
      title: "Architectural Masterpieces: Florida's Most Stunning Estates",
      slug: "architectural-masterpieces-florida",
      excerpt: "A showcase of Florida's most breathtaking architectural designs, where art meets luxury living.",
      content: "Florida's luxury real estate market features some of the world's most stunning architectural achievements. From contemporary minimalist designs to classical Mediterranean villas...",
      author: "Linart Realty Team",
      category: "Architecture",
      tags: ["Architecture", "Design", "Luxury Estates", "Florida"],
      featured_image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
      published: true,
      publishedAt: "2024-04-01T10:00:00Z",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  for (const post of posts) {
    await kvSet(`blog_${post.id}`, post);
  }
  
  await kvSet('blog_all_ids', posts.map(p => p.id));
  console.log(`✅ Seeded ${posts.length} blog posts`);
}

async function seedProperties() {
  const properties = [
    {
      id: "oceanfront-miami-beach-penthouse",
      title: "Oceanfront Miami Beach Penthouse",
      location: "Miami Beach, FL",
      price: 24500000,
      bedrooms: 5,
      bathrooms: 6,
      sqft: 8500,
      type: "Penthouse",
      status: "Available",
      featured: true,
      description: "Spectacular oceanfront penthouse with panoramic views of the Atlantic Ocean. Features include a private rooftop terrace, infinity pool, chef's kitchen with Gaggenau appliances, and floor-to-ceiling windows throughout.",
      features: ["Ocean Views", "Private Pool", "Smart Home", "Wine Cellar", "Home Theater", "Private Elevator"],
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200"
      ],
      yearBuilt: 2023,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "palm-beach-waterfront-estate",
      title: "Palm Beach Waterfront Estate",
      location: "Palm Beach, FL",
      price: 45000000,
      bedrooms: 8,
      bathrooms: 10,
      sqft: 15000,
      type: "Estate",
      status: "Available",
      featured: true,
      description: "Magnificent waterfront estate on prestigious Palm Beach Island. This architectural masterpiece offers 200 feet of water frontage, private dock accommodating mega yachts, resort-style amenities, and impeccable design throughout.",
      features: ["Waterfront", "Private Dock", "Guest House", "Tennis Court", "Home Gym", "Spa", "Security System"],
      images: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200"
      ],
      yearBuilt: 2022,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "miami-contemporary-villa",
      title: "Contemporary Miami Architectural Villa",
      location: "Coral Gables, FL",
      price: 18750000,
      bedrooms: 6,
      bathrooms: 7,
      sqft: 9200,
      type: "Villa",
      status: "Available",
      featured: true,
      description: "Award-winning contemporary villa in exclusive Coral Gables. Features cutting-edge architecture, smart home automation, infinity-edge pool, and lush tropical landscaping on over 1 acre.",
      features: ["Smart Home", "Pool", "Wine Room", "Office", "Gated Community", "Generator"],
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200"
      ],
      yearBuilt: 2023,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "fort-lauderdale-modern-mansion",
      title: "Fort Lauderdale Modern Waterfront Mansion",
      location: "Fort Lauderdale, FL",
      price: 32000000,
      bedrooms: 7,
      bathrooms: 9,
      sqft: 12500,
      type: "Mansion",
      status: "Available",
      featured: true,
      description: "Stunning modern mansion on Las Olas Isles with 150 feet of water frontage. Features include a home theater, gym, spa, wine cellar, and private yacht dock.",
      features: ["Waterfront", "Private Dock", "Home Theater", "Wine Cellar", "Gym", "Spa", "Smart Home"],
      images: [
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200",
        "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200"
      ],
      yearBuilt: 2022,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "naples-golf-estate",
      title: "Naples Luxury Golf Estate",
      location: "Naples, FL",
      price: 15500000,
      bedrooms: 6,
      bathrooms: 8,
      sqft: 10800,
      type: "Estate",
      status: "Available",
      featured: false,
      description: "Exquisite golf course estate in prestigious Port Royal. Features private golf simulator, resort-style pool, outdoor kitchen, and panoramic golf course views.",
      features: ["Golf Views", "Pool", "Outdoor Kitchen", "Golf Simulator", "Guest Suite", "Security"],
      images: [
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200",
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200"
      ],
      yearBuilt: 2021,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "tampa-bay-penthouse",
      title: "Tampa Bay Luxury Penthouse",
      location: "Tampa, FL",
      price: 8900000,
      bedrooms: 4,
      bathrooms: 5,
      sqft: 6500,
      type: "Penthouse",
      status: "Available",
      featured: false,
      description: "Sophisticated penthouse in Tampa's most exclusive tower. Floor-to-ceiling windows, private terrace, smart home technology, and world-class building amenities.",
      features: ["Bay Views", "Smart Home", "Concierge", "Pool", "Gym", "Valet Parking"],
      images: [
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200",
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200"
      ],
      yearBuilt: 2023,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  for (const property of properties) {
    await kvSet(`property_${property.id}`, property);
  }
  
  await kvSet('properties_all_ids', properties.map(p => p.id));
  console.log(`✅ Seeded ${properties.length} properties`);
}

async function seedTestimonials() {
  const testimonials = [
    {
      id: "testimonial-1",
      name: "Victoria Hamilton",
      title: "CEO, Hamilton Enterprises",
      content: "Linart Realty exceeded all expectations in finding our Miami Beach estate. Their attention to detail, market knowledge, and dedication to excellence is unmatched.",
      rating: 5,
      property: "Oceanfront Miami Beach Penthouse",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
      featured: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "testimonial-2",
      name: "Alexander Morrison",
      title: "International Investor",
      content: "The team at Linart Realty demonstrated exceptional professionalism throughout our property acquisition. Their expertise in luxury real estate is truly world-class.",
      rating: 5,
      property: "Palm Beach Waterfront Estate",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      featured: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "testimonial-3",
      name: "Isabella Rothschild",
      title: "Art Collector & Philanthropist",
      content: "Working with Linart Realty was an absolute pleasure. They understood our vision perfectly and delivered a property that surpassed our dreams.",
      rating: 5,
      property: "Contemporary Miami Villa",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      featured: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "testimonial-4",
      name: "Robert Chen",
      title: "Tech Entrepreneur",
      content: "Linart Realty's knowledge of the Florida luxury market is unparalleled. They made our property search seamless and enjoyable.",
      rating: 5,
      property: "Fort Lauderdale Modern Mansion",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      featured: false,
      createdAt: new Date().toISOString()
    },
    {
      id: "testimonial-5",
      name: "Sophia Laurent",
      title: "Fashion Executive",
      content: "The attention to detail and personalized service we received was extraordinary. Linart Realty truly understands luxury.",
      rating: 5,
      property: "Naples Golf Estate",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      featured: false,
      createdAt: new Date().toISOString()
    },
    {
      id: "testimonial-6",
      name: "Marcus Wellington",
      title: "Private Equity Partner",
      content: "Exceptional service from start to finish. Linart Realty made our transition to Florida seamless and stress-free.",
      rating: 5,
      property: "Tampa Bay Penthouse",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      featured: false,
      createdAt: new Date().toISOString()
    }
  ];

  for (const testimonial of testimonials) {
    await kvSet(`testimonial_${testimonial.id}`, testimonial);
  }
  
  await kvSet('testimonials_all_ids', testimonials.map(t => t.id));
  console.log(`✅ Seeded ${testimonials.length} testimonials`);
}

async function seedRecognitions() {
  const recognitions = [
    {
      id: "recognition-1",
      title: "Forbes Top 100 Luxury Brokerages",
      organization: "Forbes",
      year: 2024,
      description: "Recognized as one of the nation's premier luxury real estate firms",
      icon: "Award",
      featured: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "recognition-2",
      title: "Wall Street Journal Top Agent",
      organization: "WSJ Real Trends",
      year: 2024,
      description: "Ranked among the top 1% of agents nationwide",
      icon: "Trophy",
      featured: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "recognition-3",
      title: "Luxury Real Estate Excellence Award",
      organization: "International Luxury Alliance",
      year: 2023,
      description: "Awarded for outstanding achievement in luxury property transactions",
      icon: "Star",
      featured: true,
      createdAt: new Date().toISOString()
    }
  ];

  for (const recognition of recognitions) {
    await kvSet(`recognition_${recognition.id}`, recognition);
  }
  
  await kvSet('recognitions_all_ids', recognitions.map(r => r.id));
  console.log(`✅ Seeded ${recognitions.length} recognitions`);
}

async function seedPartnerships() {
  const partnerships = [
    {
      id: "partnership-1",
      name: "Sotheby's International Realty",
      description: "Global luxury real estate network",
      logo: "Building2",
      featured: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "partnership-2",
      name: "Christie's Real Estate",
      description: "International luxury property auctions",
      logo: "Home",
      featured: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "partnership-3",
      name: "Luxury Portfolio International",
      description: "Premier luxury property marketing",
      logo: "Crown",
      featured: true,
      createdAt: new Date().toISOString()
    }
  ];

  for (const partnership of partnerships) {
    await kvSet(`partnership_${partnership.id}`, partnership);
  }
  
  await kvSet('partnerships_all_ids', partnerships.map(p => p.id));
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
