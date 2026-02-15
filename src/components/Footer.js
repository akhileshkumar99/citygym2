import React, { useState, useEffect } from 'react';
import { FaFacebook, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import API from '../utils/api';

const Footer = () => {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    API.get('/settings').then(res => setSettings(res.data)).catch(err => console.log(err));
  }, []);

  return (
    <div className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>CITY GYM</h3>
            <p>{settings.aboutShort || 'Transform Your Body, Transform Your Life'}</p>
            <div className="social-links">
              {settings.facebookUrl && <a href={settings.facebookUrl} target="_blank" rel="noreferrer"><FaFacebook /></a>}
              {settings.instagramUrl && <a href={settings.instagramUrl} target="_blank" rel="noreferrer"><FaInstagram /></a>}
            </div>
          </div>
          <div className="footer-section">
            <h3>Contact Info</h3>
            <p><FaPhone /> {settings.phone || '+91 XXXXXXXXXX'}</p>
            <p><FaEnvelope /> {settings.email || 'info@citygym.com'}</p>
            <p><FaMapMarkerAlt /> {settings.address || 'Your City, India'}</p>
          </div>
          <div className="footer-section">
            <h3>Timing</h3>
            <p>{settings.timing || 'Mon - Sat: 6:00 AM - 10:00 PM'}</p>
            <p>Sunday: 7:00 AM - 8:00 PM</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 City Gym. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
