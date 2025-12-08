import { Hono } from 'npm:hono@^4.0.0';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import * as kvStore from './kv_store.ts';
import * as blog from './blog.ts';
import * as properties from './properties.ts';
import * as testimonials from './testimonials.ts';
import * as recognition from './recognition.ts';
import * as partnerships from './partnerships.ts';

const app = new Hono();

// Create Supabase client
const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);

// Enable logger
app.use("*", logger(console.log));

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

/*
═══════════════════════════════════════════════════════════════════
  PUBLIC/SETUP ENDPOINTS
═══════════════════════════════════════════════════════════════════
*/

// Health check endpoint
app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

// Seed all initial data
app.get("/seed-all", async (c) => {
  try {
    // Check if seeding is already in progress (lock mechanism)
    const seedLock = await kvStore.get("seed:lock");
    if (seedLock) {
      return c.json(
        {
          success: false,
          message: "Seeding already in progress. Please wait.",
        },
        429,
      );
    }

    // Set lock
    await kvStore.set("seed:lock", {
      locked: true,
      timestamp: new Date().toISOString(),
    });

    try {
      await blog.seedInitialPosts();
      await properties.seedInitialProperties();
      await testimonials.seedInitialTestimonials();
      await recognition.seedInitialRecognitions();
      await partnerships.seedInitialPartnerships();

      // Remove lock after successful seeding
      await kvStore.del("seed:lock");

      return c.json({
        success: true,
        message: "All initial data seeded successfully",
      });
    } catch (seedError) {
      // Remove lock even if seeding fails
      await kvStore.del("seed:lock");
      throw seedError;
    }
  } catch (error) {
    console.log(`Error seeding initial data: ${error}`);
    return c.json({ error: "Error seeding initial data" }, 500);
  }
});

// FORCE RESET - Clear ALL data and reseed
app.get("/force-reseed", async (c) => {
  try {
    console.log("🔥 FORCE RESET: Starting complete database reset...");

    // Delete ALL seed flags
    await kvStore.del("seed:completed:blog");
    await kvStore.del("seed:completed:properties");
    await kvStore.del("seed:completed:testimonials");
    await kvStore.del("seed:completed:recognition");
    await kvStore.del("seed:completed:partnerships");
    await kvStore.del("seed:lock");
    console.log("✅ Deleted all seed flags");

    // Delete ALL old data with various prefixes
    const prefixes = [
      "blog:",
      "blog_",
      "property:",
      "property_",
      "testimonial:",
      "testimonial_",
      "recognition:",
      "recognition_",
      "partnership:",
      "partnership_",
    ];

    for (const prefix of prefixes) {
      const items = await kvStore.getByPrefix(prefix);
      console.log(`🧹 Found ${items.length} items with prefix "${prefix}"`);
      
      for (const item of items) {
        if (item && item.key) {
          console.log(`    Deleting key: ${item.key}`);
          await kvStore.del(item.key);
        }
      }
    }
    console.log("✅ Deleted all old data");

    // Now run fresh seed
    console.log("🌱 Starting fresh seed...");
    await blog.seedInitialPosts();
    console.log("✅ Blog seeded");
    await properties.seedInitialProperties();
    console.log("✅ Properties seeded");
    await testimonials.seedInitialTestimonials();
    console.log("✅ Testimonials seeded");
    await recognition.seedInitialRecognitions();
    console.log("✅ Recognition seeded");
    await partnerships.seedInitialPartnerships();
    console.log("✅ Partnerships seeded");

    return c.json({
      success: true,
      message: "FORCE RESET completed! All data cleared and reseeded with fresh data.",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error(`❌ Error in force reseed: ${error}`);
    return c.json({ error: `Force reseed error: ${error}` }, 500);
  }
});

/*
═══════════════════════════════════════════════════════════════════
  AUTH ENDPOINTS
═══════════════════════════════════════════════════════════════════
*/

// Sign up endpoint
app.post("/auth/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name } = body;

    if (!email || !password) {
      return c.json(
        { error: "Email and password are required" },
        400,
      );
    }

    const { data, error } =
      await supabase.auth.admin.createUser({
        email,
        password,
        user_metadata: { name: name || "" },
        // Automatically confirm the user's email since an email server hasn't been configured.
        email_confirm: true,
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
        name: data.user.user_metadata?.name,
      },
    });
  } catch (error) {
    console.log(`Server error during signup: ${error}`);
    return c.json(
      { error: "Internal server error during signup" },
      500,
    );
  }
});

