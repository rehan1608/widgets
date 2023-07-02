import React, { useState } from 'react';
import '../styles/PhotoWidget.css'
export default function PhotoWidget() {
  const [photos, setPhotos] = useState([]);
  const [zoomedPhoto, setZoomedPhoto] = useState(null);

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos((prevPhotos) => [...prevPhotos, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePhoto = (index) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  const handleZoomPhoto = (photo) => {
    setZoomedPhoto(photo);
  };

  const handleCloseZoom = () => {
    setZoomedPhoto(null);
  };

  return (
    <div>
      <h3>Photo Gallery</h3>
      <input className="input-image" type="file" accept="image/*" onChange={handlePhotoUpload} />
      <div className="photo-gallery">
        {photos.map((photo, index) => (
          <div key={index} className="photo-container">
            <img
              src={photo}
              alt={`Photo ${index}`}
              className="photo"
              onClick={() => handleZoomPhoto(photo)}
            />
            <button className="delete-button" onClick={() => handleDeletePhoto(index)}>
              &#10006;
            </button>
          </div>
        ))}
      </div>
      {zoomedPhoto && (
        <div className="zoom-modal">
          <div className="zoom-content">
            <img src={zoomedPhoto} alt="Zoomed Photo" className="zoomed-photo" />
            <button className="close-zoom" onClick={handleCloseZoom}>
              &#10006;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
