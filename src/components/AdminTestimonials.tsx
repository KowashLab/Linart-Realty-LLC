import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Edit2, Trash2, Save, X, Star, User, MapPin, Home, Eye } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { useAuth } from '../contexts/AuthContext';
import { AdminNav } from './AdminNav';

interface Testimonial {
  id: string;
  name: string;
  title: string;
  content: string;
  rating: number;
  image: string;
  location?: string;
  propertyType?: string;
  published: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export function AdminTestimonials() {
  const { user, getAccessToken } = useAuth();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Testimonial>>({
    name: '',
    title: '',
    content: '',
    rating: 5,
    image: '',
    location: '',
    propertyType: '',
    published: false,
    featured: false
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dcec270f/testimonials`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (!response.ok) throw new Error('Failed to fetch testimonials');
      const data = await response.json();
      setTestimonials(data.testimonials || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = await getAccessToken();
      if (!token) {
        alert('Please login to manage testimonials');
        return;
      }

      const url = editingId
        ? `https://${projectId}.supabase.co/functions/v1/make-server-dcec270f/testimonials/admin/${editingId}`
        : `https://${projectId}.supabase.co/functions/v1/make-server-dcec270f/testimonials/admin`;

      const response = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to save testimonial');

      await fetchTestimonials();
      resetForm();
      alert(editingId ? 'Testimonial updated!' : 'Testimonial created!');
    } catch (error) {
      console.error('Error saving testimonial:', error);
      alert('Error saving testimonial');
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setFormData(testimonial);
    setEditingId(testimonial.id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const token = await getAccessToken();
      if (!token) return;

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dcec270f/testimonials/admin/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) throw new Error('Failed to delete testimonial');

      await fetchTestimonials();
      alert('Testimonial deleted!');
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      alert('Error deleting testimonial');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      title: '',
      content: '',
      rating: 5,
      image: '',
      location: '',
      propertyType: '',
      published: false,
      featured: false
    });
    setEditingId(null);
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-neutral-400 mb-4">Please login to access admin panel</h1>
          <a href="/login" className="text-neutral-300 hover:text-white transition-colors">Go to Login</a>
        </div>
      </div>
    );
  }

  return (
    <>
      <AdminNav />
      <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center"
          >
            <h1 className="text-neutral-100 mb-4 font-['Cinzel']">Testimonials Management</h1>
            <p className="text-neutral-400">Manage client reviews and testimonials</p>
          </motion.div>

          {/* Create/Edit Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-16 bg-gradient-to-br from-neutral-900/50 to-neutral-800/30 backdrop-blur-sm border border-neutral-700/50 rounded-lg p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-neutral-100 font-['Cinzel']">
                {editingId ? 'Edit Testimonial' : 'Create New Testimonial'}
              </h2>
              {isEditing && (
                <button
                  onClick={resetForm}
                  className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-neutral-300 mb-2">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-neutral-500 transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 mb-2">Title/Position *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-neutral-500 transition-colors"
                    placeholder="CEO, Tech Company"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 mb-2">Image URL *</label>
                  <input
                    type="url"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-neutral-500 transition-colors"
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 mb-2">Rating *</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-neutral-500 transition-colors"
                  >
                    {[5, 4, 3, 2, 1].map(rating => (
                      <option key={rating} value={rating}>
                        {rating} Star{rating !== 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-neutral-500 transition-colors"
                    placeholder="Miami Beach, FL"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 mb-2">Property Type</label>
                  <input
                    type="text"
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-neutral-500 transition-colors"
                    placeholder="Luxury Villa"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 mb-2">Testimonial Content *</label>
                <textarea
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={5}
                  className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-neutral-500 transition-colors resize-none"
                  placeholder="Share your experience working with Linart Realty..."
                />
              </div>

              {/* Checkboxes */}
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-5 h-5 bg-neutral-900 border-neutral-700 rounded"
                  />
                  <span className="text-neutral-300">Published</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-5 h-5 bg-neutral-900 border-neutral-700 rounded"
                  />
                  <span className="text-neutral-300">Featured (Show on Homepage)</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-neutral-100 to-neutral-300 hover:from-white hover:to-neutral-200 text-neutral-900 rounded-lg transition-all"
              >
                <Save className="w-5 h-5" />
                {editingId ? 'Update Testimonial' : 'Create Testimonial'}
              </button>
            </form>
          </motion.div>

          {/* Testimonials List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-neutral-100 mb-8 font-['Cinzel']">All Testimonials ({testimonials.length})</h2>

            {loading ? (
              <div className="text-center text-neutral-400 py-12">Loading testimonials...</div>
            ) : testimonials.length === 0 ? (
              <div className="text-center text-neutral-400 py-12">No testimonials yet. Create your first one!</div>
            ) : (
              <div className="grid gap-6">
                {testimonials.map((testimonial) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-neutral-900/50 to-neutral-800/30 backdrop-blur-sm border border-neutral-700/50 rounded-lg p-6 hover:border-neutral-600/50 transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Image */}
                      <div className="lg:w-24 h-24 rounded-full overflow-hidden bg-neutral-800 flex-shrink-0">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-neutral-100 mb-1">{testimonial.name}</h3>
                            <p className="text-neutral-400 text-sm mb-2">{testimonial.title}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < testimonial.rating ? 'fill-yellow-500 text-yellow-500' : 'text-neutral-600'
                                    }`}
                                  />
                                ))}
                              </div>
                              {testimonial.published && (
                                <span className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm flex items-center gap-1">
                                  <Eye className="w-3 h-3" />
                                  Published
                                </span>
                              )}
                              {testimonial.featured && (
                                <span className="px-3 py-1 bg-purple-900/30 text-purple-400 rounded-full text-sm">Featured</span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(testimonial)}
                              className="p-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(testimonial.id)}
                              className="p-2 bg-red-900/20 hover:bg-red-900/30 text-red-400 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {(testimonial.location || testimonial.propertyType) && (
                          <div className="flex gap-4 mb-3">
                            {testimonial.location && (
                              <div className="flex items-center gap-2 text-neutral-400 text-sm">
                                <MapPin className="w-4 h-4" />
                                {testimonial.location}
                              </div>
                            )}
                            {testimonial.propertyType && (
                              <div className="flex items-center gap-2 text-neutral-400 text-sm">
                                <Home className="w-4 h-4" />
                                {testimonial.propertyType}
                              </div>
                            )}
                          </div>
                        )}

                        <p className="text-neutral-300 italic">"{testimonial.content}"</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}