// Get user profile endpoint
app.get("/auth/profile", async (c) => {
  try {
    const accessToken = c.req
      .header("Authorization")
      ?.split(" ")[1];

    if (!accessToken) {
      return c.json(
        { error: "Unauthorized - No token provided" },
        401,
      );
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      console.log(
        `Error getting user profile: ${error?.message}`,
      );
      return c.json(
        { error: "Unauthorized - Invalid token" },
        401,
      );
    }

    return c.json({
      id: user.id,
      email: user.email,
      name: user.user_metadata?.name || "",
      created_at: user.created_at,
    });
  } catch (error) {
    console.log(`Server error getting profile: ${error}`);
    return c.json(
      { error: "Internal server error getting profile" },
      500,
    );
  }
});

// Update user profile endpoint
app.put("/auth/profile", async (c) => {
  try {
    const accessToken = c.req
      .header("Authorization")
      ?.split(" ")[1];

    if (!accessToken) {
      return c.json(
        { error: "Unauthorized - No token provided" },
        401,
      );
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      console.log(
        `Error authenticating user for profile update: ${authError?.message}`,
      );
      return c.json(
        { error: "Unauthorized - Invalid token" },
        401,
      );
    }

    const body = await c.req.json();
    const { name } = body;

    const { data, error } =
      await supabase.auth.admin.updateUserById(user.id, {
        user_metadata: { name },
      });

    if (error) {
      console.log(
        `Error updating user profile: ${error.message}`,
      );
      return c.json({ error: error.message }, 400);
    }

    return c.json({
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name,
      },
    });
  } catch (error) {
    console.log(`Server error updating profile: ${error}`);
    return c.json(
      { error: "Internal server error updating profile" },
      500,
    );
  }
});

/*
═══════════════════════════════════════════════════════════════════
  FAVORITES ENDPOINTS
═══════════════════════════════════════════════════════════════════
*/

// Favorites endpoints
app.get("/favorites", async (c) => {
  try {
    const accessToken = c.req
      .header("Authorization")
      ?.split(" ")[1];

    if (!accessToken) {
      return c.json(
        { error: "Unauthorized - No token provided" },
        401,
      );
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json(
        { error: "Unauthorized - Invalid token" },
        401,
      );
    }

    const favorites = await kvStore.get(`favorites_${user.id}`);
    return c.json({ favorites: favorites || [] });
  } catch (error) {
    console.log(`Server error getting favorites: ${error}`);
    return c.json(
      { error: "Internal server error getting favorites" },
      500,
    );
  }
});

app.post("/favorites", async (c) => {
  try {
    const accessToken = c.req
      .header("Authorization")
      ?.split(" ")[1];

    if (!accessToken) {
      return c.json(
        { error: "Unauthorized - No token provided" },
        401,
      );
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json(
        { error: "Unauthorized - Invalid token" },
        401,
      );
    }

    const body = await c.req.json();
    const { propertyId, propertyData } = body;

    const currentFavorites =
      (await kvStore.get(`favorites_${user.id}`)) || [];
    const favorites = Array.isArray(currentFavorites)
      ? currentFavorites
      : [];

    const exists = favorites.some(
      (fav: any) => fav.id === propertyId,
    );

    if (exists) {
      return c.json(
        { error: "Property already in favorites" },
        400,
      );
    }

    favorites.push({
      id: propertyId,
      ...propertyData,
      addedAt: new Date().toISOString(),
    });
    await kvStore.set(`favorites_${user.id}`, favorites);

    return c.json({ success: true, favorites });
  } catch (error) {
    console.log(`Server error adding favorite: ${error}`);
    return c.json(
      { error: "Internal server error adding favorite" },
      500,
    );
  }
});

