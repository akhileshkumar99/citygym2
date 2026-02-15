import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import API from '../utils/api';

const SettingsAdmin = () => {
  const [formData, setFormData] = useState({
    gymName: '', phone: '', whatsapp: '', email: '', address: '', mapUrl: '',
    instagramUrl: '', facebookUrl: '', timing: '', aboutShort: '', aboutFull: ''
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const res = await API.get('/settings');
      setFormData(res.data);
    } catch (err) {
      toast.error('Failed to load settings');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put('/settings', formData);
      toast.success('Settings updated');
    } catch (err) {
      toast.error('Update failed');
    }
  };

  return (
    <div>
      <div className="admin-header">
        <h2>Gym Settings</h2>
      </div>

      <div style={{background: '#fff', padding: '2rem', borderRadius: '10px'}}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Gym Name</label>
            <input type="text" value={formData.gymName} onChange={(e) => setFormData({...formData, gymName: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
          </div>
          <div className="form-group">
            <label>WhatsApp</label>
            <input type="text" value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input type="text" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Google Map URL</label>
            <input type="text" value={formData.mapUrl} onChange={(e) => setFormData({...formData, mapUrl: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Instagram URL</label>
            <input type="text" value={formData.instagramUrl} onChange={(e) => setFormData({...formData, instagramUrl: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Facebook URL</label>
            <input type="text" value={formData.facebookUrl} onChange={(e) => setFormData({...formData, facebookUrl: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Timing</label>
            <input type="text" value={formData.timing} onChange={(e) => setFormData({...formData, timing: e.target.value})} />
          </div>
          <div className="form-group">
            <label>About (Short)</label>
            <textarea value={formData.aboutShort} onChange={(e) => setFormData({...formData, aboutShort: e.target.value})} />
          </div>
          <button type="submit" className="btn">Update Settings</button>
        </form>
      </div>
    </div>
  );
};

export default SettingsAdmin;
