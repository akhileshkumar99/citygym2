import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaDumbbell, FaHeartbeat, FaUsers, FaAppleAlt, FaWhatsapp, FaStar, FaClock, FaTrophy, FaQuestionCircle, FaVideo, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import API from '../utils/api';
import BMICalculator from '../components/BMICalculator';

const Home = () => {
  const [settings, setSettings] = useState({});
  const [testimonials, setTestimonials] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [memberCount, setMemberCount] = useState(500);

  const heroImages = [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200',
    'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200',
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200'
  ];

  useEffect(() => {
    API.get('/settings').then(res => setSettings(res.data)).catch(err => console.log(err));
    API.get('/testimonials').then(res => setTestimonials(res.data)).catch(err => console.log(err));
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const openWhatsApp = () => {
    window.open(`https://wa.me/${settings.whatsapp}`, '_blank');
  };

  return (
    <div>
      <div className="hero" style={{backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.7), rgba(255,107,0,0.3)), url(${heroImages[currentSlide]})`, transition: 'background-image 1s ease-in-out'}}>
        <div className="container">
          <h2>Transform Your Body</h2>
          <p>Join City Gym Today!</p>
          <Link to="/membership" className="btn">Join Now</Link>
          <div style={{position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px'}}>
            {heroImages.map((_, index) => (
              <div key={index} onClick={() => setCurrentSlide(index)} style={{width: '12px', height: '12px', borderRadius: '50%', background: currentSlide === index ? '#ff6b00' : '#fff', cursor: 'pointer', transition: 'all 0.3s'}}></div>
            ))}
          </div>
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

      <div className="section">
        <div className="container">
          <h2>Class Schedule</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '2rem'}}>
            <div style={{background: '#fff', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)'}}>
              <FaClock style={{fontSize: '2rem', color: '#ff6b00', marginBottom: '1rem'}} />
              <h3>Morning Batch</h3>
              <p style={{color: '#666', margin: '0.5rem 0'}}>6:00 AM - 10:00 AM</p>
              <p style={{fontSize: '0.9rem', color: '#999'}}>Perfect for early risers</p>
            </div>
            <div style={{background: '#fff', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)'}}>
              <FaClock style={{fontSize: '2rem', color: '#ff6b00', marginBottom: '1rem'}} />
              <h3>Evening Batch</h3>
              <p style={{color: '#666', margin: '0.5rem 0'}}>5:00 PM - 10:00 PM</p>
              <p style={{fontSize: '0.9rem', color: '#999'}}>After work fitness</p>
            </div>
            <div style={{background: '#fff', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)'}}>
              <FaClock style={{fontSize: '2rem', color: '#ff6b00', marginBottom: '1rem'}} />
              <h3>Weekend Special</h3>
              <p style={{color: '#666', margin: '0.5rem 0'}}>7:00 AM - 8:00 PM</p>
              <p style={{fontSize: '0.9rem', color: '#999'}}>Extended hours</p>
            </div>
          </div>
        </div>
      </div>

      <div className="section" style={{background: '#f4f4f4'}}>
        <div className="container">
          <h2>Our Achievements</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '2rem'}}>
            <div style={{textAlign: 'center'}}>
              <FaTrophy style={{fontSize: '3rem', color: '#ffd700', marginBottom: '1rem'}} />
              <h3 style={{color: '#ff6b00'}}>Best Gym 2023</h3>
              <p style={{color: '#666'}}>City Award</p>
            </div>
            <div style={{textAlign: 'center'}}>
              <FaTrophy style={{fontSize: '3rem', color: '#c0c0c0', marginBottom: '1rem'}} />
              <h3 style={{color: '#ff6b00'}}>Top Trainers</h3>
              <p style={{color: '#666'}}>Certified Professionals</p>
            </div>
            <div style={{textAlign: 'center'}}>
              <FaTrophy style={{fontSize: '3rem', color: '#cd7f32', marginBottom: '1rem'}} />
              <h3 style={{color: '#ff6b00'}}>1000+ Members</h3>
              <p style={{color: '#666'}}>Growing Community</p>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div style={{maxWidth: '800px', margin: '2rem auto'}}>
            {[
              {q: 'What are the gym timings?', a: 'We are open Mon-Sat: 6:00 AM - 10:00 PM, Sunday: 7:00 AM - 8:00 PM'},
              {q: 'Do you provide personal training?', a: 'Yes, we have certified personal trainers available for one-on-one sessions.'},
              {q: 'Is there a trial period?', a: 'Yes, we offer a 3-day free trial for new members.'},
              {q: 'What equipment do you have?', a: 'We have cardio machines, free weights, resistance machines, and functional training equipment.'}
            ].map((faq, i) => (
              <div key={i} style={{background: '#fff', padding: '1.5rem', marginBottom: '1rem', borderRadius: '10px', boxShadow: '0 3px 10px rgba(0,0,0,0.1)'}}>
                <h4 style={{color: '#ff6b00', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <FaQuestionCircle /> {faq.q}
                </h4>
                <p style={{color: '#666', marginLeft: '1.8rem'}}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {testimonials.length > 0 && (
        <div className="section">
          <div className="container">
            <h2>What Our Clients Say</h2>
            <div className="testimonials-slider">
              {testimonials.slice(0, 3).map(testimonial => (
                <div key={testimonial._id} className="testimonial-card">
                  {testimonial.photo && <img src={`https://citygym1.onrender.com${testimonial.photo}`} alt={testimonial.name} />}
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
