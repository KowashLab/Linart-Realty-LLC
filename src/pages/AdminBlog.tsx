import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X, Eye, EyeOff, Calendar, User as UserIcon, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { AdminNav } from '../components/AdminNav';
import { SEO } from '../components/SEO';

/*
═══════════════════════════════════════════════════════════════════
  ADMIN BLOG - Content Management System
═══════════════════════════════════════════════════════════════════
  
  Luxury admin panel for blog management:
  - Create/edit/delete posts
  - Rich text editor
  - Publication management
  - Preview functionality
  
═══════════════════════════════════════════════════════════════════
*/

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  videoUrl?: string;
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

export default function AdminBlog() {
  const { user, session } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    videoUrl: '',
    category: 'Investment',
    type: 'article',
    published: false,
    seoTitle: '',
    seoDescription: '',
    seoKeywords: ''
  });

  useEffect(() => {
    if (session) {
      fetchPosts();
    }
  }, [session]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dcec270f/blog/admin/posts`,
        {
          headers: {
            'Authorization': `Bearer ${session?.access_token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dcec270f/blog/admin/posts`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session?.access_token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        }
      );

      if (response.ok) {
        setIsCreating(false);
        setFormData({
          title: '',
          excerpt: '',
          content: '',
          image: '',
          videoUrl: '',
          category: 'Investment',
          type: 'article',
          published: false
        });
        fetchPosts();
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleUpdate = async () => {
    if (!editingPost) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dcec270f/blog/admin/posts/${editingPost.id}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${session?.access_token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        }
      );

      if (response.ok) {
        setEditingPost(null);
        fetchPosts();
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dcec270f/blog/admin/posts/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${session?.access_token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
      videoUrl: post.videoUrl || '',
      category: post.category,
      type: post.type,
      published: post.published,
      seoTitle: post.seoTitle || '',
      seoDescription: post.seoDescription || '',
      seoKeywords: post.seoKeywords || ''
    });
  };

  const handleBackToDashboard = () => {
    if ((window as any).navigateTo) {
      (window as any).navigateTo('/');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0A0A0B] via-[#0F0F0F] to-[#0A0A0B] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-['Cinzel'] text-[#F2EEE7] text-3xl mb-4">Access Denied</h1>
          <p className="font-['Montserrat'] text-[#E5E4E2]/70 mb-8">Please log in to access the admin panel.</p>
          <button
            onClick={() => (window as any).navigateTo?.('/login')}
            className="px-6 py-3 border border-[#E5E4E2]/30 bg-[#0F0F0F]/50 text-[#E5E4E2] hover:border-[#A8A9AD]/60 transition-all duration-300"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Admin - Blog Management - Linart Realty LLC"
        description="Manage blog posts and content"
        keywords="admin, blog management"
      />

      <AdminNav />

      <div className="min-h-screen bg-gradient-to-b from-[#0A0A0B] via-[#0F0F0F] to-[#0A0A0B] pt-20">
        {/* Header */}
        <section className="relative pt-32 pb-12 border-b border-[#E5E4E2]/10">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={handleBackToDashboard}
                className="group inline-flex items-center gap-2 text-[#E5E4E2] hover:text-[#F2EEE7] transition-colors"
              >
                <ArrowLeft size={20} strokeWidth={1.5} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-['Montserrat'] uppercase text-sm tracking-wider">Back</span>
              </button>

              <button
                onClick={() => { setIsCreating(true); setEditingPost(null); }}
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#E5E4E2]/30 bg-[#0F0F0F]/50 hover:border-[#A8A9AD]/60 transition-all duration-300"
              >
                <Plus size={20} strokeWidth={1.5} className="text-[#E5E4E2]" />
                <span className="font-['Montserrat'] uppercase text-[#E5E4E2] text-sm tracking-wider">New Post</span>
              </button>
            </div>

            <h1 className="font-['Cinzel'] text-[#F2EEE7] text-5xl mb-4">Blog Management</h1>
            <p className="font-['Montserrat'] text-[#E5E4E2]/70">Manage your blog posts and content</p>
          </div>
        </section>

        {/* Editor/Creator Modal */}
        {(isCreating || editingPost) && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-[#0F0F0F] border border-[#E5E4E2]/20 max-w-4xl w-full my-8">
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-['Cinzel'] text-[#F2EEE7] text-3xl">
                    {editingPost ? 'Edit Post' : 'Create New Post'}
                  </h2>
                  <button
                    onClick={() => { setIsCreating(false); setEditingPost(null); }}
                    className="text-[#E5E4E2] hover:text-[#F2EEE7] transition-colors"
                  >
                    <X size={24} strokeWidth={1.5} />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block font-['Montserrat'] text-[#E5E4E2]/70 text-sm uppercase tracking-wider mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0A0A0B] border border-[#E5E4E2]/20 text-[#E5E4E2] font-['Montserrat'] focus:outline-none focus:border-[#A8A9AD]/60"
                      placeholder="Enter post title"
                    />
                  </div>

                  {/* Type & Category */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block font-['Montserrat'] text-[#E5E4E2]/70 text-sm uppercase tracking-wider mb-2">
                        Type *
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value as 'article' | 'video' })}
                        className="w-full px-4 py-3 bg-[#0A0A0B] border border-[#E5E4E2]/20 text-[#E5E4E2] font-['Montserrat'] focus:outline-none focus:border-[#A8A9AD]/60"
                      >
                        <option value="article">Article</option>
                        <option value="video">Video</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-['Montserrat'] text-[#E5E4E2]/70 text-sm uppercase tracking-wider mb-2">
                        Category *
                      </label>
                      <input
                        type="text"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-3 bg-[#0A0A0B] border border-[#E5E4E2]/20 text-[#E5E4E2] font-['Montserrat'] focus:outline-none focus:border-[#A8A9AD]/60"
                        placeholder="e.g., Investment, Architecture"
                      />
                    </div>
                  </div>

                  {/* Image URL */}
                  <div>
                    <label className="block font-['Montserrat'] text-[#E5E4E2]/70 text-sm uppercase tracking-wider mb-2">
                      Image URL *
                    </label>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0A0A0B] border border-[#E5E4E2]/20 text-[#E5E4E2] font-['Montserrat'] focus:outline-none focus:border-[#A8A9AD]/60"
                      placeholder="https://..."
                    />
                  </div>

                  {/* Video URL (if type is video) */}
                  {formData.type === 'video' && (
                    <div>
                      <label className="block font-['Montserrat'] text-[#E5E4E2]/70 text-sm uppercase tracking-wider mb-2">
                        Video Embed URL
                      </label>
                      <input
                        type="text"
                        value={formData.videoUrl}
                        onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                        className="w-full px-4 py-3 bg-[#0A0A0B] border border-[#E5E4E2]/20 text-[#E5E4E2] font-['Montserrat'] focus:outline-none focus:border-[#A8A9AD]/60"
                        placeholder="https://www.youtube.com/embed/..."
                      />
                    </div>
                  )}

                  {/* Excerpt */}
                  <div>
                    <label className="block font-['Montserrat'] text-[#E5E4E2]/70 text-sm uppercase tracking-wider mb-2">
                      Excerpt *
                    </label>
                    <textarea
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 bg-[#0A0A0B] border border-[#E5E4E2]/20 text-[#E5E4E2] font-['Montserrat'] focus:outline-none focus:border-[#A8A9AD]/60 resize-none"
                      placeholder="Brief description (2-3 sentences)"
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <label className="block font-['Montserrat'] text-[#E5E4E2]/70 text-sm uppercase tracking-wider mb-2">
                      Content (HTML) *
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={12}
                      className="w-full px-4 py-3 bg-[#0A0A0B] border border-[#E5E4E2]/20 text-[#E5E4E2] font-['Montserrat'] font-mono text-sm focus:outline-none focus:border-[#A8A9AD]/60 resize-none"
                      placeholder="<p>Your content here...</p>"
                    />
                  </div>

                  {/* SEO Fields */}
                  <div className="border-t border-[#E5E4E2]/10 pt-6">
                    <h3 className="font-['Cinzel'] text-[#F2EEE7] text-xl mb-4">SEO Settings</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block font-['Montserrat'] text-[#E5E4E2]/70 text-sm uppercase tracking-wider mb-2">
                          SEO Title
                        </label>
                        <input
                          type="text"
                          value={formData.seoTitle}
                          onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                          className="w-full px-4 py-3 bg-[#0A0A0B] border border-[#E5E4E2]/20 text-[#E5E4E2] font-['Montserrat'] focus:outline-none focus:border-[#A8A9AD]/60"
                          placeholder="Custom SEO title (optional)"
                        />
                      </div>

                      <div>
                        <label className="block font-['Montserrat'] text-[#E5E4E2]/70 text-sm uppercase tracking-wider mb-2">
                          SEO Description
                        </label>
                        <textarea
                          value={formData.seoDescription}
                          onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                          rows={2}
                          className="w-full px-4 py-3 bg-[#0A0A0B] border border-[#E5E4E2]/20 text-[#E5E4E2] font-['Montserrat'] focus:outline-none focus:border-[#A8A9AD]/60 resize-none"
                          placeholder="SEO meta description (optional)"
                        />
                      </div>

                      <div>
                        <label className="block font-['Montserrat'] text-[#E5E4E2]/70 text-sm uppercase tracking-wider mb-2">
                          SEO Keywords
                        </label>
                        <input
                          type="text"
                          value={formData.seoKeywords}
                          onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
                          className="w-full px-4 py-3 bg-[#0A0A0B] border border-[#E5E4E2]/20 text-[#E5E4E2] font-['Montserrat'] focus:outline-none focus:border-[#A8A9AD]/60"
                          placeholder="keyword1, keyword2, keyword3"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Published Toggle */}
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      id="published"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                      className="w-5 h-5 bg-[#0A0A0B] border border-[#E5E4E2]/20"
                    />
                    <label htmlFor="published" className="font-['Montserrat'] text-[#E5E4E2] cursor-pointer">
                      Publish immediately
                    </label>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-4">
                    <button
                      onClick={editingPost ? handleUpdate : handleCreate}
                      className="inline-flex items-center gap-2 px-8 py-3 border border-[#E5E4E2]/30 bg-[#E5E4E2] text-[#0A0A0B] hover:bg-[#F2EEE7] transition-all duration-300"
                    >
                      <Save size={18} strokeWidth={1.5} />
                      <span className="font-['Montserrat'] uppercase text-sm tracking-wider">
                        {editingPost ? 'Update' : 'Create'} Post
                      </span>
                    </button>

                    <button
                      onClick={() => { setIsCreating(false); setEditingPost(null); }}
                      className="inline-flex items-center gap-2 px-8 py-3 border border-[#E5E4E2]/20 text-[#E5E4E2] hover:border-[#E5E4E2]/40 transition-all duration-300"
                    >
                      <span className="font-['Montserrat'] uppercase text-sm tracking-wider">Cancel</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Posts List */}
        <section className="relative py-12">
          <div className="container-custom">
            {loading ? (
              <div className="text-center py-20">
                <p className="font-['Montserrat'] text-[#E5E4E2]/70">Loading posts...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-['Montserrat'] text-[#E5E4E2]/70 mb-4">No posts yet</p>
                <button
                  onClick={() => setIsCreating(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[#E5E4E2]/30 text-[#E5E4E2] hover:border-[#A8A9AD]/60 transition-all"
                >
                  <Plus size={18} />
                  <span className="font-['Montserrat'] uppercase text-sm tracking-wider">Create First Post</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-[#0F0F0F] border border-[#E5E4E2]/10 p-6 hover:border-[#E5E4E2]/30 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-['Cinzel'] text-[#F2EEE7] text-xl">{post.title}</h3>
                          {post.published ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 border border-green-500/30 text-green-400 text-xs">
                              <Eye size={12} />
                              Published
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-xs">
                              <EyeOff size={12} />
                              Draft
                            </span>
                          )}
                        </div>
                        <p className="font-['Montserrat'] text-[#E5E4E2]/60 text-sm mb-2">{post.excerpt}</p>
                        <div className="flex items-center gap-4 text-xs text-[#E5E4E2]/40 font-['Montserrat']">
                          <span>{post.type.toUpperCase()}</span>
                          <span>•</span>
                          <span>{post.category}</span>
                          <span>•</span>
                          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(post)}
                          className="p-2 border border-[#E5E4E2]/20 text-[#E5E4E2] hover:border-[#A8A9AD]/60 hover:text-[#F2EEE7] transition-all"
                        >
                          <Edit2 size={18} strokeWidth={1.5} />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="p-2 border border-[#E5E4E2]/20 text-[#E5E4E2] hover:border-red-500/60 hover:text-red-400 transition-all"
                        >
                          <Trash2 size={18} strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}