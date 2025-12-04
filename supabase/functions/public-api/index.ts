import { Hono } from "npm:hono@^4.0.0";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";

// Import all modules
import * as blog from "../server/blog.ts";
import * as properties from "../server/properties.ts";
import * as testimonials from "../server/testimonials.ts";
import * as recognitions from "../server/recognition.ts";
import * as partnerships from "../server/partnerships.ts";

/*
═══════════════════════════════════════════════════════════════════
  PUBLIC API - No JWT verification for public read endpoints
  - All public GET endpoints are here
  - Admin endpoints remain in /server function
═══════════════════════════════════════════════════════════════════
*/

const app = new Hono();

// Middleware
app.use('*', cors());
app.use('*', logger(console.log));

/*
═══════════════════════════════════════════════════════════════════
  BLOG ROUTES
═══════════════════════════════════════════════════════════════════
*/

// Get all blog posts
app.get("/blog/posts", async (c) => {
  try {
    const posts = await blog.getAllPosts();
    const publishedPosts = posts.filter((p: any) => p.published !== false);
    return c.json({ posts: publishedPosts });
  } catch (error) {
    console.log(`Error fetching blog posts: ${error}`);
    return c.json({ error: 'Error fetching blog posts' }, 500);
  }
});

// Get blog post by slug
app.get("/blog/posts/:slug", async (c) => {
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

/*
═══════════════════════════════════════════════════════════════════
  PROPERTIES ROUTES
═══════════════════════════════════════════════════════════════════
*/

// Get all properties
app.get("/properties", async (c) => {
  try {
    const allProperties = await properties.getAllProperties();
    const publishedProperties = allProperties.filter((p: any) => p.published !== false);
    return c.json({ properties: publishedProperties });
  } catch (error) {
    console.log(`Error fetching properties: ${error}`);
    return c.json({ error: 'Error fetching properties' }, 500);
  }
});

// Get property by ID
app.get("/properties/:id", async (c) => {
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

/*
═══════════════════════════════════════════════════════════════════
  TESTIMONIALS ROUTES
═══════════════════════════════════════════════════════════════════
*/

// Get all testimonials
app.get("/testimonials", async (c) => {
  try {
    const allTestimonials = await testimonials.getAllTestimonials();
    const publishedTestimonials = allTestimonials.filter((t: any) => t.published !== false);
    return c.json({ testimonials: publishedTestimonials });
  } catch (error) {
    console.log(`Error fetching testimonials: ${error}`);
    return c.json({ error: 'Error fetching testimonials' }, 500);
  }
});

// Get testimonial by ID
app.get("/testimonials/:id", async (c) => {
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

/*
═══════════════════════════════════════════════════════════════════
  RECOGNITION ROUTES
═══════════════════════════════════════════════════════════════════
*/

// Get all recognitions
app.get("/recognition", async (c) => {
  try {
    const allRecognitions = await recognitions.getAllRecognitions();
    return c.json({ recognitions: allRecognitions });
  } catch (error) {
    console.log(`Error fetching recognitions: ${error}`);
    return c.json({ error: 'Error fetching recognitions' }, 500);
  }
});

// Get recognition by ID
app.get("/recognition/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const recognition = await recognitions.getRecognitionById(id);
    
    if (!recognition) {
      return c.json({ error: 'Recognition not found' }, 404);
    }
    
    return c.json({ recognition });
  } catch (error) {
    console.log(`Error fetching recognition: ${error}`);
    return c.json({ error: 'Error fetching recognition' }, 500);
  }
});

/*
═══════════════════════════════════════════════════════════════════
  PARTNERSHIPS ROUTES
═══════════════════════════════════════════════════════════════════
*/

// Get all partnerships
app.get("/partnerships", async (c) => {
  try {
    const allPartnerships = await partnerships.getAllPartnerships();
    return c.json({ partnerships: allPartnerships });
  } catch (error) {
    console.log(`Error fetching partnerships: ${error}`);
    return c.json({ error: 'Error fetching partnerships' }, 500);
  }
});

// Get partnership by ID
app.get("/partnerships/:id", async (c) => {
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

/*
═══════════════════════════════════════════════════════════════════
  START SERVER
═══════════════════════════════════════════════════════════════════
*/

Deno.serve(app.fetch);
