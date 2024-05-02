import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

function GenerateImageForm() {
  const [prompt, setPrompt] = useState('');
  const [imageBase64, setImageBase64] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Log the access token to the console
    console.log(localStorage.getItem('access_token'));
    const access_token = localStorage.getItem("access_token")

    // Make an API call to generate the image based on the prompt
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/img_gen/generate/', {
        prompt,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
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
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{ width: '70%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button
          type="submit"
          style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', background: '#007bff', color: '#fff', cursor: 'pointer' }}
        >
          Generate Image
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {imageBase64 && (
        <div>
          <h2 style={{ marginBottom: '10px' }}>Generated Image</h2>
          <img src={`data:image/jpeg;base64,${imageBase64}`} alt="Generated" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
}

export default GenerateImageForm;
