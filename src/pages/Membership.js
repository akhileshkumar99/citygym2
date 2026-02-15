import React, { useState, useEffect } from 'react';
import { FaCheck, FaWhatsapp, FaFire, FaClock, FaUserFriends } from 'react-icons/fa';
import API from '../utils/api';

const Membership = () => {
  const [memberships, setMemberships] = useState([]);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    API.get('/memberships').then(res => setMemberships(res.data)).catch(err => console.log(err));
    API.get('/settings').then(res => setSettings(res.data)).catch(err => console.log(err));
  }, []);

  const handleJoinNow = (plan) => {
    const message = `Hi, I want to join ${plan.title} plan`;
    window.open(`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="section">
      <div className="container">
        <h2>Membership Plans</h2>
        <p style={{textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem', color: '#666', fontSize: '1.1rem'}}>Choose the perfect plan that fits your fitness goals and budget. All plans include access to premium equipment and facilities.</p>
        <div className="membership-grid">
          {memberships.map((plan, index) => (
            <div key={plan._id} className={`membership-card ${index === 1 ? 'featured' : ''}`}>
              {plan.discount > 0 && <div className="discount">{plan.discount}% OFF</div>}
              <h3>{plan.title}</h3>
              <div className="price">
                ₹{plan.discount > 0 ? plan.price - (plan.price * plan.discount / 100) : plan.price}
                {plan.discount > 0 && <span style={{fontSize: '1rem', textDecoration: 'line-through', color: '#999'}}> ₹{plan.price}</span>}
              </div>
              <p>{plan.duration}</p>
              <ul className="features">
                {plan.features?.map((feature, i) => (
                  <li key={i}><FaCheck style={{color: '#ff6b00', marginRight: '10px'}} />{feature}</li>
                ))}
              </ul>
              <button className="btn" onClick={() => handleJoinNow(plan)}>Join Now</button>
            </div>
          ))}
        </div>
        
        <div style={{marginTop: '4rem', textAlign: 'center', background: '#f9f9f9', padding: '2rem', borderRadius: '10px'}}>
          <h3 style={{marginBottom: '1.5rem', color: '#ff6b00'}}>Why Choose City Gym?</h3>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '2rem'}}>
            <div>
              <h4>🏋️ Modern Equipment</h4>
              <p style={{color: '#666', fontSize: '0.9rem'}}>Latest fitness machines</p>
            </div>
            <div>
              <h4>👨‍🏫 Expert Trainers</h4>
              <p style={{color: '#666', fontSize: '0.9rem'}}>Certified professionals</p>
            </div>
            <div>
              <h4>🕐 Flexible Timings</h4>
              <p style={{color: '#666', fontSize: '0.9rem'}}>6 AM - 11 PM daily</p>
            </div>
            <div>
              <h4>🚿 Premium Facilities</h4>
              <p style={{color: '#666', fontSize: '0.9rem'}}>Locker rooms & showers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