app.delete("/favorites/:propertyId", async (c) => {
  try {
    const accessToken = c.req
      .header("Authorization")
      ?.split(" ")[1];

    if (!accessToken) {
      return c.json(
        { error: "Unauthorized - No token provided" },
        401,
      );
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json(
        { error: "Unauthorized - Invalid token" },
        401,
      );
    }

    const propertyId = c.req.param("propertyId");
    const currentFavorites =
      (await kvStore.get(`favorites_${user.id}`)) || [];
    const favorites = Array.isArray(currentFavorites)
      ? currentFavorites
      : [];

    const filtered = favorites.filter(
      (fav: any) => fav.id !== propertyId,
    );
    await kvStore.set(`favorites_${user.id}`, filtered);

    return c.json({ success: true, favorites: filtered });
  } catch (error) {
    console.log(`Server error removing favorite: ${error}`);
    return c.json(
      { error: "Internal server error removing favorite" },
      500,
    );
  }
});

/*
═══════════════════════════════════════════════════════════════════
  BLOG API ENDPOINTS
═══════════════════════════════════════════════════════════════════
*/

// Seed initial blog posts (run once on first request)
app.get("/blog/seed", async (c) => {
  try {
    await blog.seedInitialPosts();
    return c.json({
      success: true,
      message: "Initial posts seeded",
    });
  } catch (error) {
    console.log(`Error seeding blog posts: ${error}`);
    return c.json({ error: "Error seeding blog posts" }, 500);
  }
});

// Get all published posts (PUBLIC)
app.get("/blog/posts", async (c) => {
  try {
    const posts = await blog.getAllPublishedPosts();
    return c.json({ posts });
  } catch (error) {
    console.log(`Error fetching blog posts: ${error}`);
    return c.json({ error: "Error fetching blog posts" }, 500);
  }
});

// Get post by slug (PUBLIC)
app.get("/blog/posts/:slug", async (c) => {
  try {
    const slug = c.req.param("slug");
    const post = await blog.getPostBySlug(slug);

    if (!post) {
      return c.json({ error: "Post not found" }, 404);
    }

    return c.json({ post });
  } catch (error) {
    console.log(`Error fetching blog post: ${error}`);
    return c.json({ error: "Error fetching blog post" }, 500);
  }
});

// Get all posts including drafts (ADMIN - requires auth)
app.get("/blog/admin/posts", async (c) => {
  try {
    const accessToken = c.req
      .header("Authorization")
      ?.split(" ")[1];

    if (!accessToken) {
      return c.json(
        { error: "Unauthorized - No token provided" },
        401,
      );
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json(
        { error: "Unauthorized - Invalid token" },
        401,
      );
    }

    const posts = await blog.getAllPosts();
    return c.json({ posts });
  } catch (error) {
    console.log(`Error fetching all blog posts: ${error}`);
    return c.json(
      { error: "Error fetching all blog posts" },
      500,
    );
  }
});

// Get post by ID (ADMIN - for editing)
app.get("/blog/admin/posts/:id", async (c) => {
  try {
    const accessToken = c.req
      .header("Authorization")
      ?.split(" ")[1];

    if (!accessToken) {
      return c.json(
        { error: "Unauthorized - No token provided" },
        401,
      );
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json(
        { error: "Unauthorized - Invalid token" },
        401,
      );
    }

    const id = c.req.param("id");
    const post = await blog.getPostById(id);

    if (!post) {
      return c.json({ error: "Post not found" }, 404);
    }

    return c.json({ post });
  } catch (error) {
    console.log(`Error fetching blog post by ID: ${error}`);
    return c.json({ error: "Error fetching blog post" }, 500);
  }
});

// Create new post (ADMIN)
app.post("/blog/admin/posts", async (c) => {
  try {
    const accessToken = c.req
      .header("Authorization")
      ?.split(" ")[1];

    if (!accessToken) {
      return c.json(
        { error: "Unauthorized - No token provided" },
        401,
      );
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json(
        { error: "Unauthorized - Invalid token" },
        401,
      );
    }

    const body = await c.req.json();
    const post = await blog.createPost({
      ...body,
      author: user.user_metadata?.name || user.email,
    });

    return c.json({ success: true, post });
  } catch (error) {
    console.log(`Error creating blog post: ${error}`);
    return c.json({ error: "Error creating blog post" }, 500);
  }
});

