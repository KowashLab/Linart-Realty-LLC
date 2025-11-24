import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import * as blog from "./blog.tsx";
import * as properties from "./properties.tsx";
import * as testimonials from "./testimonials.tsx";
import * as recognition from "./recognition.tsx";
import * as partnerships from "./partnerships.tsx";
import { createClient } from "jsr:@supabase/supabase-js@2";

const app = new Hono();

// Create Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-dcec270f/health", (c) => {
  return c.json({ status: "ok" });
});

// Seed all initial data
app.get("/make-server-dcec270f/seed-all", async (c) => {
  try {
    await blog.seedInitialPosts();
    await properties.seedInitialProperties();
    await testimonials.seedInitialTestimonials();
    await recognition.seedInitialRecognitions();
    await partnerships.seedInitialPartnerships();
    return c.json({ success: true, message: 'All initial data seeded successfully' });
  } catch (error) {
    console.log(`Error seeding initial data: ${error}`);
    return c.json({ error: 'Error seeding initial data' }, 500);
  }
});

// Sign up endpoint
app.post("/make-server-dcec270f/auth/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name } = body;

    if (!email || !password) {
      return c.json({ error: 'Email and password are required' }, 400);
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name: name || '' },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log(`Error creating user: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ 
      success: true, 
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name
      }
    });
  } catch (error) {
    console.log(`Server error during signup: ${error}`);
    return c.json({ error: 'Internal server error during signup' }, 500);
  }
});

// Get user profile endpoint
app.get("/make-server-dcec270f/auth/profile", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized - No token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      console.log(`Error getting user profile: ${error?.message}`);
      return c.json({ error: 'Unauthorized - Invalid token' }, 401);
    }

    return c.json({
      id: user.id,
      email: user.email,
      name: user.user_metadata?.name || '',
      created_at: user.created_at
    });
  } catch (error) {
    console.log(`Server error getting profile: ${error}`);
    return c.json({ error: 'Internal server error getting profile' }, 500);
  }
});

// Update user profile endpoint
app.put("/make-server-dcec270f/auth/profile", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized - No token provided' }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user) {
      console.log(`Error authenticating user for profile update: ${authError?.message}`);
      return c.json({ error: 'Unauthorized - Invalid token' }, 401);
    }

    const body = await c.req.json();
    const { name } = body;

    const { data, error } = await supabase.auth.admin.updateUserById(
      user.id,
      { user_metadata: { name } }
    );

    if (error) {
      console.log(`Error updating user profile: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ 
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name
      }
    });
  } catch (error) {
    console.log(`Server error updating profile: ${error}`);
    return c.json({ error: 'Internal server error updating profile' }, 500);
  }
});

// Favorites endpoints
app.get("/make-server-dcec270f/favorites", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized - No token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized - Invalid token' }, 401);
    }

    const favorites = await kv.get(`favorites_${user.id}`);
    return c.json({ favorites: favorites || [] });
  } catch (error) {
    console.log(`Server error getting favorites: ${error}`);
    return c.json({ error: 'Internal server error getting favorites' }, 500);
  }
});

app.post("/make-server-dcec270f/favorites", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized - No token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized - Invalid token' }, 401);
    }

    const body = await c.req.json();
    const { propertyId, propertyData } = body;

    const currentFavorites = await kv.get(`favorites_${user.id}`) || [];
    const favorites = Array.isArray(currentFavorites) ? currentFavorites : [];
    
    const exists = favorites.some((fav: any) => fav.id === propertyId);
    
    if (exists) {
      return c.json({ error: 'Property already in favorites' }, 400);
    }

    favorites.push({ id: propertyId, ...propertyData, addedAt: new Date().toISOString() });
    await kv.set(`favorites_${user.id}`, favorites);

    return c.json({ success: true, favorites });
  } catch (error) {
    console.log(`Server error adding favorite: ${error}`);
    return c.json({ error: 'Internal server error adding favorite' }, 500);
  }
});

app.delete("/make-server-dcec270f/favorites/:propertyId", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized - No token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized - Invalid token' }, 401);
    }

    const propertyId = c.req.param('propertyId');
    const currentFavorites = await kv.get(`favorites_${user.id}`) || [];
    const favorites = Array.isArray(currentFavorites) ? currentFavorites : [];
    
    const filtered = favorites.filter((fav: any) => fav.id !== propertyId);
    await kv.set(`favorites_${user.id}`, filtered);

    return c.json({ success: true, favorites: filtered });
  } catch (error) {
    console.log(`Server error removing favorite: ${error}`);
    return c.json({ error: 'Internal server error removing favorite' }, 500);
  }
});

/*
═══════════════════════════════════════════════════════════════════
  BLOG API ENDPOINTS
═══════════════════════════════════════════════════════════════════
*/

