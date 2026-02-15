import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import API from '../utils/api';

const GalleryAdmin = () => {
  const [gallery, setGallery] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', type: 'gym', url: '' });
  const [file, setFile] = useState(null);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      const res = await API.get('/gallery');
      setGallery(res.data);
    } catch (err) {
      toast.error('Failed to load gallery');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('type', formData.type);
      if (file) {
        data.append('file', file);
      } else {
        toast.error('Please select a file to upload');
        return;
      }

      await API.post('/gallery', data);
      toast.success('Gallery item added');
      setShowForm(false);
      setFormData({ title: '', type: 'gym', url: '' });
      setFile(null);
      loadGallery();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this item?')) {
      try {
        await API.delete(`/gallery/${id}`);
        toast.success('Item deleted');
        loadGallery();
      } catch (err) {
        toast.error('Delete failed');
      }
    }
  };

  return (
    <div>
      <div className="admin-header">
        <h2>Manage Gallery</h2>
        <button className="btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add New'}
        </button>
      </div>

      {showForm && (
        <div style={{background: '#fff', padding: '2rem', borderRadius: '10px', marginBottom: '2rem'}}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Type</label>
              <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                <option value="gym">Gym Photo</option>
                <option value="workout">Workout</option>
                <option value="transformation">Transformation</option>
                <option value="video">Video</option>
              </select>
            </div>
            <div className="form-group">
              <label>Upload File (Required)</label>
              <input type="file" onChange={(e) => setFile(e.target.files[0])} accept="image/*,video/*" required />
            </div>
            <button type="submit" className="btn">Add</button>
          </form>
        </div>
      )}

      <div className="gallery-grid">
        {gallery.map(item => (
          <div key={item._id} className="gallery-item" style={{position: 'relative'}}>
            {item.type === 'video' ? (
              <video src={`http://localhost:5000${item.url}`} style={{width: '100%', height: '250px'}} />
            ) : (
              <img src={`http://localhost:5000${item.url}`} alt={item.title} />
            )}
            <button className="btn-delete" style={{position: 'absolute', top: '10px', right: '10px'}} onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryAdmin;