// Update post (ADMIN)
app.put("/blog/admin/posts/:id", async (c) => {
  try {
    const accessToken = c.req
      .header("Authorization")
      ?.split(" ")[1];

    if (!accessToken) {
      return c.json(
        { error: "Unauthorized - No token provided" },
        401,
      );
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json(
        { error: "Unauthorized - Invalid token" },
        401,
      );
    }

    const id = c.req.param("id");
    const body = await c.req.json();
    const post = await blog.updatePost(id, body);

    if (!post) {
      return c.json({ error: "Post not found" }, 404);
    }

    return c.json({ success: true, post });
  } catch (error) {
    console.log(`Error updating blog post: ${error}`);
    return c.json({ error: "Error updating blog post" }, 500);
  }
});

// Delete post (ADMIN)
app.delete("/blog/admin/posts/:id", async (c) => {
  try {
    const accessToken = c.req
      .header("Authorization")
      ?.split(" ")[1];

    if (!accessToken) {
      return c.json(
        { error: "Unauthorized - No token provided" },
        401,
      );
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json(
        { error: "Unauthorized - Invalid token" },
        401,
      );
    }

    const id = c.req.param("id");
    const success = await blog.deletePost(id);

    if (!success) {
      return c.json({ error: "Post not found" }, 404);
    }

    return c.json({ success: true, message: "Post deleted" });
  } catch (error) {
    console.log(`Error deleting blog post: ${error}`);
    return c.json({ error: "Error deleting blog post" }, 500);
  }
});

/*
═══════════════════════════════════════════════════════════════════
  PROPERTIES API ENDPOINTS
═══════════════════════════════════════════════════════════════════
*/

// Get all properties (PUBLIC)
app.get("/properties", async (c) => {
  try {
    const propertiesList = await properties.getAllProperties();
    return c.json({ properties: propertiesList });
  } catch (error) {
    console.log(`Error fetching properties: ${error}`);
    return c.json({ error: "Error fetching properties" }, 500);
  }
});

// Get property by ID (PUBLIC)
app.get("/properties/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const property = await properties.getPropertyById(id);

    if (!property) {
      return c.json({ error: "Property not found" }, 404);
    }

    return c.json({ property });
  } catch (error) {
    console.log(`Error fetching property: ${error}`);
    return c.json({ error: "Error fetching property" }, 500);
  }
});

// Create new property (ADMIN)
app.post("/properties/admin", async (c) => {
  try {
    const accessToken = c.req
      .header("Authorization")
      ?.split(" ")[1];

    if (!accessToken) {
      return c.json(
        { error: "Unauthorized - No token provided" },
        401,
      );
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json(
        { error: "Unauthorized - Invalid token" },
        401,
      );
    }

    const body = await c.req.json();
    const property = await properties.createProperty({
      ...body,
      created_by: user.user_metadata?.name || user.email,
    });

    return c.json({ success: true, property });
  } catch (error) {
    console.log(`Error creating property: ${error}`);
    return c.json({ error: "Error creating property" }, 500);
  }
});

// Update property (ADMIN)
app.put("/properties/admin/:id", async (c) => {
  try {
    const accessToken = c.req
      .header("Authorization")
      ?.split(" ")[1];

    if (!accessToken) {
      return c.json(
        { error: "Unauthorized - No token provided" },
        401,
      );
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json(
        { error: "Unauthorized - Invalid token" },
        401,
      );
    }

    const id = c.req.param("id");
    const body = await c.req.json();
    const property = await properties.updateProperty(id, body);

    if (!property) {
      return c.json({ error: "Property not found" }, 404);
    }

    return c.json({ success: true, property });
  } catch (error) {
    console.log(`Error updating property: ${error}`);
    return c.json({ error: "Error updating property" }, 500);
  }
});

