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
  // First, clear ALL old blog posts
  const oldIds = await kvGet('blog_all_ids') || [];
  for (const oldId of oldIds) {
    const { error } = await supabase
      .from('kv_store_dcec270f')
      .delete()
      .eq('key', `blog_${oldId}`);
    if (error) console.log(`Note: Could not delete blog_${oldId}`);
  }
  
  const posts = [
    {
      id: "miami-luxury-market-2024",
      title: "Miami Luxury Real Estate Market Trends 2024",
      slug: "miami-luxury-market-2024",
      excerpt: "Discover the latest trends shaping Miami's ultra-luxury real estate landscape, from waterfront penthouses to exclusive gated communities.",
      content: "Miami's luxury real estate market continues to attract high-net-worth individuals from around the globe. With its pristine beaches, world-class amenities, and favorable tax environment, South Florida remains a premier destination for luxury property investments. The market has seen unprecedented growth in ultra-luxury condominiums and waterfront estates, with record-breaking sales continuing to reshape the landscape.",
      author: "Linart Realty Team",
      category: "Market Insights",
      tags: ["Miami", "Luxury Market", "Investment", "Trends"],
      featured_image: "/images/blog-miami-market.jpg",
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
      content: "Florida waterfront properties represent the pinnacle of luxury living. From private yacht access to panoramic ocean views, these estates offer unparalleled lifestyle benefits. Waterfront real estate continues to appreciate at rates that exceed inland properties, making it not just a lifestyle choice but a smart investment strategy.",
      author: "Linart Realty Team",
      category: "Investment Guide",
      tags: ["Waterfront", "Florida", "Luxury Estates", "Investment"],
      featured_image: "/images/blog-waterfront.jpg",
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
      content: "Palm Beach has long been synonymous with wealth, sophistication, and refined living. This barrier island paradise offers more than just stunning ocean views. With its world-class dining, exclusive shopping on Worth Avenue, and a community of global leaders, Palm Beach represents the epitome of American luxury.",
      author: "Linart Realty Team",
      category: "Lifestyle",
      tags: ["Palm Beach", "Luxury Living", "Exclusive Communities"],
      featured_image: "/images/blog-palm-beach.jpg",
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
      content: "Today's luxury estates are technological marvels, seamlessly blending sophistication with innovation. Smart home systems have become essential features, offering everything from climate control to advanced security systems, all controlled from a single interface.",
      author: "Linart Realty Team",
      category: "Technology",
      tags: ["Smart Homes", "Technology", "Modern Luxury", "Innovation"],
      featured_image: "/images/blog-smart-home.jpg",
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
      content: "While Miami and Palm Beach have traditionally dominated Florida's luxury market, Tampa Bay is rapidly emerging as a premier destination for discerning buyers seeking exclusivity and value.",
      author: "Linart Realty Team",
      category: "Market Insights",
      tags: ["Tampa", "Emerging Markets", "Investment Opportunity"],
      featured_image: "/images/blog-tampa.jpg",
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
      content: "Florida's luxury real estate market features some of the world's most stunning architectural achievements. From contemporary minimalist designs to classical Mediterranean villas, these properties represent the pinnacle of architectural excellence.",
      author: "Linart Realty Team",
      category: "Architecture",
      tags: ["Architecture", "Design", "Luxury Estates", "Florida"],
      featured_image: "/images/blog-architecture.jpg",
      published: true,
      publishedAt: "2024-04-01T10:00:00Z",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "luxury-estate-amenities",
      title: "Essential Amenities in Today's Luxury Estates",
      slug: "luxury-estate-amenities",
      excerpt: "Discover the must-have features that define ultra-luxury properties in the Florida market.",
      content: "Modern luxury estates go beyond traditional opulence. Today's discerning buyers expect resort-style amenities, from infinity pools and private spas to wine cellars and home theaters.",
      author: "Linart Realty Team",
      category: "Lifestyle",
      tags: ["Amenities", "Luxury Features", "Modern Living"],
      featured_image: "/images/blog-amenities.jpg",
      published: true,
      publishedAt: "2024-04-15T10:00:00Z",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "florida-tax-benefits",
      title: "Tax Advantages of Florida Luxury Real Estate",
      slug: "florida-tax-benefits",
      excerpt: "Understanding the significant tax benefits that make Florida an attractive destination for high-net-worth individuals.",
      content: "Florida offers substantial tax advantages for luxury property owners, including no state income tax, favorable estate planning opportunities, and homestead exemptions that make it one of the most tax-friendly states in the nation.",
      author: "Linart Realty Team",
      category: "Investment Guide",
      tags: ["Tax Benefits", "Florida", "Investment Strategy"],
      featured_image: "/images/blog-tax-benefits.jpg",
      published: true,
      publishedAt: "2024-05-01T10:00:00Z",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "luxury-condo-vs-estate",
      title: "Luxury Condos vs. Private Estates: Making the Right Choice",
      slug: "luxury-condo-vs-estate",
      excerpt: "A comprehensive comparison to help you decide between a high-rise luxury condo and a private estate.",
      content: "Choosing between a luxury condominium and a private estate depends on lifestyle preferences, maintenance considerations, and long-term investment goals. Each offers unique advantages for different buyer profiles.",
      author: "Linart Realty Team",
      category: "Buyer's Guide",
      tags: ["Condos", "Estates", "Buying Guide", "Comparison"],
      featured_image: "/images/blog-condo-vs-estate.jpg",
      published: true,
      publishedAt: "2024-05-15T10:00:00Z",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "naples-luxury-market",
      title: "Naples: Southwest Florida's Crown Jewel",
      slug: "naples-luxury-market",
      excerpt: "Exploring Naples' prestigious communities and why it attracts the world's elite.",
      content: "Naples has emerged as one of Florida's most desirable luxury markets, offering pristine beaches, world-class golf courses, and an unparalleled quality of life that attracts international buyers.",
      author: "Linart Realty Team",
      category: "Market Insights",
      tags: ["Naples", "Southwest Florida", "Luxury Communities"],
      featured_image: "/images/blog-naples.jpg",
      published: true,
      publishedAt: "2024-06-01T10:00:00Z",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "sustainable-luxury-homes",
      title: "Sustainable Luxury: The Future of High-End Real Estate",
      slug: "sustainable-luxury-homes",
      excerpt: "How eco-friendly features and sustainable design are reshaping the luxury real estate market.",
      content: "Sustainability and luxury are no longer mutually exclusive. Today's ultra-high-net-worth buyers increasingly demand properties that combine opulence with environmental responsibility, from solar energy systems to sustainable building materials.",
      author: "Linart Realty Team",
      category: "Trends",
      tags: ["Sustainability", "Green Homes", "Future Trends", "Innovation"],
      featured_image: "/images/blog-sustainable.jpg",
      published: true,
      publishedAt: "2024-06-15T10:00:00Z",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "international-buyers-guide",
      title: "A Guide for International Buyers: Investing in Florida Luxury Real Estate",
      slug: "international-buyers-guide",
      excerpt: "Everything international buyers need to know about purchasing luxury property in Florida.",
      content: "Florida's luxury market attracts buyers from around the world. Understanding the unique aspects of purchasing as an international buyer, from financing to legal considerations, ensures a smooth transaction process.",
      author: "Linart Realty Team",
      category: "Buyer's Guide",
      tags: ["International Buyers", "Investment", "Florida", "Guide"],
      featured_image: "/images/blog-international.jpg",
      published: true,
      publishedAt: "2024-07-01T10:00:00Z",
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
  // First, clear ALL old properties
  const oldIds = await kvGet('properties_all_ids') || [];
  for (const oldId of oldIds) {
    const { error } = await supabase
      .from('kv_store_dcec270f')
      .delete()
      .eq('key', `property_${oldId}`);
    if (error) console.log(`Note: Could not delete property_${oldId}`);
  }
  
  const properties = [
    {
      id: "waterfront-penthouse-estate",
      title: "Waterfront Penthouse Estate",
      location: "Miami Beach, FL",
      price: 12500000,
      bedrooms: 5,
      bathrooms: 6,
      sqft: 8500,
      type: "Penthouse",
      status: "Available",
      featured: true,
      description: "Spectacular waterfront penthouse featuring floor-to-ceiling windows, private terrace with infinity pool, and breathtaking panoramic views. This architectural masterpiece combines sophisticated design with unparalleled luxury amenities.",
      features: ["Infinity Pool", "Private Beach Access", "Smart Home System", "Wine Cellar", "Home Theater", "Private Elevator"],
      images: [
        "/images/property-1.jpg",
        "/images/property-2.jpg",
        "/images/property-3.jpg"
      ],
      yearBuilt: 2023,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "oceanfront-mediterranean-estate",
      title: "Oceanfront Mediterranean Estate",
      location: "Palm Beach, FL",
      price: 18900000,
      bedrooms: 6,
      bathrooms: 8,
      sqft: 12000,
      type: "Estate",
      status: "Available",
      featured: true,
      description: "Magnificent Mediterranean-style estate with direct ocean views. This exquisite property features hand-crafted details, imported Italian marble, and expansive outdoor entertaining spaces overlooking the Atlantic Ocean.",
      features: ["Private Beach", "Tennis Court", "Infinity Pool", "Guest Cottage", "Ocean Views", "Wine Cellar"],
      images: [
        "/images/property-1.jpg",
        "/images/property-4.jpg",
        "/images/property-3.jpg"
      ],
      yearBuilt: 2022,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "modern-architectural-masterpiece",
      title: "Modern Architectural Masterpiece",
      location: "Naples, FL",
      price: 8750000,
      bedrooms: 4,
      bathrooms: 5,
      sqft: 6200,
      type: "Villa",
      status: "Available",
      featured: true,
      description: "Contemporary architectural masterpiece designed by award-winning architects. Features open-concept living spaces, premium finishes throughout, and seamless indoor-outdoor integration with stunning Gulf views.",
      features: ["Gulf Views", "Outdoor Kitchen", "Spa & Sauna", "Guest House", "Solar Panels", "Smart Home"],
      images: [
        "/images/property-4.jpg",
        "/images/property-5.jpg"
      ],
      yearBuilt: 2023,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "boca-raton-golf-estate",
      title: "Boca Raton Golf Estate",
      location: "Boca Raton, FL",
      price: 6950000,
      bedrooms: 5,
      bathrooms: 6,
      sqft: 7800,
      type: "Estate",
      status: "Available",
      featured: true,
      description: "Rare opportunity to own this pristine estate on championship golf course. This meticulously renovated residence blends classic elegance with modern luxury, featuring stunning fairway and water views.",
      features: ["Golf Course Views", "Pool & Spa", "Private Office", "Chef's Kitchen", "Wine Room", "Smart Home"],
      images: [
        "/images/property-6.jpg",
        "/images/property-2.jpg"
      ],
      yearBuilt: 2022,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "key-west-island-paradise",
      title: "Key West Island Paradise",
      location: "Key West, FL",
      price: 9800000,
      bedrooms: 4,
      bathrooms: 5,
      sqft: 5800,
      type: "Waterfront",
      status: "Available",
      featured: true,
      description: "Exclusive island retreat in the heart of Key West. This stunning contemporary residence features panoramic ocean views, private dock, and the ultimate Florida Keys lifestyle with world-class amenities.",
      features: ["Ocean Views", "Private Dock", "Infinity Pool", "Rooftop Deck", "Beach Access", "Smart Home"],
      images: [
        "/images/property-2.jpg",
        "/images/property-6.jpg"
      ],
      yearBuilt: 2023,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "gated-equestrian-estate",
      title: "Gated Equestrian Estate",
      location: "Wellington, FL",
      price: 14200000,
      bedrooms: 7,
      bathrooms: 9,
      sqft: 15000,
      type: "Estate",
      status: "Available",
      featured: true,
      description: "Sprawling estate on 25 acres featuring a magnificent main residence, professional equestrian center, and multiple guest houses. Perfect for the discerning equestrian enthusiast seeking privacy and luxury.",
      features: ["Equestrian Center", "Guest Houses", "Heated Pool", "Tennis Court", "25 Acres", "Security Gate"],
      images: [
        "/images/property-4.jpg",
        "/images/property-1.jpg",
        "/images/property-5.jpg"
      ],
      yearBuilt: 2021,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "sarasota-bay-waterfront-villa",
      title: "Sarasota Bay Waterfront Villa",
      location: "Sarasota, FL",
      price: 7200000,
      bedrooms: 5,
      bathrooms: 6,
      sqft: 7800,
      type: "Villa",
      status: "Available",
      featured: false,
      description: "Sleek contemporary villa on Sarasota Bay with breathtaking water views. Floor-to-ceiling glass walls, minimalist design, and cutting-edge smart home technology create an unparalleled coastal living experience.",
      features: ["Bay Views", "Private Dock", "Infinity Pool", "Home Theater", "Gym & Spa", "Smart Home"],
      images: [
        "/images/property-5.jpg",
        "/images/property-2.jpg"
      ],
      yearBuilt: 2023,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "fort-lauderdale-intracoastal-estate",
      title: "Fort Lauderdale Intracoastal Estate",
      location: "Fort Lauderdale, FL",
      price: 11500000,
      bedrooms: 6,
      bathrooms: 7,
      sqft: 9200,
      type: "Estate",
      status: "Available",
      featured: false,
      description: "Stunning estate on the Intracoastal Waterway with 150 feet of water frontage. Features a private yacht dock, resort-style pool, and sophisticated interiors with imported finishes throughout.",
      features: ["Yacht Dock", "Intracoastal Views", "Resort Pool", "Summer Kitchen", "Wine Cellar", "Smart Home"],
      images: [
        "/images/property-3.jpg",
        "/images/property-1.jpg"
      ],
      yearBuilt: 2022,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "jupiter-island-oceanfront",
      title: "Jupiter Island Oceanfront",
      location: "Jupiter Island, FL",
      price: 16800000,
      bedrooms: 5,
      bathrooms: 7,
      sqft: 10500,
      type: "Waterfront",
      status: "Pending",
      featured: false,
      description: "Exclusive oceanfront residence on prestigious Jupiter Island. This architectural gem offers unobstructed Atlantic views, private beach access, and the ultimate in sophisticated coastal living.",
      features: ["Ocean Views", "Private Beach", "Infinity Pool", "Guest House", "Elevator", "Hurricane Impact Glass"],
      images: [
        "/images/property-6.jpg",
        "/images/property-3.jpg"
      ],
      yearBuilt: 2021,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "coconut-grove-tropical-oasis",
      title: "Coconut Grove Tropical Oasis",
      location: "Coconut Grove, FL",
      price: 10200000,
      bedrooms: 5,
      bathrooms: 6,
      sqft: 8400,
      type: "Residential",
      status: "Available",
      featured: false,
      description: "Enchanting tropical estate in prestigious Coconut Grove. Lush landscaping, Mediterranean architecture, and bay views create a private paradise minutes from downtown Miami.",
      features: ["Bay Views", "Tropical Gardens", "Pool & Spa", "Guest Suite", "Gourmet Kitchen", "Wine Storage"],
      images: [
        "/images/property-2.jpg",
        "/images/property-4.jpg"
      ],
      yearBuilt: 2020,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "coral-gables-mediterranean-villa",
      title: "Coral Gables Mediterranean Villa",
      location: "Coral Gables, FL",
      price: 8900000,
      bedrooms: 6,
      bathrooms: 7,
      sqft: 9500,
      type: "Villa",
      status: "Available",
      featured: false,
      description: "Stunning Mediterranean villa in exclusive Coral Gables. Classic architecture meets modern luxury with hand-painted tiles, marble flooring, and resort-style amenities throughout.",
      features: ["Pool & Cabana", "Outdoor Kitchen", "Wine Cellar", "Library", "Master Suite Balcony", "3-Car Garage"],
      images: [
        "/images/property-5.jpg",
        "/images/property-6.jpg"
      ],
      yearBuilt: 2019,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "tampa-waterfront-contemporary",
      title: "Tampa Waterfront Contemporary",
      location: "Tampa, FL",
      price: 5800000,
      bedrooms: 4,
      bathrooms: 5,
      sqft: 6800,
      type: "Residential",
      status: "Available",
      featured: false,
      description: "Sleek contemporary home on Tampa Bay with stunning water views. Open floor plan, floor-to-ceiling windows, and premium finishes create the perfect waterfront retreat.",
      features: ["Waterfront", "Private Dock", "Modern Kitchen", "Home Office", "Pool", "Smart Home"],
      images: [
        "/images/property-3.jpg",
        "/images/property-5.jpg"
      ],
      yearBuilt: 2024,
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
  // First, clear old testimonials
  const oldIds = await kvGet('testimonials_all_ids') || [];
  for (const oldId of oldIds) {
    const { error } = await supabase
      .from('kv_store_dcec270f')
      .delete()
      .eq('key', `testimonial_${oldId}`);
    if (error) console.log(`Note: Could not delete testimonial_${oldId}`);
  }
  
  const testimonials = [
    {
      id: "testimonial-1",
      name: "Victoria Hamilton",
      title: "CEO, Hamilton Enterprises",
      content: "Linart Realty exceeded all expectations in finding our Miami Beach estate. Their attention to detail, market knowledge, and dedication to excellence is unmatched.",
      rating: 5,
      location: "Miami Beach, FL",
      image: "/images/testimonials/client-1.jpg",
      published: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "testimonial-2",
      name: "Alexander Morrison",
      title: "International Investor",
      content: "The team at Linart Realty demonstrated exceptional professionalism throughout our property acquisition. Their expertise in luxury real estate is truly world-class.",
      rating: 5,
      location: "Palm Beach, FL",
      image: "/images/testimonials/client-2.jpg",
      published: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "testimonial-3",
      name: "Isabella Rothschild",
      title: "Art Collector & Philanthropist",
      content: "Working with Linart Realty was an absolute pleasure. They understood our vision perfectly and delivered a property that surpassed our dreams.",
      rating: 5,
      location: "Coral Gables, FL",
      image: "/images/testimonials/client-3.jpg",
      published: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "testimonial-4",
      name: "Robert Chen",
      title: "Tech Entrepreneur",
      content: "Linart Realty's knowledge of the Florida luxury market is unparalleled. They made our property search seamless and enjoyable.",
      rating: 5,
      location: "Fort Lauderdale, FL",
      image: "/images/testimonials/client-4.jpg",
      published: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "testimonial-5",
      name: "Sophia Laurent",
      title: "Fashion Executive",
      content: "The attention to detail and personalized service we received was extraordinary. Linart Realty truly understands luxury.",
      rating: 5,
      location: "Naples, FL",
      image: "/images/testimonials/client-5.jpg",
      published: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "testimonial-6",
      name: "Marcus Wellington",
      title: "Private Equity Partner",
      content: "Exceptional service from start to finish. Linart Realty made our transition to Florida seamless and stress-free.",
      rating: 5,
      location: "Tampa, FL",
      image: "/images/testimonials/client-6.jpg",
      published: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "testimonial-7",
      name: "Catherine Beaumont",
      title: "Luxury Brand Director",
      content: "From our first meeting to closing day, Linart Realty provided impeccable white-glove service. Their deep understanding of the luxury market is extraordinary.",
      rating: 5,
      location: "Boca Raton, FL",
      image: "/images/testimonials/client-7.jpg",
      published: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "testimonial-8",
      name: "David Richardson",
      title: "Hedge Fund Manager",
      content: "Linart Realty's market expertise and negotiation skills resulted in finding us the perfect waterfront estate. A truly exceptional experience from start to finish.",
      rating: 5,
      location: "Key Biscayne, FL",
      image: "/images/testimonials/client-8.jpg",
      published: true,
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
  // First, clear ALL old recognitions
  const oldIds = await kvGet('recognitions_all_ids') || [];
  for (const oldId of oldIds) {
    const { error } = await supabase
      .from('kv_store_dcec270f')
      .delete()
      .eq('key', `recognition_${oldId}`);
    if (error) console.log(`Note: Could not delete recognition_${oldId}`);
  }
  
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
    },
    {
      id: "recognition-4",
      title: "Best Luxury Brokerage - Florida",
      organization: "Luxury Real Estate Magazine",
      year: 2024,
      description: "Top-rated luxury real estate firm in Florida",
      icon: "Award",
      featured: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "recognition-5",
      title: "Forbes Top 100 Luxury Brokerages",
      organization: "Forbes",
      year: 2024,
      description: "Recognized as one of the nation's premier luxury real estate firms",
      icon: "Award",
      featured: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "recognition-6",
      title: "Wall Street Journal Top Agent",
      organization: "WSJ Real Trends",
      year: 2024,
      description: "Ranked among the top 1% of agents nationwide",
      icon: "Trophy",
      featured: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "recognition-7",
      title: "Luxury Real Estate Excellence Award",
      organization: "International Luxury Alliance",
      year: 2023,
      description: "Awarded for outstanding achievement in luxury property transactions",
      icon: "Star",
      featured: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "recognition-8",
      title: "Best Luxury Brokerage - Florida",
      organization: "Luxury Real Estate Magazine",
      year: 2024,
      description: "Top-rated luxury real estate firm in Florida",
      icon: "Award",
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
  // First, clear ALL old partnerships
  const oldIds = await kvGet('partnerships_all_ids') || [];
  for (const oldId of oldIds) {
    const { error } = await supabase
      .from('kv_store_dcec270f')
      .delete()
      .eq('key', `partnership_${oldId}`);
    if (error) console.log(`Note: Could not delete partnership_${oldId}`);
  }
  
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
        counts: {
          blog: 12,
          properties: 12,
          testimonials: 8,
          recognitions: 8,
          partnerships: 3
        },
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