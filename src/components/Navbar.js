import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserShield, FaDumbbell } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <h1 style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
          <FaDumbbell style={{color: '#ff6b00'}} /> CITY GYM
        </h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/membership">Membership</Link>
          <Link to="/trainers">Trainers</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/admin/login" style={{color: '#ff6b00'}}><FaUserShield /> Admin</Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
