import React, { useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import API from '../utils/api';

const Membership = () => {
  const [memberships, setMemberships] = useState([]);
  const [settings, setSettings] = useState({});

  useEffect(() => {

    // memberships fetch
    API.get('/memberships')
      .then(res => {
        console.log("membership api:", res.data);

        // 🔥 FIX: ensure array
        if (Array.isArray(res.data)) {
          setMemberships(res.data);
        } else {
          setMemberships([]);
        }
      })
      .catch(err => console.log(err));

    // settings fetch
    API.get('/settings')
      .then(res => setSettings(res.data || {}))
      .catch(err => console.log(err));

  }, []);

  const handleJoinNow = (plan) => {
    const message = `Hi, I want to join ${plan.title} plan`;
    window.open(`https://wa.me/${settings?.whatsapp || ""}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="section">
      <div className="container">
        <h2>Membership Plans</h2>

        <div className="membership-grid">

          {/* 🔥 SAFE MAP */}
          {Array.isArray(memberships) && memberships.length > 0 ? (
            memberships.map((plan, index) => (
              <div key={plan._id} className={`membership-card ${index === 1 ? 'featured' : ''}`}>
                
                {plan.discount > 0 && <div className="discount">{plan.discount}% OFF</div>}
                
                <h3>{plan.title}</h3>

                <div className="price">
                  ₹{plan.discount > 0 
                    ? plan.price - (plan.price * plan.discount / 100) 
                    : plan.price}
                </div>

                <p>{plan.duration}</p>

                <ul className="features">
                  {Array.isArray(plan.features) && plan.features.map((feature, i) => (
                    <li key={i}>
                      <FaCheck style={{color: '#ff6b00', marginRight: '10px'}} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="btn" onClick={() => handleJoinNow(plan)}>
                  Join Now
                </button>
              </div>
            ))
          ) : (
            <h3 style={{textAlign:"center"}}>No Plans Available</h3>
          )}

        </div>
      </div>
    </div>
  );
};

export default Membership;
