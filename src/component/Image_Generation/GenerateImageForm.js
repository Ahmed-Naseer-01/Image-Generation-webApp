import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

function GenerateImageForm() {
  const [prompt, setPrompt] = useState('');
  const [imageBase64, setImageBase64] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make an API call to generate the image based on the prompt
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/img_gen/generate/', {
        prompt,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (response.status === 200) {
        setImageBase64(response.data.image_base64);
        setError(null);
      } else {
        setError('Failed to generate image');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setError('An error occurred while processing your request');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        <button type="submit">Generate Image</button>
      </form>
      {error && <p>{error}</p>}
      {imageBase64 && (
        <div>
          <h2>Generated Image</h2>
          <img src={`data:image/jpeg;base64,${imageBase64}`} alt="" />
        </div>
      )}
    </div>
  );
}

export default GenerateImageForm;
