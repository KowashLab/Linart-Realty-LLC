import * as kv from './kv_store.ts';

/*
═══════════════════════════════════════════════════════════════════
  BLOG API - Posts Management
═══════════════════════════════════════════════════════════════════

  Endpoints:
  - GET    /api/blog/posts        - Get all published posts
  - GET    /api/blog/posts/:slug  - Get post by slug
  - GET    /api/blog/admin/posts  - Get all posts (including drafts)
  - POST   /api/blog/admin/posts  - Create new post
  - PUT    /api/blog/admin/posts/:id - Update post
  - DELETE /api/blog/admin/posts/:id - Delete post

═══════════════════════════════════════════════════════════════════
*/

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  videoUrl?: string; // Optional for video posts
  category: string;
  type: 'article' | 'video';
  published: boolean;
  createdAt: string;
  updatedAt: string;
  author?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

// Generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Get all published posts (for public page)
export async function getAllPublishedPosts(): Promise<BlogPost[]> {
  const posts = await kv.getByPrefix<BlogPost>('blog:post:');
  return posts
    .filter(post => post.published)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

// Get all posts (for admin panel)
export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await kv.getByPrefix<BlogPost>('blog:post:');
  return posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

// Get post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await kv.getByPrefix<BlogPost>('blog:post:');
  return posts.find(post => post.slug === slug && post.published) || null;
}

// Get post by ID (for editing)
export async function getPostById(id: string): Promise<BlogPost | null> {
  return await kv.get<BlogPost>(`blog:post:${id}`);
}

// Create new post
export async function createPost(postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'slug'>): Promise<BlogPost> {
  const id = crypto.randomUUID();
  const slug = generateSlug(postData.title);
  const now = new Date().toISOString();
  
  const post: BlogPost = {
    id,
    slug,
    createdAt: now,
    updatedAt: now,
    ...postData
  };
  
  await kv.set(`blog:post:${id}`, post);
  return post;
}

// Update post
export async function updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  const existingPost = await getPostById(id);
  if (!existingPost) return null;
  
  const updatedPost: BlogPost = {
    ...existingPost,
    ...updates,
    id: existingPost.id, // Don't change ID
    createdAt: existingPost.createdAt, // Don't change creation date
    slug: updates.title ? generateSlug(updates.title) : existingPost.slug,
    updatedAt: new Date().toISOString()
  };
  
  await kv.set(`blog:post:${id}`, updatedPost);
  return updatedPost;
}

// Delete post
export async function deletePost(id: string): Promise<boolean> {
  const post = await getPostById(id);
  if (!post) return false;
  
  await kv.del(`blog:post:${id}`);
  return true;
}

