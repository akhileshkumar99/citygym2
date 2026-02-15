import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaArrowLeft } from 'react-icons/fa';
import API from '../utils/api';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      toast.success('Login successful!');
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="admin-login">
      <Link to="/" style={{position: 'absolute', top: '20px', left: '20px', color: '#fff', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', background: 'rgba(255,255,255,0.1)', padding: '10px 20px', borderRadius: '50px', transition: 'all 0.3s'}}>
        <FaArrowLeft /> Back to Home
      </Link>
      <div className="login-form">
        <h2 style={{textAlign: 'center', marginBottom: '2rem'}}>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          <button type="submit" className="btn" style={{width: '100%'}}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