// Delete property (ADMIN)
app.delete("/properties/admin/:id", async (c) => {
  try {
    const accessToken = c.req
      .header("Authorization")
      ?.split(" ")[1];

    if (!accessToken) {
      return c.json(
        { error: "Unauthorized - No token provided" },
        401,
      );
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json(
        { error: "Unauthorized - Invalid token" },
        401,
      );
    }

    const id = c.req.param("id");
    const success = await properties.deleteProperty(id);

    if (!success) {
      return c.json({ error: "Property not found" }, 404);
    }

    return c.json({
      success: true,
      message: "Property deleted",
    });
  } catch (error) {
    console.log(`Error deleting property: ${error}`);
    return c.json({ error: "Error deleting property" }, 500);
  }
});

/*
═══════════════════════════════════════════════════════════════════
  TESTIMONIALS API ENDPOINTS
═══════════════════════════════════════════════════════════════════
*/

// Get all testimonials (PUBLIC)
app.get("/testimonials", async (c) => {
  try {
    const testimonialsList =
      await testimonials.getAllTestimonials();
    return c.json({ testimonials: testimonialsList });
  } catch (error) {
    console.log(`Error fetching testimonials: ${error}`);
    return c.json(
      { error: "Error fetching testimonials" },
      500,
    );
  }
});

// Get testimonial by ID (PUBLIC)
app.get("/testimonials/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const testimonial =
      await testimonials.getTestimonialById(id);

    if (!testimonial) {
      return c.json({ error: "Testimonial not found" }, 404);
    }

    return c.json({ testimonial });
  } catch (error) {
    console.log(`Error fetching testimonial: ${error}`);
    return c.json({ error: "Error fetching testimonial" }, 500);
  }
});

// Create new testimonial (ADMIN)
app.post("/testimonials/admin", async (c) => {
  try {
    const accessToken = c.req
      .header("Authorization")
      ?.split(" ")[1];

    if (!accessToken) {
      return c.json(
        { error: "Unauthorized - No token provided" },
        401,
      );
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json(
        { error: "Unauthorized - Invalid token" },
        401,
      );
    }

    const body = await c.req.json();
    const testimonial = await testimonials.createTestimonial({
      ...body,
      created_by: user.user_metadata?.name || user.email,
    });

    return c.json({ success: true, testimonial });
  } catch (error) {
    console.log(`Error creating testimonial: ${error}`);
    return c.json({ error: "Error creating testimonial" }, 500);
  }
});

// Update testimonial (ADMIN)
app.put("/testimonials/admin/:id", async (c) => {
  try {
    const accessToken = c.req
      .header("Authorization")
      ?.split(" ")[1];

    if (!accessToken) {
      return c.json(
        { error: "Unauthorized - No token provided" },
        401,
      );
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json(
        { error: "Unauthorized - Invalid token" },
        401,
      );
    }

    const id = c.req.param("id");
    const body = await c.req.json();
    const testimonial = await testimonials.updateTestimonial(
      id,
      body,
    );

    if (!testimonial) {
      return c.json({ error: "Testimonial not found" }, 404);
    }

    return c.json({ success: true, testimonial });
  } catch (error) {
    console.log(`Error updating testimonial: ${error}`);
    return c.json({ error: "Error updating testimonial" }, 500);
  }
});

// Delete testimonial (ADMIN)
app.delete("/testimonials/admin/:id", async (c) => {
  try {
    const accessToken = c.req
      .header("Authorization")
      ?.split(" ")[1];

    if (!accessToken) {
      return c.json(
        { error: "Unauthorized - No token provided" },
        401,
      );
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json(
        { error: "Unauthorized - Invalid token" },
        401,
      );
    }

    const id = c.req.param("id");
    const success = await testimonials.deleteTestimonial(id);

    if (!success) {
      return c.json({ error: "Testimonial not found" }, 404);
    }

    return c.json({
      success: true,
      message: "Testimonial deleted",
    });
  } catch (error) {
    console.log(`Error deleting testimonial: ${error}`);
    return c.json({ error: "Error deleting testimonial" }, 500);
  }
});

