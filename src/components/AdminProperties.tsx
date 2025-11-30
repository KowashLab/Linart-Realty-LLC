import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X, Home, MapPin, DollarSign, Maximize, Bed, Bath, Calendar, Eye, EyeOff, Image as ImageIcon } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { useAuth } from '../contexts/AuthContext';
import { AdminNav } from './AdminNav';

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  address: string;
  type: string;
  status: 'available' | 'sold' | 'pending';
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  yearBuilt: number;
  images: string[];
  features: string[];
  published: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

const PROPERTY_TYPES = ['Luxury Estate', 'Penthouse', 'Villa', 'Mansion', 'Waterfront', 'Modern', 'Contemporary', 'Colonial'];
const STATUS_OPTIONS = ['available', 'sold', 'pending'];

export function AdminProperties() {
  const { user, getAccessToken } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Property>>({
    title: '',
    description: '',
    price: 0,
    location: '',
    address: '',
    type: 'Luxury Estate',
    status: 'available',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 5000,
    yearBuilt: new Date().getFullYear(),
    images: [''],
    features: [''],
    published: false,
    featured: false
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/server/properties`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (!response.ok) throw new Error('Failed to fetch properties');
      const data = await response.json();
      setProperties(data.properties || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = await getAccessToken();
      if (!token) {
        alert('Please login to manage properties');
        return;
      }

      // Clean up empty strings from arrays
      const cleanedData = {
        ...formData,
        images: formData.images?.filter(img => img.trim() !== '') || [],
        features: formData.features?.filter(feat => feat.trim() !== '') || []
      };

      const url = editingId
        ? `https://${projectId}.supabase.co/functions/v1/server/properties/admin/${editingId}`
        : `https://${projectId}.supabase.co/functions/v1/server/properties/admin`;

      const response = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(cleanedData)
      });

      if (!response.ok) throw new Error('Failed to save property');

      await fetchProperties();
      resetForm();
      alert(editingId ? 'Property updated!' : 'Property created!');
    } catch (error) {
      console.error('Error saving property:', error);
      alert('Error saving property');
    }
  };

  const handleEdit = (property: Property) => {
    setFormData(property);
    setEditingId(property.id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;

    try {
      const token = await getAccessToken();
      if (!token) return;

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/server/properties/admin/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) throw new Error('Failed to delete property');

      await fetchProperties();
      alert('Property deleted!');
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Error deleting property');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: 0,
      location: '',
      address: '',
      type: 'Luxury Estate',
      status: 'available',
      bedrooms: 4,
      bathrooms: 3,
      sqft: 5000,
      yearBuilt: new Date().getFullYear(),
      images: [''],
      features: [''],
      published: false,
      featured: false
    });
    setEditingId(null);
    setIsEditing(false);
  };

  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      images: [...(prev.images || []), '']
    }));
  };

  const removeImageField = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index)
    }));
  };

  const updateImageField = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images?.map((img, i) => i === index ? value : img)
    }));
  };

  const addFeatureField = () => {
    setFormData(prev => ({
      ...prev,
      features: [...(prev.features || []), '']
    }));
  };

  const removeFeatureField = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features?.filter((_, i) => i !== index)
    }));
  };

  const updateFeatureField = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features?.map((feat, i) => i === index ? value : feat)
    }));
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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center"
          >
            <h1 className="text-neutral-100 mb-4 font-['Cinzel']">Properties Management</h1>
            <p className="text-neutral-400">Manage luxury properties portfolio</p>
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
                {editingId ? 'Edit Property' : 'Create New Property'}
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
                    placeholder="Luxury Waterfront Estate"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 mb-2">Location *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-neutral-500 transition-colors"
                    placeholder="Miami Beach, FL"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 mb-2">Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-neutral-500 transition-colors"
                    placeholder="123 Ocean Drive"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 mb-2">Price *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-neutral-500 transition-colors"
                    placeholder="5000000"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 mb-2">Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-neutral-500 transition-colors"
                  >
                    {PROPERTY_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 mb-2">Status *</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-neutral-500 transition-colors"
                  >
                    {STATUS_OPTIONS.map(status => (
                      <option key={status} value={status}>{status.toUpperCase()}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 mb-2">Bedrooms *</label>
                  <input
                    type="number"
                    required
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                    className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-neutral-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 mb-2">Bathrooms *</label>
                  <input
                    type="number"
                    required
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                    className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-neutral-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 mb-2">Square Feet *</label>
                  <input
                    type="number"
                    required
                    value={formData.sqft}
                    onChange={(e) => setFormData({ ...formData, sqft: Number(e.target.value) })}
                    className="w-full bg-neutral-900/50 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-neutral-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 mb-2">Year Built *</label>
                  <input
                    type="number"
                    required
                    value={formData.yearBuilt}
                    onChange={(e) => setFormData({ ...formData, yearBuilt: Number(e.target.value) })}
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
                  placeholder="Property description..."
                />
              </div>

              {/* Images */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-neutral-300">Images (URLs)</label>
                  <button
                    type="button"
                    onClick={addImageField}
                    className="flex items-center gap-2 px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Image
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.images?.map((image, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="url"
                        value={image}
                        onChange={(e) => updateImageField(index, e.target.value)}
                        className="flex-1 bg-neutral-900/50 border border-neutral-700 rounded-lg px-4 py-2 text-neutral-100 focus:outline-none focus:border-neutral-500 transition-colors"
                        placeholder="https://example.com/image.jpg"
                      />
                      {formData.images && formData.images.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeImageField(index)}
                          className="px-3 py-2 bg-red-900/20 hover:bg-red-900/30 text-red-400 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-neutral-300">Features</label>
                  <button
                    type="button"
                    onClick={addFeatureField}
                    className="flex items-center gap-2 px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Feature
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.features?.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateFeatureField(index, e.target.value)}
                        className="flex-1 bg-neutral-900/50 border border-neutral-700 rounded-lg px-4 py-2 text-neutral-100 focus:outline-none focus:border-neutral-500 transition-colors"
                        placeholder="Ocean view, Pool, Smart home..."
                      />
                      {formData.features && formData.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFeatureField(index)}
                          className="px-3 py-2 bg-red-900/20 hover:bg-red-900/30 text-red-400 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
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
                {editingId ? 'Update Property' : 'Create Property'}
              </button>
            </form>
          </motion.div>

          {/* Properties List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-neutral-100 mb-8 font-['Cinzel']">All Properties ({properties.length})</h2>

            {loading ? (
              <div className="text-center text-neutral-400 py-12">Loading properties...</div>
            ) : properties.length === 0 ? (
              <div className="text-center text-neutral-400 py-12">No properties yet. Create your first one!</div>
            ) : (
              <div className="grid gap-6">
                {properties.map((property) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-neutral-900/50 to-neutral-800/30 backdrop-blur-sm border border-neutral-700/50 rounded-lg p-6 hover:border-neutral-600/50 transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Image */}
                      {property.images[0] && (
                        <div className="lg:w-64 h-48 rounded-lg overflow-hidden bg-neutral-800">
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-neutral-100 mb-2">{property.title}</h3>
                            <div className="flex flex-wrap gap-2 mb-3">
                              <span className={`px-3 py-1 rounded-full text-sm ${
                                property.status === 'available' ? 'bg-green-900/30 text-green-400' :
                                property.status === 'sold' ? 'bg-red-900/30 text-red-400' :
                                'bg-yellow-900/30 text-yellow-400'
                              }`}>
                                {property.status.toUpperCase()}
                              </span>
                              {property.published && (
                                <span className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm flex items-center gap-1">
                                  <Eye className="w-3 h-3" />
                                  Published
                                </span>
                              )}
                              {property.featured && (
                                <span className="px-3 py-1 bg-purple-900/30 text-purple-400 rounded-full text-sm">Featured</span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(property)}
                              className="p-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(property.id)}
                              className="p-2 bg-red-900/20 hover:bg-red-900/30 text-red-400 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-neutral-400">
                            <DollarSign className="w-4 h-4" />
                            ${property.price.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-2 text-neutral-400">
                            <MapPin className="w-4 h-4" />
                            {property.location}
                          </div>
                          <div className="flex items-center gap-2 text-neutral-400">
                            <Bed className="w-4 h-4" />
                            {property.bedrooms} Beds
                          </div>
                          <div className="flex items-center gap-2 text-neutral-400">
                            <Bath className="w-4 h-4" />
                            {property.bathrooms} Baths
                          </div>
                          <div className="flex items-center gap-2 text-neutral-400">
                            <Maximize className="w-4 h-4" />
                            {property.sqft.toLocaleString()} sqft
                          </div>
                          <div className="flex items-center gap-2 text-neutral-400">
                            <Home className="w-4 h-4" />
                            {property.type}
                          </div>
                        </div>

                        <p className="text-neutral-400 text-sm line-clamp-2">{property.description}</p>
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