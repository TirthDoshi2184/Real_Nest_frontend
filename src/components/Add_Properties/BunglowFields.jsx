import React from 'react';

const BungalowFields = ({ formData, handleChange }) => {
  return (
    <div className="property-specific-fields">
      <h3>Bungalow Details</h3>

      {/* Type */}
      <div className="form-group">
        <label>Bungalow Type *</label>
        <div className="radio-group">
          {['Villa', 'Duplex', 'Independent House'].map(type => (
            <label key={type}>
              <input
                type="radio"
                name="type"
                value={type}
                checked={formData.type === type}
                onChange={handleChange}
                required
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* Area */}
      <div className="form-group">
        <label htmlFor="area">Total Area (sq ft) *</label>
        <input
          type="number"
          id="area"
          name="area"
          value={formData.area || ''}
          onChange={handleChange}
          placeholder="Enter area in square feet"
          required
        />
      </div>

      {/* Bedrooms */}
      <div className="form-group">
        <label htmlFor="bedrooms">Bedrooms *</label>
        <input
          type="number"
          id="bedrooms"
          name="bedrooms"
          value={formData.bedrooms || ''}
          onChange={handleChange}
          min="1"
          required
        />
      </div>

      {/* Bathrooms */}
      <div className="form-group">
        <label htmlFor="bathrooms">Bathrooms *</label>
        <input
          type="number"
          id="bathrooms"
          name="bathrooms"
          value={formData.bathrooms || ''}
          onChange={handleChange}
          min="1"
          required
        />
      </div>

      {/* Parking */}
      <div className="form-group">
        <label htmlFor="parking">Parking Spaces</label>
        <input
          type="number"
          id="parking"
          name="parking"
          value={formData.parking || 0}
          onChange={handleChange}
          min="0"
        />
      </div>

      {/* Amenities */}
      <div className="form-group">
        <label htmlFor="amenities">Amenities</label>
        <textarea
          id="amenities"
          name="amenities"
          value={formData.amenities || ''}
          onChange={handleChange}
          rows="3"
          placeholder="e.g., Garden, Swimming Pool, Security"
        />
      </div>
    </div>
  );
};

export default BungalowFields;
