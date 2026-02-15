import React, { useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUsers, FaDumbbell, FaImages, FaEnvelope, FaStar, FaCog, FaSignOutAlt, FaArrowLeft } from 'react-icons/fa';
import MembershipsAdmin from './MembershipsAdmin';
import TrainersAdmin from './TrainersAdmin';
import GalleryAdmin from './GalleryAdmin';
import ContactsAdmin from './ContactsAdmin';
import TestimonialsAdmin from './TestimonialsAdmin';
import SettingsAdmin from './SettingsAdmin';

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <h2>City Gym Admin</h2>
        <nav>
          <Link to="/"><FaArrowLeft /> Back to Home</Link>
          <Link to="/admin/dashboard"><FaHome /> Dashboard</Link>
          <Link to="/admin/memberships"><FaDumbbell /> Memberships</Link>
          <Link to="/admin/trainers"><FaUsers /> Trainers</Link>
          <Link to="/admin/gallery"><FaImages /> Gallery</Link>
          <Link to="/admin/contacts"><FaEnvelope /> Enquiries</Link>
          <Link to="/admin/testimonials"><FaStar /> Testimonials</Link>
          <Link to="/admin/settings"><FaCog /> Settings</Link>
          <a href="#!" onClick={handleLogout}><FaSignOutAlt /> Logout</a>
        </nav>
      </div>
      <div className="admin-content">
        <Routes>
          <Route path="/dashboard" element={<h2>Welcome to Admin Dashboard</h2>} />
          <Route path="/memberships" element={<MembershipsAdmin />} />
          <Route path="/trainers" element={<TrainersAdmin />} />
          <Route path="/gallery" element={<GalleryAdmin />} />
          <Route path="/contacts" element={<ContactsAdmin />} />
          <Route path="/testimonials" element={<TestimonialsAdmin />} />
          <Route path="/settings" element={<SettingsAdmin />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
