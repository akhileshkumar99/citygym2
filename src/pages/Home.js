import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaDumbbell, FaHeartbeat, FaUsers, FaAppleAlt, FaWhatsapp, FaStar } from 'react-icons/fa';
import API from '../utils/api';
import BMICalculator from '../components/BMICalculator';

const Home = () => {
  const [settings, setSettings] = useState({});
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    API.get('/settings').then(res => setSettings(res.data)).catch(err => console.log(err));
    API.get('/testimonials').then(res => setTestimonials(res.data)).catch(err => console.log(err));
  }, []);

  const openWhatsApp = () => {
    window.open(`https://wa.me/${settings.whatsapp}`, '_blank');
  };

  return (
    <div>
      <div className="hero">
        <div className="container">
          <h2>Transform Your Body</h2>
          <p>Join City Gym Today!</p>
          <Link to="/membership" className="btn">Join Now</Link>
        </div>
      </div>

      {settings.offerBanner && (
        <div className="container">
          <div className="offer-banner">
            <h3>🔥 Special Offer! 🔥</h3>
            <p>Get 20% OFF on Annual Membership</p>
            <Link to="/membership" className="btn">Grab Offer</Link>
          </div>
        </div>
      )}

      <div className="section about">
        <div className="container">
          <h2>About City Gym</h2>
          <div className="about-content">
            <p>{settings.aboutShort || 'City Gym is your ultimate fitness destination. We provide world-class equipment, expert trainers, and a motivating environment to help you achieve your fitness goals.'}</p>
            <div className="stats-grid">
              <div className="stat-box">
                <h3>500+</h3>
                <p>Active Members</p>
              </div>
              <div className="stat-box">
                <h3>15+</h3>
                <p>Expert Trainers</p>
              </div>
              <div className="stat-box">
                <h3>10+</h3>
                <p>Years Experience</p>
              </div>
              <div className="stat-box">
                <h3>1000+</h3>
                <p>Transformations</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <h2>Our Services</h2>
          <p style={{textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem', color: '#666'}}>Transform your body and mind with our comprehensive fitness services designed for all levels</p>
          <div className="services-grid">
            <div className="service-card">
              <FaDumbbell />
              <h3>Weight Training</h3>
              <p>Build muscle and strength with our advanced equipment</p>
              <ul style={{textAlign: 'left', marginTop: '1rem', fontSize: '0.9rem', color: '#666'}}>
                <li>Free weights & machines</li>
                <li>Powerlifting zone</li>
                <li>Functional training area</li>
              </ul>
            </div>
            <div className="service-card">
              <FaHeartbeat />
              <h3>Cardio</h3>
              <p>Improve endurance with treadmills, cycles, and more</p>
              <ul style={{textAlign: 'left', marginTop: '1rem', fontSize: '0.9rem', color: '#666'}}>
                <li>Latest cardio machines</li>
                <li>HIIT training zone</li>
                <li>Group cardio classes</li>
              </ul>
            </div>
            <div className="service-card">
              <FaUsers />
              <h3>Personal Training</h3>
              <p>Get personalized workout plans from certified trainers</p>
              <ul style={{textAlign: 'left', marginTop: '1rem', fontSize: '0.9rem', color: '#666'}}>
                <li>1-on-1 coaching</li>
                <li>Custom workout plans</li>
                <li>Progress tracking</li>
              </ul>
            </div>
            <div className="service-card">
              <FaAppleAlt />
              <h3>Diet Plans</h3>
              <p>Customized nutrition guidance for your goals</p>
              <ul style={{textAlign: 'left', marginTop: '1rem', fontSize: '0.9rem', color: '#666'}}>
                <li>Personalized meal plans</li>
                <li>Nutrition counseling</li>
                <li>Supplement guidance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="section" style={{background: '#f4f4f4'}}>
        <div className="container">
          <h2>BMI Calculator</h2>
          <BMICalculator />
        </div>
      </div>

      {testimonials.length > 0 && (
        <div className="section">
          <div className="container">
            <h2>What Our Clients Say</h2>
            <div className="testimonials-slider">
              {testimonials.slice(0, 3).map(testimonial => (
                <div key={testimonial._id} className="testimonial-card">
                  {testimonial.photo && <img src={`http://localhost:5000${testimonial.photo}`} alt={testimonial.name} />}
                  <h4>{testimonial.name}</h4>
                  <div className="stars">
                    {[...Array(testimonial.rating)].map((_, i) => <FaStar key={i} />)}
                  </div>
                  <p>{testimonial.review}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="section" style={{background: '#f4f4f4'}}>
        <div className="container">
          <h2>Visit Us</h2>
          <div style={{textAlign: 'center'}}>
            {settings.mapUrl ? (
              <iframe
                src={settings.mapUrl}
                width="100%"
                height="400"
                style={{border: 0, borderRadius: '10px'}}
                allowFullScreen=""
                loading="lazy"
                title="Gym Location"
              ></iframe>
            ) : (
              <p>Map location will be displayed here</p>
            )}
          </div>
        </div>
      </div>

      {settings.whatsapp && (
        <div className="whatsapp-btn" onClick={openWhatsApp}>
          <FaWhatsapp />
        </div>
      )}
    </div>
  );
};

export default Home;
