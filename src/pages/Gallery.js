import React, { useState, useEffect } from 'react';
import API from '../utils/api';

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = (type = '') => {
    const url = type ? `/gallery?type=${type}` : '/gallery';
    API.get(url).then(res => setGallery(res.data)).catch(err => console.log(err));
  };

  const handleFilter = (type) => {
    setFilter(type);
    if (type === 'all') {
      loadGallery();
    } else {
      loadGallery(type);
    }
  };

  return (
    <div className="section">
      <div className="container">
        <h2>Gallery</h2>
        <p style={{textAlign: 'center', maxWidth: '700px', margin: '0 auto 2rem', color: '#666', fontSize: '1.1rem'}}>Explore our state-of-the-art facilities and inspiring transformation stories</p>
        <div className="gallery-filters">
          <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => handleFilter('all')}>All</button>
          <button className={`filter-btn ${filter === 'gym' ? 'active' : ''}`} onClick={() => handleFilter('gym')}>Gym Photos</button>
          <button className={`filter-btn ${filter === 'workout' ? 'active' : ''}`} onClick={() => handleFilter('workout')}>Workout</button>
          <button className={`filter-btn ${filter === 'transformation' ? 'active' : ''}`} onClick={() => handleFilter('transformation')}>Transformations</button>
          <button className={`filter-btn ${filter === 'video' ? 'active' : ''}`} onClick={() => handleFilter('video')}>Videos</button>
        </div>
        {gallery.length === 0 && (
          <div style={{textAlign: 'center', padding: '3rem', color: '#999'}}>
            <p style={{fontSize: '1.2rem'}}>No images available yet. Check back soon!</p>
          </div>
        )}
        <div className="gallery-grid">
          {gallery.map(item => (
            <div key={item._id} className="gallery-item">
              {item.type === 'video' ? (
                <video src={item.url?.startsWith('http') ? item.url : `https://citygym1.onrender.com${item.url}`} controls style={{width: '100%', height: '250px'}} />
              ) : (
                <img 
                  src={item.url?.startsWith('http') ? item.url : `https://citygym1.onrender.com${item.url}`} 
                  alt={item.title}
                  onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400'}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
