import React, { useState, useEffect } from 'react';
import { FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import API from '../utils/api';

const Contact = () => {
  const [settings, setSettings] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    API.get('/settings').then(res => setSettings(res.data)).catch(err => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast.error('Please fill all fields');
      return;
    }
    
    try {
      console.log('Submitting:', formData);
      const response = await API.post('/contact', formData);
      console.log('Response:', response);
      toast.success('Enquiry submitted successfully! We will contact you soon.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error('Submit error:', err);
      toast.error(err.response?.data?.error || 'Failed to submit enquiry');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="section">
      <div className="container">
        <h2>Contact Us</h2>
        <p style={{textAlign: 'center', maxWidth: '700px', margin: '0 auto 2rem', color: '#666', fontSize: '1.1rem'}}>Have questions? We're here to help! Reach out to us through any of the channels below</p>
        <div className="contact-container">
          <div className="contact-form">
            <h3>Send Enquiry</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea name="message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
              </div>
              <button type="submit" className="btn">Submit</button>
            </form>
          </div>
          <div className="contact-info">
            <div className="contact-item">
              <FaPhone />
              <div>
                <h4>Call Us</h4>
                <p>{settings.phone || '+91 XXXXXXXXXX'}</p>
                <a href={`tel:${settings.phone}`} className="btn" style={{marginTop: '10px'}}>Call Now</a>
              </div>
            </div>
            <div className="contact-item">
              <FaWhatsapp />
              <div>
                <h4>WhatsApp</h4>
                <p>{settings.whatsapp || '+91 XXXXXXXXXX'}</p>
                <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noreferrer" className="btn" style={{marginTop: '10px', background: '#25d366'}}>Chat on WhatsApp</a>
              </div>
            </div>
            <div className="contact-item">
              <FaEnvelope />
              <div>
                <h4>Email</h4>
                <p>{settings.email || 'info@citygym.com'}</p>
              </div>
            </div>
            <div className="contact-item">
              <FaMapMarkerAlt />
              <div>
                <h4>Address</h4>
                <p>{settings.address || 'Your City, India'}</p>
              </div>
            </div>
          </div>
        </div>
        {settings.mapUrl && (
          <div style={{marginTop: '3rem'}}>
            <iframe
              src={settings.mapUrl}
              width="100%"
              height="400"
              style={{border: 0, borderRadius: '10px'}}
              allowFullScreen=""
              loading="lazy"
              title="Gym Location"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
