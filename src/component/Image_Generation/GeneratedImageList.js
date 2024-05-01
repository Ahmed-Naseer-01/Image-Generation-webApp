import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GeneratedImageList() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('/api/images/');
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, []);

  return (
    <div>
      <h2>Generated Images</h2>
      {images.map(image => (
        <div key={image.id}>
          <img src={image.image} alt={image.prompt} />
          <p>{image.prompt}</p>
        </div>
      ))}
    </div>
  );
}

export default GeneratedImageList;
