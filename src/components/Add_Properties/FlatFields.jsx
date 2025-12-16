import React from 'react';

const FlatFields = ({ formData, handleChange }) => {
  return (
    <div className="property-specific-fields">
      <h3>Flat Details</h3>

      {/* Type */}
      <div className="form-group">
        <label>Flat Type *</label>
        <div className="radio-group">
          {['1BHK', '2BHK', '3BHK', '4BHK', 'Studio'].map(type => (
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

      {/* Square Feet */}
      <div className="form-group">
        <label htmlFor="sqrft">Area (sq ft) *</label>
        <input
          type="number"
          id="sqrft"
          name="sqrft"
          value={formData.sqrft || ''}
          onChange={handleChange}
          placeholder="Enter area in square feet"
          required
        />
      </div>

      {/* Society */}
      <div className="form-group">
        <label htmlFor="society">Society/Building Name</label>
        <input
          type="text"
          id="society"
          name="society"
          value={formData.society || ''}
          onChange={handleChange}
          placeholder="Enter society name"
        />
      </div>

      {/* Floor Number */}
      <div className="form-group">
        <label htmlFor="floorNumber">Floor Number *</label>
        <input
          type="number"
          id="floorNumber"
          name="floorNumber"
          value={formData.floorNumber || ''}
          onChange={handleChange}
          min="0"
          placeholder="Ground floor = 0"
          required
        />
      </div>

      {/* Total Floors */}
      <div className="form-group">
        <label htmlFor="totalFloors">Total Floors in Building *</label>
        <input
          type="number"
          id="totalFloors"
          name="totalFloors"
          value={formData.totalFloors || ''}
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
    </div>
  );
};

export default FlatFields;