import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, Play } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { SEO } from '../components/SEO';
import { fetchBlogPosts } from '../utils/api/client';

export default function BlogPost({ slug }: { slug: string }) {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchPost(slug);
    }
  }, [slug]);

  const fetchPost = async (postSlug: string) => {
    try {
      setLoading(true);
      const posts = await fetchBlogPosts();
      
      // Find post by slug
      const foundPost = posts.find((p: any) => p.slug === postSlug);
      
      if (foundPost) {
        setPost(foundPost);
      } else {
        console.error('Blog post not found:', postSlug);
        setPost(null);
      }
    } catch (error) {
      console.error('Error fetching blog post:', error);
      setPost(null);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToBlog = () => {
    if ((window as any).navigateTo) {
      (window as any).navigateTo('/blog');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0A0A0B] via-[#0F0F0F] to-[#0A0A0B] flex items-center justify-center">
        <div className="text-[#E5E4E2] font-['Montserrat']">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0A0A0B] via-[#0F0F0F] to-[#0A0A0B] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-[#F2EEE7] font-['Cinzel'] text-3xl mb-4">Post Not Found</h1>
          <button 
            onClick={handleBackToBlog}
            className="text-[#E5E4E2] hover:text-[#F2EEE7] transition-colors font-['Montserrat']"
          >
            ← Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={post.seoTitle || `${post.title} - Linart Realty LLC`}
        description={post.seoDescription || post.excerpt}
        keywords={post.seoKeywords || `${post.category}, luxury real estate, linart realty`}
        canonicalUrl={`https://linartrealty.com/blog/${post.slug}`}
      />

      <div className="min-h-screen bg-gradient-to-b from-[#0A0A0B] via-[#0F0F0F] to-[#0A0A0B]">
        
        {/* Hero Section with Featured Image */}
        <section className="relative pt-32 lg:pt-40 pb-12 overflow-hidden">
          {/* Back Button */}
          <div className="container-custom relative z-10 mb-8">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onClick={handleBackToBlog}
              className="group inline-flex items-center gap-2 text-[#E5E4E2] hover:text-[#F2EEE7] transition-colors duration-300"
            >
              <ArrowLeft 
                size={20} 
                strokeWidth={1.5}
                className="group-hover:-translate-x-1 transition-transform duration-300"
              />
              <span 
                className="font-['Montserrat'] uppercase"
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.15em'
                }}
              >
                Back to Blog
              </span>
            </motion.button>
          </div>

          {/* Category Badge */}
          <div className="container-custom relative z-10 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-3 px-4 py-2 border border-[#E5E4E2]/30 bg-[#0F0F0F]/50 backdrop-blur-sm"
            >
              <div className="w-2 h-2 bg-[#E5E4E2] opacity-60" />
              <span 
                className="font-['Montserrat'] uppercase text-[#E5E4E2]/70"
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  letterSpacing: '0.25em'
                }}
              >
                {post.category}
              </span>
            </motion.div>
          </div>

          {/* Title */}
          <div className="container-custom relative z-10 mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-['Cinzel'] text-[#F2EEE7] max-w-4xl"
              style={{
                fontSize: 'clamp(2rem, 6vw, 4rem)',
                fontWeight: 600,
                lineHeight: 1.15,
                letterSpacing: '0.01em'
              }}
            >
              {post.title}
            </motion.h1>
          </div>

          {/* Meta Info */}
          <div className="container-custom relative z-10 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-6 text-[#E5E4E2]/60"
            >
              {post.author && (
                <>
                  <div className="flex items-center gap-2">
                    <User size={16} strokeWidth={1.5} />
                    <span 
                      className="font-['Montserrat']"
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 400,
                        letterSpacing: '0.03em'
                      }}
                    >
                      {post.author}
                    </span>
                  </div>
                  <div className="w-px h-4 bg-[#E5E4E2]/20" />
                </>
              )}
              <div className="flex items-center gap-2">
                <Calendar size={16} strokeWidth={1.5} />
                <span 
                  className="font-['Montserrat']"
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 400,
                    letterSpacing: '0.03em'
                  }}
                >
                  {new Date(post.createdAt).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Featured Image or Video */}
          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative overflow-hidden border border-[#E5E4E2]/20"
            >
              {post.type === 'video' && post.videoUrl ? (
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src={post.videoUrl}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="relative h-[400px] lg:h-[600px]">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/50 via-transparent to-transparent" />
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Article Content */}
        <section className="relative py-16 lg:py-24">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="prose prose-invert prose-lg max-w-none"
                style={{
                  color: '#E5E4E2',
                  fontFamily: 'Montserrat',
                  fontSize: '1.05rem',
                  lineHeight: 1.8,
                  letterSpacing: '0.02em'
                }}
              >
                {/* Render HTML content */}
                <div 
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  className="blog-content"
                />
              </motion.div>

              {/* Divider */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="h-px max-w-xs mx-auto my-16"
                style={{
                  background: 'linear-gradient(90deg, transparent, #E5E4E2, transparent)',
                }}
              />

              {/* Back to Blog CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-center"
              >
                <button
                  onClick={handleBackToBlog}
                  className="group inline-flex items-center gap-3 px-8 py-4 border border-[#E5E4E2]/30 bg-[#0F0F0F]/50 hover:border-[#A8A9AD]/60 hover:bg-[#0F0F0F]/80 transition-all duration-500"
                >
                  <ArrowLeft 
                    size={20} 
                    strokeWidth={1.5}
                    className="text-[#E5E4E2] group-hover:-translate-x-1 transition-transform duration-300"
                  />
                  <span 
                    className="font-['Montserrat'] uppercase text-[#E5E4E2] group-hover:text-[#F2EEE7] transition-colors duration-300"
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      letterSpacing: '0.15em'
                    }}
                  >
                    Back to All Articles
                  </span>
                </button>
              </motion.div>
            </div>
          </div>
        </section>

      </div>

      {/* Custom styles for blog content */}
      <style>{`
        .blog-content h2 {
          color: #F2EEE7;
          font-family: 'Cinzel', serif;
          font-size: 2rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
        }
        
        .blog-content h3 {
          color: #E5E4E2;
          font-family: 'Cinzel', serif;
          font-size: 1.5rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          margin-top: 2.5rem;
          margin-bottom: 1.25rem;
        }
        
        .blog-content p {
          color: #E5E4E2;
          opacity: 0.85;
          margin-bottom: 1.5rem;
        }
        
        .blog-content ul, .blog-content ol {
          margin-left: 1.5rem;
          margin-bottom: 1.5rem;
        }
        
        .blog-content li {
          color: #E5E4E2;
          opacity: 0.85;
          margin-bottom: 0.75rem;
          padding-left: 0.5rem;
        }
        
        .blog-content a {
          color: #A8A9AD;
          text-decoration: underline;
          transition: color 0.3s;
        }
        
        .blog-content a:hover {
          color: #F2EEE7;
        }
      `}</style>
    </>
  );
}