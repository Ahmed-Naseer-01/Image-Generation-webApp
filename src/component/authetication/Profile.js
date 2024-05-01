import React, { useState, useEffect } from 'react';

function Profile() {
  const [userData, setUserData] = useState(null);

  const fetchProfile = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/user/profile/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    

    if (response.ok) {
      const data = await response.json();
      console.log(data)
      setUserData(data);
    } else {
      console.error('Failed to fetch profile');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div>
      {userData ? (
        <div>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default Profile;
