import React, { useState } from 'react';

const ImageUpload = ({ onImageSelect, currentImage }) => {
  const [preview, setPreview] = useState(currentImage || null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid image file (JPG, PNG, WEBP)');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Pass file to parent
      onImageSelect(file);
    }
  };

  const removeImage = () => {
    setPreview(null);
    onImageSelect(null);
  };

  return (
    <div className="form-group image-upload">
      <label>Property Image *</label>
      
      {!preview ? (
        <div className="upload-area">
          <input
            type="file"
            id="propertyImage"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          <label htmlFor="propertyImage" className="upload-label">
            <div className="upload-content">
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2"/>
                <polyline points="17 8 12 3 7 8" stroke="currentColor" strokeWidth="2"/>
                <line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <p>Click to upload property image</p>
              <span>PNG, JPG, WEBP (max 5MB)</span>
            </div>
          </label>
        </div>
      ) : (
        <div className="image-preview">
          <img src={preview} alt="Property preview" />
          <button type="button" onClick={removeImage} className="remove-btn">
            Remove Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;

