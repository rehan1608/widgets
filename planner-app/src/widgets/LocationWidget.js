import React, { useState, useEffect } from 'react';

export default function LocationWidget() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Get user's current location
    // Example:
    navigator.geolocation.getCurrentPosition(
      position => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      error => console.log(error)
    );
  }, []);

  return (
    <div>
      {location ? (
        <div>
          <h3>Your Location</h3>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      ) : (
        <p>Loading location data...</p>
      )}
    </div>
  );
}
