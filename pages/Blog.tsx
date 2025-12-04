import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Play, Image as ImageIcon } from 'lucide-react';
import { SEO } from '../components/SEO';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { fetchBlogPosts } from '../utils/api/client';

/*
═══════════════════════════════════════════════════════════════════
  BLOG - Ultra-Premium Royal Content Hub
  - Data loaded directly from KV store
═══════════════════════════════════════════════════════════════════
*/

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  videoUrl?: string;
  category: string;
  type: 'article' | 'video';
  createdAt: string;
}

export default function Blog() {
  const [blogPosts, setBlogPosts] = React.useState<BlogPost[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await fetchBlogPosts();
      
      // Show only published posts
      const publishedPosts = data.filter((p: any) => p.published !== false);
      setBlogPosts(publishedPosts);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setBlogPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePostClick = (slug: string) => {
    if ((window as any).navigateTo) {
      (window as any).navigateTo(`/blog/${slug}`);
    }
  };

  return (
    <>
      <SEO 
        title="Blog - Linart Realty LLC"
        description="Explore luxury real estate insights, market trends, architectural masterpieces, and exclusive property tours. Stay informed with expert articles and drone footage from Linart Realty LLC."
        keywords="luxury real estate blog, property investment insights, architectural trends, drone property tours, premium real estate news, market analysis, luxury lifestyle"
        canonicalUrl="https://linartrealty.com/blog"
      />

      <div className="min-h-screen bg-gradient-to-b from-[#0A0A0B] via-[#0F0F0F] to-[#0A0A0B]">
        
        {/* Hero Section */}
        <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-32 overflow-hidden">
          {/* Decorative Background Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(168, 169, 173, 0.05) 60px, rgba(168, 169, 173, 0.05) 62px)'
            }}
          />

          {/* Radial Gradient Spotlight */}
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at top, rgba(229, 228, 226, 0.15), transparent 70%)',
            }}
          />

          <div className="container-custom relative z-10">
            {/* Section Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex justify-center mb-8"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 border border-[#E5E4E2]/20 bg-[#0F0F0F]/50 backdrop-blur-sm">
                <div className="w-2 h-2 bg-[#E5E4E2] opacity-60" />
                <span 
                  className="font-['Montserrat'] uppercase text-[#E5E4E2]/70"
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    letterSpacing: '0.3em'
                  }}
                >
                  Insights & Stories
                </span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-['Cinzel'] text-[#F2EEE7] text-center mb-8"
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: '0.02em'
              }}
            >
              The Linart Journal
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-['Montserrat'] text-[#E5E4E2]/70 text-center max-w-3xl mx-auto mb-16"
              style={{
                fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
                fontWeight: 400,
                lineHeight: 1.8,
                letterSpacing: '0.03em'
              }}
            >
              Explore exclusive insights into luxury real estate, architectural innovations, 
              market trends, and breathtaking property tours captured from unique perspectives.
            </motion.p>

            {/* Decorative Divider */}
            <motion.div 
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-px max-w-xs mx-auto mb-20"
              style={{
                background: 'linear-gradient(90deg, transparent, #E5E4E2, transparent)',
              }}
            />
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="relative py-20 lg:py-32">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="group relative h-full"
                >
                  {/* Card Container - FLEX COLUMN for height alignment */}
                  <div className="relative h-full flex flex-col overflow-hidden bg-[#0F0F0F] border border-[#E5E4E2]/15 hover:border-[#A8A9AD]/40 transition-all duration-700">
                    
                    {/* Image Container - Fixed height */}
                    <div className="relative h-64 flex-shrink-0 overflow-hidden">
                      <ImageWithFallback
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                      />
                      
                      {/* Type Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0F0F0F]/90 backdrop-blur-sm border border-[#E5E4E2]/30">
                          {post.type === 'video' ? (
                            <Play size={14} className="text-[#E5E4E2]" strokeWidth={1.5} />
                          ) : (
                            <ImageIcon size={14} className="text-[#E5E4E2]" strokeWidth={1.5} />
                          )}
                          <span 
                            className="font-['Montserrat'] uppercase text-[#E5E4E2]"
                            style={{
                              fontSize: '0.6rem',
                              fontWeight: 600,
                              letterSpacing: '0.15em'
                            }}
                          >
                            {post.type}
                          </span>
                        </div>
                      </div>

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent opacity-60" />
                    </div>

                    {/* Content - Flex grow for filling remaining space */}
                    <div className="p-8 flex flex-col flex-grow">
                      {/* Category & Date */}
                      <div className="flex items-center gap-4 mb-4">
                        <span 
                          className="font-['Montserrat'] uppercase text-[#A8A9AD]"
                          style={{
                            fontSize: '0.65rem',
                            fontWeight: 600,
                            letterSpacing: '0.15em'
                          }}
                        >
                          {post.category}
                        </span>
                        <div className="w-px h-3 bg-[#E5E4E2]/20" />
                        <div className="flex items-center gap-2 text-[#E5E4E2]/50">
                          <Calendar size={12} strokeWidth={1.5} />
                          <span 
                            className="font-['Montserrat']"
                            style={{
                              fontSize: '0.65rem',
                              fontWeight: 400,
                              letterSpacing: '0.05em'
                            }}
                          >
                            {post.createdAt}
                          </span>
                        </div>
                      </div>

                      {/* Title - Fixed height (3 lines) */}
                      <h3 
                        className="font-['Cinzel'] text-[#F2EEE7] mb-4 group-hover:text-[#E5E4E2] transition-colors duration-500"
                        style={{
                          fontSize: '1.4rem',
                          fontWeight: 600,
                          lineHeight: 1.35,
                          letterSpacing: '0.01em',
                          minHeight: '3.78rem', // 1.4rem * 1.35 * 2 lines
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {post.title}
                      </h3>

                      {/* Excerpt - Fixed height (3 lines) */}
                      <p 
                        className="font-['Montserrat'] text-[#E5E4E2]/60 mb-6 flex-grow"
                        style={{
                          fontSize: '0.9rem',
                          fontWeight: 400,
                          lineHeight: 1.7,
                          letterSpacing: '0.02em',
                          minHeight: '4.59rem', // 0.9rem * 1.7 * 3 lines
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {post.excerpt}
                      </p>

                      {/* Read More Link - Always at the bottom */}
                      <div className="mt-auto">
                        <button 
                          onClick={() => handlePostClick(post.slug)}
                          className="group/btn inline-flex items-center gap-2 text-[#E5E4E2] hover:text-[#F2EEE7] transition-colors duration-300"
                        >
                          <span 
                            className="font-['Montserrat'] uppercase"
                            style={{
                              fontSize: '0.7rem',
                              fontWeight: 600,
                              letterSpacing: '0.15em'
                            }}
                          >
                            {post.type === 'video' ? 'Watch Now' : 'Read More'}
                          </span>
                          <ArrowRight 
                            size={16} 
                            strokeWidth={1.5}
                            className="group-hover/btn:translate-x-1 transition-transform duration-300"
                          />
                        </button>
                      </div>
                    </div>

                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#E5E4E2] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#E5E4E2] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="relative py-20 lg:py-32">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative max-w-4xl mx-auto text-center"
            >
              {/* Decorative Border */}
              <div className="absolute inset-0 border-2 border-[#E5E4E2]/10" />
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#E5E4E2]" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#E5E4E2]" />

              <div className="relative py-20 px-8">
                <h2 
                  className="font-['Cinzel'] text-[#F2EEE7] mb-6"
                  style={{
                    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                    fontWeight: 600,
                    letterSpacing: '0.02em'
                  }}
                >
                  More Stories Coming Soon
                </h2>
                <p 
                  className="font-['Montserrat'] text-[#E5E4E2]/60 max-w-2xl mx-auto"
                  style={{
                    fontSize: '1rem',
                    fontWeight: 400,
                    lineHeight: 1.8,
                    letterSpacing: '0.03em'
                  }}
                >
                  We're constantly curating new content including in-depth market analyses, 
                  exclusive drone footage of premium properties, and expert insights from 
                  industry leaders. Stay tuned for more.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
}