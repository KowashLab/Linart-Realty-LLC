# 👑 Linart Realty LLC

> Ultra-premium luxury real estate platform with royal Lion/King aesthetic and platinum shimmer gradients

![License](https://img.shields.io/badge/license-UNLICENSED-red.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.3.1-blue.svg)

## 🌟 Overview

Linart Realty LLC is a fully responsive, ultra-premium luxury real estate website featuring:

- **Royal Lion/King Aesthetic** - Monochromatic gray-platinum color palette with shimmer gradient effects
- **Premium Typography** - Elite fonts: Cinzel (headings) and Montserrat (body)
- **Dramatic Contrast** - High vertical spacing, architectural magazine feel
- **Premium Animations** - Motion/React powered smooth transitions
- **Full Authentication** - Supabase-powered auth system with user profiles
- **CMS System** - Admin panels for managing all content (Blog, Properties, Testimonials, Recognition, Partnerships)
- **SEO Optimized** - Full meta tags, sitemap, robots.txt, structured data

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first styling
- **Motion/React** - Premium animations
- **React Helmet Async** - SEO management

### Backend & Database
- **Supabase** - Authentication, database, storage
- **Hono** - Edge functions server
- **Key-Value Store** - Custom KV table for flexible data storage

### Deployment
- **Vercel** - Production hosting
- **Git** - Version control

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- Supabase account ([Get one free](https://supabase.com))
- Vercel account ([Get one free](https://vercel.com))
- Git installed

## 🛠️ Local Development Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd linart-realty-llc
```

### 2. Install dependencies
```bash
npm install
```

### 3. Supabase Configuration
This project uses hardcoded Supabase credentials in `/utils/supabase/info.tsx`.
**No environment variables needed for frontend!**

The file already contains:
```typescript
export const projectId = "cobpfldkzfrxapsomwrc"
export const publicAnonKey = "eyJhbGci..."
```

### 4. Add images to `/public/images/`
Place your project images in the `/public/images/` directory:
- logo.png
- hero-luxury-estate.jpg
- property images
- blog post images
- etc.

### 5. Start development server
```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

## 🚢 Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel will auto-detect Vite configuration

3. **Environment Variables (OPTIONAL):**
   - Frontend credentials are already hardcoded in `/utils/supabase/info.tsx`
   - **No VITE_* variables needed!**
   - Only add these if you're using Edge Functions backend:
     ```
     SUPABASE_URL=https://cobpfldkzfrxapsomwrc.supabase.co
     SUPABASE_ANON_KEY=your_anon_key
     SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
     SUPABASE_DB_URL=your_database_url
     ```

4. **Deploy:**
   - Click "Deploy"
   - Vercel will automatically build and deploy
   - Get your live URL: `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Automatic Deployments

After initial setup, every push to your repository will automatically trigger a new deployment on Vercel:
- `main` branch → Production deployment
- Other branches → Preview deployments

## 📁 Project Structure

```
linart-realty-llc/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── figma/          # Figma integration components
│   ├── Admin*.tsx      # CMS admin panels
│   ├── Navbar.tsx      # Navigation
│   ├── Footer.tsx      # Footer
│   └── ...
├── pages/              # Page components
│   ├── HomePage.tsx
│   ├── PropertiesPage.tsx
│   ├── BlogPost.tsx
│   └── ...
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state
├── utils/              # Utility functions
│   └── supabase/       # Supabase client & config
├── supabase/           # Supabase edge functions
│   └── functions/
│       └── server/     # Backend API routes
├── styles/             # Global styles
│   └── globals.css     # Tailwind + custom CSS
├── public/             # Static assets
│   ├── images/         # Image assets
│   ├── robots.txt      # SEO
│   └── sitemap.xml     # SEO
├── .env.example        # Environment variables template
├── .gitignore          # Git ignore rules
├── .vercelignore       # Vercel ignore rules
├── vercel.json         # Vercel configuration
└── package.json        # Dependencies
```

## 🎨 Design System

### Colors
- **Background:** `#0A0A0B` (Deep black)
- **Platinum:** `#E5E4E2` (Primary accent)
- **Gray:** `#A8A9AD` (Secondary accent)
- **Cream:** `#F2EEE7` (Hover states)

### Typography
- **Headings:** Cinzel (serif, royal)
- **Body:** Montserrat (sans-serif, modern)
- **Letter spacing:** Wide (0.15em - 0.3em)

### Spacing
- Large vertical spacing (12-32 units)
- Generous padding (8-16 units)
- Dramatic section breaks

## 🔐 Authentication

The platform includes a full authentication system:
- User registration
- Login/logout
- Protected routes
- User profiles
- Admin panels (for authorized users)

Admin access is controlled via the `is_admin` flag in user metadata.

## 📝 CMS System

Content management panels for:
- **Blog Posts** - Full CRUD operations
- **Properties** - Property listings management
- **Testimonials** - Client testimonials
- **Global Recognition** - Awards and recognition
- **Strategic Partnerships** - Partner organizations

Access admin panels at `/admin/*` routes (requires admin privileges).

## 🔍 SEO Features

- Meta tags (title, description, OG, Twitter)
- Canonical URLs
- Structured data (JSON-LD)
- Sitemap.xml
- Robots.txt
- Optimized images
- Fast page loads

See `SEO_CHECKLIST.md` and `SEO_SETUP_GUIDE.md` for details.

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## 🤝 Git Workflow

### Daily workflow:
```bash
# Make changes to your code
git add .
git commit -m "Description of changes"
git push origin main

# Vercel will automatically deploy!
```

### Working with branches:
```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes, commit
git add .
git commit -m "Add new feature"
git push origin feature/new-feature

# Merge to main via pull request
# Or merge locally:
git checkout main
git merge feature/new-feature
git push origin main
```

## 🐛 Troubleshooting

### Build fails on Vercel
- Check environment variables are set correctly
- Ensure Node version >= 18.0.0
- Check build logs in Vercel dashboard

### Images not loading
- Ensure images are in `/public/images/`
- Check image paths are correct (no leading slash in imports)
- Verify images are pushed to Git

### Supabase connection issues
- Verify environment variables are correct
- Check Supabase project is active
- Confirm API keys are valid

## 📄 License

UNLICENSED - Proprietary software for Linart Realty LLC

## 📧 Support

For questions or issues, contact Linart Realty LLC.

---

Built with 👑 for luxury real estate excellence