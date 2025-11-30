import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X, Building2, Link as LinkIcon, Globe, Eye, EyeOff } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { useAuth } from '../contexts/AuthContext';
import { AdminNav } from './AdminNav';

interface Partnership {
  id: string;
  name: string;
  description: string;
  logo: string;
  website?: string;
  category: string;
  published: boolean;
  featured: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

const CATEGORY_OPTIONS = [
  'Financial',
  'Legal',
  'Technology',
  'Design',
  'Media',
  'Real Estate Network',
  'Luxury Services',
  'Hospitality',
  'Luxury Brand'
];

export function AdminPartnerships() {
  const { user, getAccessToken } = useAuth();
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Partnership>>({
    name: '',
    description: '',
    logo: '',
    website: '',
    category: 'Financial',
    published: false,
    featured: false,
    displayOrder: 1
  });

  useEffect(() => {
    fetchPartnerships();
  }, []);

  const fetchPartnerships = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dcec270f/server/partnerships`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (!response.ok) throw new Error('Failed to fetch partnerships');
      const data = await response.json();
      setPartnerships(data.partnerships || []);
    } catch (error) {
      console.error('Error fetching partnerships:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = await getAccessToken();
      if (!token) {
        alert('Please login to manage partnerships');
        return;
      }

      const url = editingId
        ? `https://${projectId}.supabase.co/functions/v1/make-server-dcec270f/server/partnerships/admin/${editingId}`
        : `https://${projectId}.supabase.co/functions/v1/make-server-dcec270f/server/partnerships/admin`;

      const response = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to save partnership');

      await fetchPartnerships();
      resetForm();
      alert(editingId ? 'Partnership updated!' : 'Partnership created!');
    } catch (error) {
      console.error('Error saving partnership:', error);
      alert('Error saving partnership');
    }
  };

  const handleEdit = (partnership: Partnership) => {
    setFormData(partnership);
    setEditingId(partnership.id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this partnership?')) return;

    try {
      const token = await getAccessToken();
      if (!token) return;

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dcec270f/server/partnerships/admin/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) throw new Error('Failed to delete partnership');

      await fetchPartnerships();
      alert('Partnership deleted!');
    } catch (error) {
      console.error('Error deleting partnership:', error);
      alert('Error deleting partnership');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      logo: '',
      website: '',
      category: 'Financial',
      published: false,
      featured: false,
      displayOrder: 1
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
            <h1 className="text-neutral-100 mb-4 font-['Cinzel']">Partnerships Management</h1>
            <p className="text-neutral-400">Manage strategic partners and collaborations</p>
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
                {editingId ? 'Edit Partnership' : 'Create New Partnership'}
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
                  <label className="block text-neutral-300 mb-2">Partner Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-neutral-500 transition-colors"
                    placeholder="Goldman Sachs Private Wealth"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-neutral-500 transition-colors"
                  >
                    {CATEGORY_OPTIONS.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 mb-2">Logo URL *</label>
                  <input
                    type="url"
                    required
                    value={formData.logo}
                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                    className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-neutral-500 transition-colors"
                    placeholder="https://example.com/logo.png"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 mb-2">Website URL</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-neutral-500 transition-colors"
                    placeholder="https://partner-website.com"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-neutral-300 mb-2">Display Order *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: Number(e.target.value) })}
                    className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-neutral-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 mb-2">Description *</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-neutral-500 transition-colors resize-none"
                  placeholder="Describe the partnership and collaboration..."
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
                  <span className="text-neutral-300">Featured</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-neutral-100 to-neutral-300 hover:from-white hover:to-neutral-200 text-neutral-900 rounded-lg transition-all"
              >
                <Save className="w-5 h-5" />
                {editingId ? 'Update Partnership' : 'Create Partnership'}
              </button>
            </form>
          </motion.div>

          {/* Partnerships List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-neutral-100 mb-8 font-['Cinzel']">All Partnerships ({partnerships.length})</h2>

            {loading ? (
              <div className="text-center text-neutral-400 py-12">Loading partnerships...</div>
            ) : partnerships.length === 0 ? (
              <div className="text-center text-neutral-400 py-12">No partnerships yet. Create your first one!</div>
            ) : (
              <div className="grid gap-6">
                {partnerships.map((partnership) => (
                  <motion.div
                    key={partnership.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-neutral-900/50 to-neutral-800/30 backdrop-blur-sm border border-neutral-700/50 rounded-lg p-6 hover:border-neutral-600/50 transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Logo */}
                      <div className="lg:w-32 h-32 rounded-lg overflow-hidden bg-neutral-800/50 flex items-center justify-center p-4 flex-shrink-0">
                        <img
                          src={partnership.logo}
                          alt={partnership.name}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-neutral-100">{partnership.name}</h3>
                              <span className="px-2 py-1 bg-neutral-800 text-neutral-400 rounded text-sm">
                                #{partnership.displayOrder}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-3">
                              <span className="px-3 py-1 bg-neutral-800 text-neutral-400 rounded-full text-sm">
                                {partnership.category}
                              </span>
                              {partnership.published && (
                                <span className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm flex items-center gap-1">
                                  <Eye className="w-3 h-3" />
                                  Published
                                </span>
                              )}
                              {partnership.featured && (
                                <span className="px-3 py-1 bg-purple-900/30 text-purple-400 rounded-full text-sm">Featured</span>
                              )}
                            </div>
                            {partnership.website && (
                              <a
                                href={partnership.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-neutral-400 hover:text-neutral-300 text-sm mb-3 transition-colors"
                              >
                                <LinkIcon className="w-4 h-4" />
                                {partnership.website}
                              </a>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(partnership)}
                              className="p-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(partnership.id)}
                              className="p-2 bg-red-900/20 hover:bg-red-900/30 text-red-400 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <p className="text-neutral-300">{partnership.description}</p>
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