/*
═══════════════════════════════════════════════════════════════════
  RECOGNITION API ENDPOINTS
═══════════════════════════════════════════════════════════════════
*/

// Get all recognitions (PUBLIC)
app.get("/recognition", async (c) => {
  try {
    const recognitionsList =
      await recognition.getAllRecognitions();
    return c.json({ recognitions: recognitionsList });
  } catch (error) {
    console.log(`Error fetching recognitions: ${error}`);
    return c.json(
      { error: "Error fetching recognitions" },
      500,
    );
  }
});

// Get recognition by ID (PUBLIC)
app.get("/recognition/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const recognitionItem =
      await recognition.getRecognitionById(id);

    if (!recognitionItem) {
      return c.json({ error: "Recognition not found" }, 404);
    }

    return c.json({ recognition: recognitionItem });
  } catch (error) {
    console.log(`Error fetching recognition: ${error}`);
    return c.json({ error: "Error fetching recognition" }, 500);
  }
});

// Create new recognition (ADMIN)
app.post("/recognition/admin", async (c) => {
  try {
    const accessToken = c.req
      .header("Authorization")
      ?.split(" ")[1];

    if (!accessToken) {
      return c.json(
        { error: "Unauthorized - No token provided" },
        401,
      );
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json(
        { error: "Unauthorized - Invalid token" },
        401,
      );
    }

    const body = await c.req.json();
    const recognitionItem = await recognition.createRecognition(
      {
        ...body,
        created_by: user.user_metadata?.name || user.email,
      },
    );

    return c.json({
      success: true,
      recognition: recognitionItem,
    });
  } catch (error) {
    console.log(`Error creating recognition: ${error}`);
    return c.json({ error: "Error creating recognition" }, 500);
  }
});

// Update recognition (ADMIN)
app.put("/recognition/admin/:id", async (c) => {
  try {
    const accessToken = c.req
      .header("Authorization")
      ?.split(" ")[1];

    if (!accessToken) {
      return c.json(
        { error: "Unauthorized - No token provided" },
        401,
      );
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json(
        { error: "Unauthorized - Invalid token" },
        401,
      );
    }

    const id = c.req.param("id");
    const body = await c.req.json();
    const recognitionItem = await recognition.updateRecognition(
      id,
      body,
    );

    if (!recognitionItem) {
      return c.json({ error: "Recognition not found" }, 404);
    }

    return c.json({
      success: true,
      recognition: recognitionItem,
    });
  } catch (error) {
    console.log(`Error updating recognition: ${error}`);
    return c.json({ error: "Error updating recognition" }, 500);
  }
});

// Delete recognition (ADMIN)
app.delete("/recognition/admin/:id", async (c) => {
  try {
    const accessToken = c.req
      .header("Authorization")
      ?.split(" ")[1];

    if (!accessToken) {
      return c.json(
        { error: "Unauthorized - No token provided" },
        401,
      );
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json(
        { error: "Unauthorized - Invalid token" },
        401,
      );
    }

    const id = c.req.param("id");
    const success = await recognition.deleteRecognition(id);

    if (!success) {
      return c.json({ error: "Recognition not found" }, 404);
    }

    return c.json({
      success: true,
      message: "Recognition deleted",
    });
  } catch (error) {
    console.log(`Error deleting recognition: ${error}`);
    return c.json({ error: "Error deleting recognition" }, 500);
  }
});

/*
═══════════════════════════════════════════════════════════════════
  PARTNERSHIPS API ENDPOINTS
═══════════════════════════════════════════════════════════════════
*/

// Get all partnerships (PUBLIC)
app.get("/partnerships", async (c) => {
  try {
    const partnershipsList =
      await partnerships.getAllPartnerships();
    return c.json({ partnerships: partnershipsList });
  } catch (error) {
    console.log(`Error fetching partnerships: ${error}`);
    return c.json(
      { error: "Error fetching partnerships" },
      500,
    );
  }
});

// Get partnership by ID (PUBLIC)
app.get("/partnerships/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const partnership =
      await partnerships.getPartnershipById(id);

    if (!partnership) {
      return c.json({ error: "Partnership not found" }, 404);
    }

    return c.json({ partnership });
  } catch (error) {
    console.log(`Error fetching partnership: ${error}`);
    return c.json({ error: "Error fetching partnership" }, 500);
  }
});

