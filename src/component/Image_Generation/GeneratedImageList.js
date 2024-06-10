import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GeneratedImageList() {
  const [images, setImages] = useState([]);
  
  const fetchImages = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      const response = await axios.get('http://127.0.0.1:8000/api/img_gen/images/', {
        headers: {
          Authorization: `Bearer ${access_token}`
        },
      });
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {    
    fetchImages();
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <h2 style={{ width: '100%' }}>Generated Images</h2>
      {images.map(image => (
        <div key={image.id} style={{ width: 'calc(33.33% - 20px)', margin: '10px', textAlign: 'center' }}>
          <img src={`http://localhost:8000${image.image}`} alt={image.prompt} style={{ maxWidth: '100%', marginBottom: '10px', borderRadius: '5px' }} />
          {/* <p style={{ fontSize: '14px', color: '#555' }}>{image.prompt}</p> */}
        </div>
      ))}
    </div>
  );
}

export default GeneratedImageList;