// Seed initial blog posts (run once on first request)
app.get("/make-server-dcec270f/blog/seed", async (c) => {
  try {
    await blog.seedInitialPosts();
    return c.json({ success: true, message: 'Initial posts seeded' });
  } catch (error) {
    console.log(`Error seeding blog posts: ${error}`);
    return c.json({ error: 'Error seeding blog posts' }, 500);
  }
});

// Get all published posts (PUBLIC)
app.get("/make-server-dcec270f/blog/posts", async (c) => {
  try {
    const posts = await blog.getAllPublishedPosts();
    return c.json({ posts });
  } catch (error) {
    console.log(`Error fetching blog posts: ${error}`);
    return c.json({ error: 'Error fetching blog posts' }, 500);
  }
});

// Get post by slug (PUBLIC)
app.get("/make-server-dcec270f/blog/posts/:slug", async (c) => {
  try {
    const slug = c.req.param('slug');
    const post = await blog.getPostBySlug(slug);
    
    if (!post) {
      return c.json({ error: 'Post not found' }, 404);
    }
    
    return c.json({ post });
  } catch (error) {
    console.log(`Error fetching blog post: ${error}`);
    return c.json({ error: 'Error fetching blog post' }, 500);
  }
});

// Get all posts including drafts (ADMIN - requires auth)
app.get("/make-server-dcec270f/blog/admin/posts", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized - No token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized - Invalid token' }, 401);
    }
    
    const posts = await blog.getAllPosts();
    return c.json({ posts });
  } catch (error) {
    console.log(`Error fetching all blog posts: ${error}`);
    return c.json({ error: 'Error fetching all blog posts' }, 500);
  }
});

// Get post by ID (ADMIN - for editing)
app.get("/make-server-dcec270f/blog/admin/posts/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized - No token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized - Invalid token' }, 401);
    }
    
    const id = c.req.param('id');
    const post = await blog.getPostById(id);
    
    if (!post) {
      return c.json({ error: 'Post not found' }, 404);
    }
    
    return c.json({ post });
  } catch (error) {
    console.log(`Error fetching blog post by ID: ${error}`);
    return c.json({ error: 'Error fetching blog post' }, 500);
  }
});

// Create new post (ADMIN)
app.post("/make-server-dcec270f/blog/admin/posts", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized - No token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized - Invalid token' }, 401);
    }
    
    const body = await c.req.json();
    const post = await blog.createPost({
      ...body,
      author: user.user_metadata?.name || user.email
    });
    
    return c.json({ success: true, post });
  } catch (error) {
    console.log(`Error creating blog post: ${error}`);
    return c.json({ error: 'Error creating blog post' }, 500);
  }
});

// Update post (ADMIN)
app.put("/make-server-dcec270f/blog/admin/posts/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized - No token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized - Invalid token' }, 401);
    }
    
    const id = c.req.param('id');
    const body = await c.req.json();
    const post = await blog.updatePost(id, body);
    
    if (!post) {
      return c.json({ error: 'Post not found' }, 404);
    }
    
    return c.json({ success: true, post });
  } catch (error) {
    console.log(`Error updating blog post: ${error}`);
    return c.json({ error: 'Error updating blog post' }, 500);
  }
});

// Delete post (ADMIN)
app.delete("/make-server-dcec270f/blog/admin/posts/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized - No token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized - Invalid token' }, 401);
    }
    
    const id = c.req.param('id');
    const success = await blog.deletePost(id);
    
    if (!success) {
      return c.json({ error: 'Post not found' }, 404);
    }
    
    return c.json({ success: true, message: 'Post deleted' });
  } catch (error) {
    console.log(`Error deleting blog post: ${error}`);
    return c.json({ error: 'Error deleting blog post' }, 500);
  }
});

/*
═══════════════════════════════════════════════════════════════════
  PROPERTIES API ENDPOINTS
═══════════════════════════════════════════════════════════════════
*/

// Get all properties (PUBLIC)
app.get("/make-server-dcec270f/properties", async (c) => {
  try {
    const propertiesList = await properties.getAllProperties();
    return c.json({ properties: propertiesList });
  } catch (error) {
    console.log(`Error fetching properties: ${error}`);
    return c.json({ error: 'Error fetching properties' }, 500);
  }
});

// Get property by ID (PUBLIC)
app.get("/make-server-dcec270f/properties/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const property = await properties.getPropertyById(id);
    
    if (!property) {
      return c.json({ error: 'Property not found' }, 404);
    }
    
    return c.json({ property });
  } catch (error) {
    console.log(`Error fetching property: ${error}`);
    return c.json({ error: 'Error fetching property' }, 500);
  }
});