// Create new partnership (ADMIN)
app.post("/partnerships/admin", async (c) => {
  try {
    const accessToken = c.req
      .header("Authorization")
      ?.split(" ")[1];

    if (!accessToken) {
      return c.json(
        { error: "Unauthorized - No token provided" },
        401,
      );
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json(
        { error: "Unauthorized - Invalid token" },
        401,
      );
    }

    const body = await c.req.json();
    const partnership = await partnerships.createPartnership({
      ...body,
      created_by: user.user_metadata?.name || user.email,
    });

    return c.json({ success: true, partnership });
  } catch (error) {
    console.log(`Error creating partnership: ${error}`);
    return c.json({ error: "Error creating partnership" }, 500);
  }
});

// Update partnership (ADMIN)
app.put("/partnerships/admin/:id", async (c) => {
  try {
    const accessToken = c.req
      .header("Authorization")
      ?.split(" ")[1];

    if (!accessToken) {
      return c.json(
        { error: "Unauthorized - No token provided" },
        401,
      );
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json(
        { error: "Unauthorized - Invalid token" },
        401,
      );
    }

    const id = c.req.param("id");
    const body = await c.req.json();
    const partnership = await partnerships.updatePartnership(
      id,
      body,
    );

    if (!partnership) {
      return c.json({ error: "Partnership not found" }, 404);
    }

    return c.json({ success: true, partnership });
  } catch (error) {
    console.log(`Error updating partnership: ${error}`);
    return c.json({ error: "Error updating partnership" }, 500);
  }
});

// Delete partnership (ADMIN)
app.delete("/partnerships/admin/:id", async (c) => {
  try {
    const accessToken = c.req
      .header("Authorization")
      ?.split(" ")[1];

    if (!accessToken) {
      return c.json(
        { error: "Unauthorized - No token provided" },
        401,
      );
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json(
        { error: "Unauthorized - Invalid token" },
        401,
      );
    }

    const id = c.req.param("id");
    const success = await partnerships.deletePartnership(id);

    if (!success) {
      return c.json({ error: "Partnership not found" }, 404);
    }

    return c.json({
      success: true,
      message: "Partnership deleted",
    });
  } catch (error) {
    console.log(`Error deleting partnership: ${error}`);
    return c.json({ error: "Error deleting partnership" }, 500);
  }
});

// Wrapper handler that bypasses Supabase's default JWT verification
// This allows public endpoints to work without authentication
const handler = async (req: Request) => {
  try {
    const url = new URL(req.url);
    console.log(`[DEBUG] Original URL: ${req.url}`);
    console.log(`[DEBUG] Original pathname: ${url.pathname}`);
    console.log(`[DEBUG] Method: ${req.method}`);

    // Public endpoints that don't require authentication
    const publicPaths = [
      "/health",
      "/seed-all",
      "/force-reseed",
      "/blog/posts",
      "/properties",
      "/testimonials",
      "/recognition",
      "/partnerships",
    ];

    // Check if this is a public endpoint
    const isPublicEndpoint = publicPaths.some((path) =>
      url.pathname.includes(path),
    );

    // If it's a public endpoint and no auth header, add a dummy one to bypass Supabase JWT check
    const authHeader = req.headers.get("Authorization");
    if (isPublicEndpoint && !authHeader) {
      console.log(
        "[DEBUG] Public endpoint - bypassing auth requirement",
      );
      // Clone request with anon key to satisfy Supabase's requirement
      const headers = new Headers(req.headers);
      headers.set(
        "Authorization",
        `Bearer ${Deno.env.get("SUPABASE_ANON_KEY") ?? ""}`,
      );

      const newReq = new Request(req.url, {
        method: req.method,
        headers,
        body: req.body,
      });

      return await app.fetch(newReq);
    }

    return await app.fetch(req);
  } catch (error) {
    console.log(`Error in request handler: ${error}`);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};

Deno.serve(handler);