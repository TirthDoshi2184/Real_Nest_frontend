import React from 'react';

const ShopFields = ({ formData, handleChange }) => {
  return (
    <div className="property-specific-fields">
      <h3>Shop Details</h3>

      {/* Shop Type */}
      <div className="form-group">
        <label htmlFor="shopType">Shop Type *</label>
        <select
          id="shopType"
          name="shopType"
          value={formData.shopType || ''}
          onChange={handleChange}
          required
        >
          <option value="">Select Shop Type</option>
          <option value="Retail">Retail Shop</option>
          <option value="Office Space">Office Space</option>
          <option value="Showroom">Showroom</option>
          <option value="Warehouse">Warehouse</option>
        </select>
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

      {/* Shop Number */}
      <div className="form-group">
        <label htmlFor="shopNumber">Shop Number</label>
        <input
          type="text"
          id="shopNumber"
          name="shopNumber"
          value={formData.shopNumber || ''}
          onChange={handleChange}
          placeholder="e.g., Shop No. 12"
        />
      </div>

      {/* Commercial Complex */}
      <div className="form-group">
        <label htmlFor="commercialComplex">Commercial Complex/Mall Name</label>
        <input
          type="text"
          id="commercialComplex"
          name="commercialComplex"
          value={formData.commercialComplex || ''}
          onChange={handleChange}
          placeholder="Enter complex name"
        />
      </div>

      {/* Floor */}
      <div className="form-group">
        <label htmlFor="floorNumber">Floor Number</label>
        <input
          type="number"
          id="floorNumber"
          name="floorNumber"
          value={formData.floorNumber || 0}
          onChange={handleChange}
          min="0"
          placeholder="Ground floor = 0"
        />
      </div>

      {/* Frontage */}
      <div className="form-group">
        <label htmlFor="frontageSize">Frontage Size (feet)</label>
        <input
          type="number"
          id="frontageSize"
          name="frontageSize"
          value={formData.frontageSize || ''}
          onChange={handleChange}
          placeholder="Width of shop front"
        />
      </div>
    </div>
  );
};

export default ShopFields;