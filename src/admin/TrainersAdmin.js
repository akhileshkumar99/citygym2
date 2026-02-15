import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import API from '../utils/api';

const TrainersAdmin = () => {
  const [trainers, setTrainers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '', experience: '', certification: '', specialization: '', transformationClients: 0
  });
  const [photo, setPhoto] = useState(null);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadTrainers();
  }, []);

  const loadTrainers = async () => {
    try {
      const res = await API.get('/trainers');
      setTrainers(res.data);
    } catch (err) {
      toast.error('Failed to load trainers');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('experience', formData.experience);
      data.append('certification', JSON.stringify(formData.certification.split(',').map(c => c.trim())));
      data.append('specialization', JSON.stringify(formData.specialization.split(',').map(s => s.trim())));
      data.append('transformationClients', formData.transformationClients);
      if (photo) data.append('photo', photo);

      if (editId) {
        await API.put(`/trainers/${editId}`, data);
        toast.success('Trainer updated');
      } else {
        if (!photo) {
          toast.error('Please upload trainer photo');
          return;
        }
        await API.post('/trainers', data);
        toast.success('Trainer added');
      }

      setShowForm(false);
      setFormData({ name: '', experience: '', certification: '', specialization: '', transformationClients: 0 });
      setPhoto(null);
      setEditId(null);
      loadTrainers();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Operation failed');
    }
  };

  const handleEdit = (trainer) => {
    setFormData({
      name: trainer.name,
      experience: trainer.experience,
      certification: trainer.certification.join(', '),
      specialization: trainer.specialization.join(', '),
      transformationClients: trainer.transformationClients
    });
    setEditId(trainer._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this trainer?')) {
      try {
        await API.delete(`/trainers/${id}`);
        toast.success('Trainer deleted');
        loadTrainers();
      } catch (err) {
        toast.error('Delete failed');
      }
    }
  };

  return (
    <div>
      <div className="admin-header">
        <h2>Manage Trainers</h2>
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
              <label>Photo (Required for new trainer)</label>
              <input type="file" onChange={(e) => setPhoto(e.target.files[0])} accept="image/*" required={!editId} />
            </div>
            <div className="form-group">
              <label>Experience</label>
              <input type="text" value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Certifications (comma separated)</label>
              <input type="text" value={formData.certification} onChange={(e) => setFormData({...formData, certification: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Specialization (comma separated)</label>
              <input type="text" value={formData.specialization} onChange={(e) => setFormData({...formData, specialization: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Transformation Clients</label>
              <input type="number" value={formData.transformationClients} onChange={(e) => setFormData({...formData, transformationClients: e.target.value})} />
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
              <th>Experience</th>
              <th>Transformations</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map(t => (
              <tr key={t._id}>
                <td>{t.name}</td>
                <td>{t.experience}</td>
                <td>{t.transformationClients}</td>
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

export default TrainersAdmin;