// Seed initial data (if database is empty)
export async function seedInitialPosts(): Promise<boolean> {
  // Check if seeding has already been completed (using KV flag)
  const seedFlag = await kv.get('seed:completed:blog');
  if (seedFlag) {
    console.log('Blog posts already seeded (flag exists), skipping...');
    return true; // Already seeded
  }
  
  console.log('Starting blog posts seeding...');
  
  const initialPosts = [
    {
      title: 'The Art of Luxury Real Estate Investment',
      excerpt: 'Discover the secrets to investing in premium properties that appreciate in value and provide unparalleled returns.',
      content: `
        <p>Luxury real estate investment represents one of the most stable and prestigious forms of wealth preservation and growth. In this comprehensive guide, we explore the fundamental principles that distinguish successful luxury property investors.</p>
        
        <h2>Understanding Market Dynamics</h2>
        <p>The luxury real estate market operates on different principles than conventional property markets. Location, exclusivity, and unique architectural features play crucial roles in determining value appreciation.</p>
        
        <h2>Key Investment Strategies</h2>
        <ul>
          <li>Focus on prime locations with limited supply</li>
          <li>Seek properties with unique architectural significance</li>
          <li>Consider long-term appreciation over short-term gains</li>
          <li>Evaluate rental yield potential for income generation</li>
        </ul>
        
        <h2>Due Diligence Essentials</h2>
        <p>Thorough market research, property inspections, and financial analysis are non-negotiable elements of luxury real estate investment. Working with experienced advisors ensures informed decision-making.</p>
      `,
      image: '/images/blog/investment.jpg',
      category: 'Investment',
      type: 'article' as const,
      published: true,
      author: 'Linart Realty Team',
      seoTitle: 'Luxury Real Estate Investment Guide 2025',
      seoDescription: 'Expert insights on luxury property investment strategies, market analysis, and wealth preservation through premium real estate.',
      seoKeywords: 'luxury real estate investment, premium property, wealth preservation'
    },
    {
      title: 'Architectural Masterpieces: Modern Design Trends',
      excerpt: 'Explore the latest architectural innovations shaping the luxury real estate landscape in 2025.',
      content: `
        <p>Contemporary luxury architecture seamlessly blends aesthetic innovation with functional excellence. Today's architectural masterpieces represent the pinnacle of design thinking and engineering prowess.</p>
        
        <h2>Sustainable Luxury</h2>
        <p>Modern luxury homes integrate cutting-edge sustainable technologies without compromising on elegance. Solar panels, geothermal heating, and smart home systems are now standard features in premium properties.</p>
        
        <h2>Open-Concept Living</h2>
        <p>Expansive, flowing spaces that connect indoor and outdoor environments define contemporary luxury. Floor-to-ceiling windows, retractable walls, and seamless transitions create living spaces that breathe.</p>
        
        <h2>Material Innovation</h2>
        <p>The use of innovative materials—from engineered timber to ultra-high-performance concrete—enables architects to push the boundaries of what's possible in residential design.</p>
      `,
      image: '/images/blog/architecture.jpg',
      category: 'Architecture',
      type: 'article' as const,
      published: true,
      author: 'Linart Realty Team',
      seoTitle: 'Modern Luxury Architecture Trends 2025',
      seoDescription: 'Discover the latest architectural innovations and design trends shaping luxury real estate properties.',
      seoKeywords: 'modern architecture, luxury design trends, contemporary homes'
    },
    {
      title: 'Drone Tour: $15M Waterfront Estate',
      excerpt: 'Experience a breathtaking aerial view of one of our most exclusive waterfront properties.',
      content: `
        <p>Take a stunning aerial journey through this extraordinary $15 million waterfront estate. This video tour captures the property's magnificent architecture, pristine landscaping, and unparalleled waterfront location.</p>
        
        <h2>Property Highlights</h2>
        <ul>
          <li>12,000 sq ft of luxury living space</li>
          <li>Private deep-water dock</li>
          <li>Infinity pool overlooking the bay</li>
          <li>Custom wine cellar and tasting room</li>
          <li>Private beach access</li>
        </ul>
        
        <p>This architectural masterpiece represents the epitome of waterfront luxury living, combining world-class design with an unbeatable location.</p>
      `,
      image: '/images/blog/drone-tour.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
      category: 'Property Tours',
      type: 'video' as const,
      published: true,
      author: 'Linart Realty Team',
      seoTitle: 'Luxury Waterfront Estate Virtual Tour',
      seoDescription: 'Exclusive drone footage of a $15M waterfront estate featuring world-class amenities and stunning architecture.',
      seoKeywords: 'waterfront estate, luxury property tour, drone footage'
    },
    {
      title: 'Market Insights: 2025 Luxury Real Estate Trends',
      excerpt: 'Comprehensive analysis of emerging trends and market dynamics shaping the luxury real estate sector.',
      content: `
        <p>The luxury real estate market continues to evolve in 2025, driven by shifting demographics, technological innovation, and changing lifestyle preferences. Our comprehensive market analysis reveals key trends that savvy investors should monitor.</p>
        
        <h2>Remote Work Revolution</h2>
        <p>The permanent shift to hybrid work models has transformed buyer preferences. Properties with dedicated home offices, high-speed connectivity infrastructure, and peaceful suburban or rural locations are commanding premium prices.</p>
        
        <h2>Sustainability Premium</h2>
        <p>Eco-conscious luxury buyers are willing to pay 15-20% premiums for properties with LEED certification, net-zero energy systems, and sustainable materials. Green luxury is no longer a niche—it's the standard.</p>
        
        <h2>Investment Outlook</h2>
        <p>Prime markets in Miami, Austin, and Scottsdale continue to show strong appreciation potential, while traditional markets like New York and Los Angeles stabilize after rapid post-pandemic growth.</p>
      `,
      image: '/images/blog/market-trends.jpg',
      category: 'Market Trends',
      type: 'article' as const,
      published: true,
      author: 'Linart Realty Team',
      seoTitle: 'Luxury Real Estate Market Trends 2025',
      seoDescription: 'In-depth market analysis and forecasts for luxury real estate investors. Expert insights on emerging trends and investment opportunities.',
      seoKeywords: 'real estate market trends, luxury property market, investment forecast'
    },
    {
      title: 'Video Tour: Contemporary Penthouse with City Views',
      excerpt: 'Take an exclusive walkthrough of this stunning 8,000 sq ft penthouse featuring panoramic city views.',
      content: `
        <p>Experience luxury living at its finest in this breathtaking contemporary penthouse. This exclusive video tour showcases the property's soaring ceilings, floor-to-ceiling windows, and world-class finishes.</p>
        
        <h2>Penthouse Features</h2>
        <ul>
          <li>8,000 sq ft of living space across two levels</li>
          <li>360-degree panoramic city views</li>
          <li>Private rooftop terrace with infinity pool</li>
          <li>Smart home automation throughout</li>
          <li>Private elevator access</li>
          <li>Chef's kitchen with Miele appliances</li>
        </ul>
        
        <p>Located in the heart of the city's most prestigious address, this penthouse represents the ultimate in urban luxury living.</p>
      `,
      image: '/images/blog/penthouse-tour.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
      category: 'Property Tours',
      type: 'video' as const,
      published: true,
      author: 'Linart Realty Team',
      seoTitle: 'Luxury Penthouse Virtual Tour - City Views',
      seoDescription: 'Exclusive video tour of an 8,000 sq ft contemporary penthouse with panoramic city views and world-class amenities.',
      seoKeywords: 'luxury penthouse, city views, virtual property tour'
    },
    {
      title: 'Interior Design Excellence: Creating Timeless Luxury',
      excerpt: 'Learn how premium interior design transforms spaces into timeless works of art that enhance property value.',
      content: `
        <p>Exceptional interior design is the hallmark of truly distinguished luxury properties. Understanding the principles of timeless design can dramatically enhance both livability and long-term property value.</p>
        
        <h2>The Foundation of Luxury Design</h2>
        <p>Premium materials, expert craftsmanship, and attention to detail form the foundation of luxury interior design. Natural stone, exotic hardwoods, and custom millwork create spaces that age gracefully and maintain their appeal.</p>
        
        <h2>Color and Light Mastery</h2>
        <p>Sophisticated color palettes and layered lighting design create depth and ambiance. Natural light is maximized while artificial lighting provides flexibility for different moods and occasions.</p>
        
        <h2>Investment in Quality</h2>
        <p>High-quality interior design can increase property values by 10-15%. Buyers are willing to pay premiums for move-in-ready luxury homes with designer finishes and thoughtful spatial planning.</p>
      `,
      image: '/images/blog/interior-design.jpg',
      category: 'Design',
      type: 'article' as const,
      published: true,
      author: 'Linart Realty Team',
      seoTitle: 'Luxury Interior Design Guide - Timeless Elegance',
      seoDescription: 'Expert insights on creating timeless luxury interiors that enhance property value and provide exceptional living experiences.',
      seoKeywords: 'luxury interior design, premium finishes, property value'
    }
  ];
  
  console.log(`Creating ${initialPosts.length} blog posts...`);
  let created = 0;
  let failed = 0;
  
  for (const postData of initialPosts) {
    try {
      await createPost(postData);
      created++;
      console.log(`✅ Created blog post: ${postData.title}`);
    } catch (error) {
      failed++;
      console.error(`❌ Failed to create blog post: ${postData.title}`, error);
    }
  }
  
  console.log(`Blog posts seeding completed: ${created} created, ${failed} failed`);
  
  // Set flag to prevent future seeding
  await kv.set('seed:completed:blog', { completed: true, timestamp: new Date().toISOString() });
  return true;
}