// Create new property (ADMIN)
app.post("/make-server-dcec270f/properties/admin", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized - No token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized - Invalid token' }, 401);
    }
    
    const body = await c.req.json();
    const property = await properties.createProperty({
      ...body,
      created_by: user.user_metadata?.name || user.email
    });
    
    return c.json({ success: true, property });
  } catch (error) {
    console.log(`Error creating property: ${error}`);
    return c.json({ error: 'Error creating property' }, 500);
  }
});

// Update property (ADMIN)
app.put("/make-server-dcec270f/properties/admin/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized - No token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized - Invalid token' }, 401);
    }
    
    const id = c.req.param('id');
    const body = await c.req.json();
    const property = await properties.updateProperty(id, body);
    
    if (!property) {
      return c.json({ error: 'Property not found' }, 404);
    }
    
    return c.json({ success: true, property });
  } catch (error) {
    console.log(`Error updating property: ${error}`);
    return c.json({ error: 'Error updating property' }, 500);
  }
});

// Delete property (ADMIN)
app.delete("/make-server-dcec270f/properties/admin/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized - No token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized - Invalid token' }, 401);
    }
    
    const id = c.req.param('id');
    const success = await properties.deleteProperty(id);
    
    if (!success) {
      return c.json({ error: 'Property not found' }, 404);
    }
    
    return c.json({ success: true, message: 'Property deleted' });
  } catch (error) {
    console.log(`Error deleting property: ${error}`);
    return c.json({ error: 'Error deleting property' }, 500);
  }
});

/*
═══════════════════════════════════════════════════════════════════
  TESTIMONIALS API ENDPOINTS
═══════════════════════════════════════════════════════════════════
*/

// Get all testimonials (PUBLIC)
app.get("/make-server-dcec270f/testimonials", async (c) => {
  try {
    const testimonialsList = await testimonials.getAllTestimonials();
    return c.json({ testimonials: testimonialsList });
  } catch (error) {
    console.log(`Error fetching testimonials: ${error}`);
    return c.json({ error: 'Error fetching testimonials' }, 500);
  }
});

// Get testimonial by ID (PUBLIC)
app.get("/make-server-dcec270f/testimonials/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const testimonial = await testimonials.getTestimonialById(id);
    
    if (!testimonial) {
      return c.json({ error: 'Testimonial not found' }, 404);
    }
    
    return c.json({ testimonial });
  } catch (error) {
    console.log(`Error fetching testimonial: ${error}`);
    return c.json({ error: 'Error fetching testimonial' }, 500);
  }
});

// Create new testimonial (ADMIN)
app.post("/make-server-dcec270f/testimonials/admin", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized - No token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized - Invalid token' }, 401);
    }
    
    const body = await c.req.json();
    const testimonial = await testimonials.createTestimonial({
      ...body,
      created_by: user.user_metadata?.name || user.email
    });
    
    return c.json({ success: true, testimonial });
  } catch (error) {
    console.log(`Error creating testimonial: ${error}`);
    return c.json({ error: 'Error creating testimonial' }, 500);
  }
});

// Update testimonial (ADMIN)
app.put("/make-server-dcec270f/testimonials/admin/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized - No token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized - Invalid token' }, 401);
    }
    
    const id = c.req.param('id');
    const body = await c.req.json();
    const testimonial = await testimonials.updateTestimonial(id, body);
    
    if (!testimonial) {
      return c.json({ error: 'Testimonial not found' }, 404);
    }
    
    return c.json({ success: true, testimonial });
  } catch (error) {
    console.log(`Error updating testimonial: ${error}`);
    return c.json({ error: 'Error updating testimonial' }, 500);
  }
});

// Delete testimonial (ADMIN)
app.delete("/make-server-dcec270f/testimonials/admin/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized - No token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized - Invalid token' }, 401);
    }
    
    const id = c.req.param('id');
    const success = await testimonials.deleteTestimonial(id);
    
    if (!success) {
      return c.json({ error: 'Testimonial not found' }, 404);
    }
    
    return c.json({ success: true, message: 'Testimonial deleted' });
  } catch (error) {
    console.log(`Error deleting testimonial: ${error}`);
    return c.json({ error: 'Error deleting testimonial' }, 500);
  }
});

/*
═══════════════════════════════════════════════════════════════════
  RECOGNITION API ENDPOINTS
═══════════════════════════════════════════════════════════════════
*/

// Get all recognitions (PUBLIC)
app.get("/make-server-dcec270f/recognition", async (c) => {
  try {
    const recognitionsList = await recognition.getAllRecognitions();
    return c.json({ recognitions: recognitionsList });
  } catch (error) {
    console.log(`Error fetching recognitions: ${error}`);
    return c.json({ error: 'Error fetching recognitions' }, 500);
  }
});

