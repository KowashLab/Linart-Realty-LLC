import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X, Award, Calendar, Eye, EyeOff, Image as ImageIcon } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { useAuth } from '../contexts/AuthContext';
import { AdminNav } from './AdminNav';

interface Recognition {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  icon: string;
  category: string;
  published: boolean;
  featured: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

const ICON_OPTIONS = ['Award', 'Calendar', 'Eye', 'EyeOff', 'ImageIcon'];
const CATEGORY_OPTIONS = ['Industry Award', 'Certification', 'Recognition', 'Achievement'];

export function AdminRecognition() {
  const { user, getAccessToken } = useAuth();
  const [recognitions, setRecognitions] = useState<Recognition[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Recognition>>({
    title: '',
    organization: '',
    year: new Date().getFullYear().toString(),
    description: '',
    icon: 'Award',
    category: 'Industry Award',
    published: false,
    featured: false,
    displayOrder: 1
  });

  useEffect(() => {
    fetchRecognitions();
  }, []);

  const fetchRecognitions = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/server/recognition`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (!response.ok) throw new Error('Failed to fetch recognitions');
      const data = await response.json();
      setRecognitions(data.recognitions || []);
    } catch (error) {
      console.error('Error fetching recognitions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = await getAccessToken();
      if (!token) {
        alert('Please login to manage recognitions');
        return;
      }

      const url = editingId
        ? `https://${projectId}.supabase.co/functions/v1/server/recognition/admin/${editingId}`
        : `https://${projectId}.supabase.co/functions/v1/server/recognition/admin`;

      const response = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to save recognition');

      await fetchRecognitions();
      resetForm();
      alert(editingId ? 'Recognition updated!' : 'Recognition created!');
    } catch (error) {
      console.error('Error saving recognition:', error);
      alert('Error saving recognition');
    }
  };

  const handleEdit = (recognition: Recognition) => {
    setFormData(recognition);
    setEditingId(recognition.id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this recognition?')) return;

    try {
      const token = await getAccessToken();
      if (!token) return;

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/server/recognition/admin/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) throw new Error('Failed to delete recognition');

      await fetchRecognitions();
      alert('Recognition deleted!');
    } catch (error) {
      console.error('Error deleting recognition:', error);
      alert('Error deleting recognition');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      organization: '',
      year: new Date().getFullYear().toString(),
      description: '',
      icon: 'Award',
      category: 'Industry Award',
      published: false,
      featured: false,
      displayOrder: 1
    });
    setEditingId(null);
    setIsEditing(false);
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Calendar': return Calendar;
      case 'Eye': return Eye;
      case 'EyeOff': return EyeOff;
      case 'ImageIcon': return ImageIcon;
      default: return Award;
    }
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
            <h1 className="text-neutral-100 mb-4 font-['Cinzel']">Recognition Management</h1>
            <p className="text-neutral-400">Manage awards, certifications and achievements</p>
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
                {editingId ? 'Edit Recognition' : 'Create New Recognition'}
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
                  <label className="block text-neutral-300 mb-2">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-neutral-500 transition-colors"
                    placeholder="Top Luxury Agency"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 mb-2">Organization *</label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-neutral-500 transition-colors"
                    placeholder="Forbes Real Estate Council"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 mb-2">Year *</label>
                  <input
                    type="text"
                    required
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-neutral-500 transition-colors"
                    placeholder="2025"
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
                  <label className="block text-neutral-300 mb-2">Icon *</label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-neutral-500 transition-colors"
                  >
                    {ICON_OPTIONS.map(icon => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>

                <div>
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
                  placeholder="Describe the recognition or award..."
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
                {editingId ? 'Update Recognition' : 'Create Recognition'}
              </button>
            </form>
          </motion.div>

          {/* Recognitions List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-neutral-100 mb-8 font-['Cinzel']">All Recognitions ({recognitions.length})</h2>

            {loading ? (
              <div className="text-center text-neutral-400 py-12">Loading recognitions...</div>
            ) : recognitions.length === 0 ? (
              <div className="text-center text-neutral-400 py-12">No recognitions yet. Create your first one!</div>
            ) : (
              <div className="grid gap-6">
                {recognitions.map((recognition) => {
                  const IconComponent = getIconComponent(recognition.icon);
                  return (
                    <motion.div
                      key={recognition.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-br from-neutral-900/50 to-neutral-800/30 backdrop-blur-sm border border-neutral-700/50 rounded-lg p-6 hover:border-neutral-600/50 transition-colors"
                    >
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Icon */}
                        <div className="lg:w-20 h-20 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-700 flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-10 h-10 text-neutral-300" />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-neutral-100">{recognition.title}</h3>
                                <span className="px-2 py-1 bg-neutral-800 text-neutral-400 rounded text-sm">
                                  #{recognition.displayOrder}
                                </span>
                              </div>
                              <p className="text-neutral-400 text-sm mb-2">
                                {recognition.organization} • {recognition.year}
                              </p>
                              <div className="flex flex-wrap gap-2 mb-3">
                                <span className="px-3 py-1 bg-neutral-800 text-neutral-400 rounded-full text-sm">
                                  {recognition.category}
                                </span>
                                {recognition.published && (
                                  <span className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm flex items-center gap-1">
                                    <Eye className="w-3 h-3" />
                                    Published
                                  </span>
                                )}
                                {recognition.featured && (
                                  <span className="px-3 py-1 bg-purple-900/30 text-purple-400 rounded-full text-sm">Featured</span>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEdit(recognition)}
                                className="p-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg transition-colors"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(recognition.id)}
                                className="p-2 bg-red-900/20 hover:bg-red-900/30 text-red-400 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <p className="text-neutral-300">{recognition.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}