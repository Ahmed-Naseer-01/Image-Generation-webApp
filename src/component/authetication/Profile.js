import React, { useState, useEffect } from 'react';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/user/profile/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUserData(data);
      } else {
        console.error('Failed to fetch profile');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      {loading ? (
        <p>Loading profile...</p>
      ) : (
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
          <h2 style={{ marginBottom: '20px' }}>User Profile</h2>
          {userData && (
            <div>
              <p><strong>Name:</strong> {userData.name}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Bio:</strong> {userData.bio}</p>
              <img
                src={`http://localhost:8000${userData.avatar_url}`}
                alt="Avatar"
                style={{ maxWidth: '100%', borderRadius: '5px' }}
              />
              {/* Render other fields similarly */}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
