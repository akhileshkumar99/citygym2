import React, { useState, useEffect } from 'react';
import { FaTrophy, FaCertificate } from 'react-icons/fa';
import API from '../utils/api';

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    API.get('/trainers').then(res => setTrainers(res.data)).catch(err => console.log(err));
  }, []);

  return (
    <div className="section">
      <div className="container">
        <h2>Our Expert Trainers</h2>
        <p style={{textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem', color: '#666', fontSize: '1.1rem'}}>Meet our certified fitness professionals dedicated to helping you achieve your transformation goals</p>
        <div className="trainers-grid">
          {trainers.map(trainer => (
            <div key={trainer._id} className="trainer-card">
              <img 
                src={trainer.photo?.startsWith('http') ? trainer.photo : `https://citygym1.onrender.com${trainer.photo}`} 
                alt={trainer.name}
                onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400'}
              />
              <div className="trainer-info">
                <h3>{trainer.name}</h3>
                <p><strong>Experience:</strong> {trainer.experience}</p>
                <p><FaTrophy style={{color: '#ff6b00'}} /> {trainer.transformationClients}+ Transformations</p>
                <div className="certifications">
                  {trainer.certification?.map((cert, i) => (
                    <span key={i} className="cert-badge"><FaCertificate /> {cert}</span>
                  ))}
                </div>
                {trainer.specialization?.length > 0 && (
                  <p style={{marginTop: '10px'}}><strong>Specialization:</strong> {trainer.specialization.join(', ')}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div style={{marginTop: '4rem', background: 'linear-gradient(135deg, #ff6b00, #ff8c00)', color: '#fff', padding: '3rem 2rem', borderRadius: '10px', textAlign: 'center'}}>
          <h3 style={{fontSize: '2rem', marginBottom: '1rem'}}>Want Personal Training?</h3>
          <p style={{fontSize: '1.1rem', marginBottom: '2rem'}}>Get customized workout plans and one-on-one guidance from our expert trainers</p>
          <div style={{display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap'}}>
            <div>
              <h4 style={{fontSize: '1.5rem'}}>₹2000/month</h4>
              <p>3 sessions per week</p>
            </div>
            <div>
              <h4 style={{fontSize: '1.5rem'}}>₹3500/month</h4>
              <p>5 sessions per week</p>
            </div>
            <div>
              <h4 style={{fontSize: '1.5rem'}}>₹5000/month</h4>
              <p>Daily sessions</p>
            </div>
          </div>
          <button className="btn" style={{marginTop: '2rem', background: '#fff', color: '#ff6b00'}} onClick={() => window.open('https://wa.me/', '_blank')}>Contact Us</button>
        </div>
      </div>
    </div>
  );
};

export default Trainers;
