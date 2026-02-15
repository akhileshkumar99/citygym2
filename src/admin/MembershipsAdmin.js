import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import API from '../utils/api';

const MembershipsAdmin = () => {
  const [memberships, setMemberships] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '', price: '', duration: '', features: '', discount: 0
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadMemberships();
  }, []);

  const loadMemberships = async () => {
    try {
      const res = await API.get('/memberships/all');
      setMemberships(res.data);
    } catch (err) {
      toast.error('Failed to load memberships');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        features: formData.features.split(',').map(f => f.trim())
      };
      
      if (editId) {
        await API.put(`/memberships/${editId}`, data);
        toast.success('Membership updated');
      } else {
        await API.post('/memberships', data);
        toast.success('Membership added');
      }
      
      setShowForm(false);
      setFormData({ title: '', price: '', duration: '', features: '', discount: 0 });
      setEditId(null);
      loadMemberships();
    } catch (err) {
      toast.error('Operation failed');
    }
  };

  const handleEdit = (membership) => {
    setFormData({
      ...membership,
      features: membership.features.join(', ')
    });
    setEditId(membership._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this membership?')) {
      try {
        await API.delete(`/memberships/${id}`);
        toast.success('Membership deleted');
        loadMemberships();
      } catch (err) {
        toast.error('Delete failed');
      }
    }
  };

  return (
    <div>
      <div className="admin-header">
        <h2>Manage Memberships</h2>
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
              <label>Price (₹)</label>
              <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Duration</label>
              <input type="text" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Features (comma separated)</label>
              <textarea value={formData.features} onChange={(e) => setFormData({...formData, features: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Discount (%)</label>
              <input type="number" value={formData.discount} onChange={(e) => setFormData({...formData, discount: e.target.value})} />
            </div>
            <button type="submit" className="btn">{editId ? 'Update' : 'Add'}</button>
          </form>
        </div>
      )}

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Duration</th>
              <th>Discount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {memberships.map(m => (
              <tr key={m._id}>
                <td>{m.title}</td>
                <td>₹{m.price}</td>
                <td>{m.duration}</td>
                <td>{m.discount}%</td>
                <td className="action-btns">
                  <button className="btn-edit" onClick={() => handleEdit(m)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(m._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MembershipsAdmin;
