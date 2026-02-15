import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import API from '../utils/api';

const TestimonialsAdmin = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', rating: 5, review: '' });
  const [photo, setPhoto] = useState(null);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const res = await API.get('/testimonials');
      setTestimonials(res.data);
    } catch (err) {
      toast.error('Failed to load testimonials');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('rating', formData.rating);
      data.append('review', formData.review);
      if (photo) data.append('photo', photo);

      if (editId) {
        await API.put(`/testimonials/${editId}`, data);
        toast.success('Testimonial updated');
      } else {
        await API.post('/testimonials', data);
        toast.success('Testimonial added');
      }

      setShowForm(false);
      setFormData({ name: '', rating: 5, review: '' });
      setPhoto(null);
      setEditId(null);
      loadTestimonials();
    } catch (err) {
      toast.error('Operation failed');
    }
  };

  const handleEdit = (testimonial) => {
    setFormData({
      name: testimonial.name,
      rating: testimonial.rating,
      review: testimonial.review
    });
    setEditId(testimonial._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this testimonial?')) {
      try {
        await API.delete(`/testimonials/${id}`);
        toast.success('Testimonial deleted');
        loadTestimonials();
      } catch (err) {
        toast.error('Delete failed');
      }
    }
  };

  return (
    <div>
      <div className="admin-header">
        <h2>Manage Testimonials</h2>
        <button className="btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add New'}
        </button>
      </div>

      {showForm && (
        <div style={{background: '#fff', padding: '2rem', borderRadius: '10px', marginBottom: '2rem'}}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Photo</label>
              <input type="file" onChange={(e) => setPhoto(e.target.files[0])} accept="image/*" />
            </div>
            <div className="form-group">
              <label>Rating</label>
              <select value={formData.rating} onChange={(e) => setFormData({...formData, rating: e.target.value})}>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
            <div className="form-group">
              <label>Review</label>
              <textarea value={formData.review} onChange={(e) => setFormData({...formData, review: e.target.value})} required />
            </div>
            <button type="submit" className="btn">{editId ? 'Update' : 'Add'}</button>
          </form>
        </div>
      )}

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Rating</th>
              <th>Review</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map(t => (
              <tr key={t._id}>
                <td>{t.name}</td>
                <td>{t.rating} ⭐</td>
                <td>{t.review.substring(0, 50)}...</td>
                <td className="action-btns">
                  <button className="btn-edit" onClick={() => handleEdit(t)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(t._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestimonialsAdmin;