// Get recognition by ID (PUBLIC)
app.get("/make-server-dcec270f/recognition/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const recognitionItem = await recognition.getRecognitionById(id);
    
    if (!recognitionItem) {
      return c.json({ error: 'Recognition not found' }, 404);
    }
    
    return c.json({ recognition: recognitionItem });
  } catch (error) {
    console.log(`Error fetching recognition: ${error}`);
    return c.json({ error: 'Error fetching recognition' }, 500);
  }
});

// Create new recognition (ADMIN)
app.post("/make-server-dcec270f/recognition/admin", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized - No token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized - Invalid token' }, 401);
    }
    
    const body = await c.req.json();
    const recognitionItem = await recognition.createRecognition({
      ...body,
      created_by: user.user_metadata?.name || user.email
    });
    
    return c.json({ success: true, recognition: recognitionItem });
  } catch (error) {
    console.log(`Error creating recognition: ${error}`);
    return c.json({ error: 'Error creating recognition' }, 500);
  }
});

// Update recognition (ADMIN)
app.put("/make-server-dcec270f/recognition/admin/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized - No token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized - Invalid token' }, 401);
    }
    
    const id = c.req.param('id');
    const body = await c.req.json();
    const recognitionItem = await recognition.updateRecognition(id, body);
    
    if (!recognitionItem) {
      return c.json({ error: 'Recognition not found' }, 404);
    }
    
    return c.json({ success: true, recognition: recognitionItem });
  } catch (error) {
    console.log(`Error updating recognition: ${error}`);
    return c.json({ error: 'Error updating recognition' }, 500);
  }
});

// Delete recognition (ADMIN)
app.delete("/make-server-dcec270f/recognition/admin/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized - No token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized - Invalid token' }, 401);
    }
    
    const id = c.req.param('id');
    const success = await recognition.deleteRecognition(id);
    
    if (!success) {
      return c.json({ error: 'Recognition not found' }, 404);
    }
    
    return c.json({ success: true, message: 'Recognition deleted' });
  } catch (error) {
    console.log(`Error deleting recognition: ${error}`);
    return c.json({ error: 'Error deleting recognition' }, 500);
  }
});

/*
═══════════════════════════════════════════════════════════════════
  PARTNERSHIPS API ENDPOINTS
═══════════════════════════════════════════════════════════════════
*/

// Get all partnerships (PUBLIC)
app.get("/make-server-dcec270f/partnerships", async (c) => {
  try {
    const partnershipsList = await partnerships.getAllPartnerships();
    return c.json({ partnerships: partnershipsList });
  } catch (error) {
    console.log(`Error fetching partnerships: ${error}`);
    return c.json({ error: 'Error fetching partnerships' }, 500);
  }
});

// Get partnership by ID (PUBLIC)
app.get("/make-server-dcec270f/partnerships/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const partnership = await partnerships.getPartnershipById(id);
    
    if (!partnership) {
      return c.json({ error: 'Partnership not found' }, 404);
    }
    
    return c.json({ partnership });
  } catch (error) {
    console.log(`Error fetching partnership: ${error}`);
    return c.json({ error: 'Error fetching partnership' }, 500);
  }
});

// Create new partnership (ADMIN)
app.post("/make-server-dcec270f/partnerships/admin", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized - No token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized - Invalid token' }, 401);
    }
    
    const body = await c.req.json();
    const partnership = await partnerships.createPartnership({
      ...body,
      created_by: user.user_metadata?.name || user.email
    });
    
    return c.json({ success: true, partnership });
  } catch (error) {
    console.log(`Error creating partnership: ${error}`);
    return c.json({ error: 'Error creating partnership' }, 500);
  }
});

// Update partnership (ADMIN)
app.put("/make-server-dcec270f/partnerships/admin/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized - No token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized - Invalid token' }, 401);
    }
    
    const id = c.req.param('id');
    const body = await c.req.json();
    const partnership = await partnerships.updatePartnership(id, body);
    
    if (!partnership) {
      return c.json({ error: 'Partnership not found' }, 404);
    }
    
    return c.json({ success: true, partnership });
  } catch (error) {
    console.log(`Error updating partnership: ${error}`);
    return c.json({ error: 'Error updating partnership' }, 500);
  }
});

// Delete partnership (ADMIN)
app.delete("/make-server-dcec270f/partnerships/admin/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized - No token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized - Invalid token' }, 401);
    }
    
    const id = c.req.param('id');
    const success = await partnerships.deletePartnership(id);
    
    if (!success) {
      return c.json({ error: 'Partnership not found' }, 404);
    }
    
    return c.json({ success: true, message: 'Partnership deleted' });
  } catch (error) {
    console.log(`Error deleting partnership: ${error}`);
    return c.json({ error: 'Error deleting partnership' }, 500);
  }
});

Deno.serve(app.fetch);