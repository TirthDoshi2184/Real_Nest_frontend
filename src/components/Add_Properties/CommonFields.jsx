import React from 'react';

const CommonFields = ({ formData, handleChange, errors }) => {
  return (
    <div className="common-fields">
      <h3>Basic Information</h3>
      
      {/* Title */}
      <div className="form-group">
        <label htmlFor="title">Property Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title || ''}
          onChange={handleChange}
          placeholder="e.g., Spacious 3BHK Flat in Prime Location"
          required
        />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>

      {/* Description */}
      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          rows="4"
          placeholder="Describe your property..."
          required
        />
        {errors.description && <span className="error">{errors.description}</span>}
      </div>

      {/* Price */}
      <div className="form-group">
        <label htmlFor="price">Price (₹) *</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price || ''}
          onChange={handleChange}
          placeholder="Enter price"
          required
        />
        {errors.price && <span className="error">{errors.price}</span>}
      </div>

      {/* Interior Type */}
      <div className="form-group">
        <label htmlFor="interiorType">Interior Type *</label>
        <select
          id="interiorType"
          name="interiorType"
          value={formData.interiorType || ''}
          onChange={handleChange}
          required
        >
          <option value="">Select Interior Type</option>
          <option value="Fully Furnished">Fully Furnished</option>
          <option value="Semi-Furnished">Semi-Furnished</option>
          <option value="Unfurnished">Unfurnished</option>
        </select>
        {errors.interiorType && <span className="error">{errors.interiorType}</span>}
      </div>

      {/* Location */}
      <div className="form-group">
        <label htmlFor="location">Location *</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location || ''}
          onChange={handleChange}
          placeholder="e.g., Satellite, Ahmedabad"
          required
        />
        {errors.location && <span className="error">{errors.location}</span>}
      </div>

      {/* Address */}
      <div className="form-group">
        <label htmlFor="address">Complete Address *</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address || ''}
          onChange={handleChange}
          placeholder="Enter full address"
          required
        />
        {errors.address && <span className="error">{errors.address}</span>}
      </div>

      {/* City */}
      <div className="form-group">
        <label htmlFor="city">City *</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city || ''}
          onChange={handleChange}
          placeholder="Enter city"
          required
        />
        {errors.city && <span className="error">{errors.city}</span>}
      </div>

      {/* Pincode */}
      <div className="form-group">
        <label htmlFor="pincode">Pincode *</label>
        <input
          type="text"
          id="pincode"
          name="pincode"
          value={formData.pincode || ''}
          onChange={handleChange}
          placeholder="Enter pincode"
          maxLength="6"
          pattern="[0-9]{6}"
          required
        />
        {errors.pincode && <span className="error">{errors.pincode}</span>}
      </div>

      {/* Status */}
      <div className="form-group">
        <label htmlFor="status">Property Status *</label>
        <select
          id="status"
          name="status"
          value={formData.status || 'Available'}
          onChange={handleChange}
          required
        >
          <option value="Available">Available</option>
          <option value="Sold">Sold</option>
          <option value="Reserved">Reserved</option>
          <option value="Rented">Rented</option>
        </select>
      </div>

      {/* Availability */}
      <div className="form-group">
        <label>Available For *</label>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="isAvailableForSale"
              checked={formData.isAvailableForSale || false}
              onChange={handleChange}
            />
            Sale
          </label>
          <label>
            <input
              type="checkbox"
              name="isAvailableForRent"
              checked={formData.isAvailableForRent || false}
              onChange={handleChange}
            />
            Rent
          </label>
        </div>
      </div>
    </div>
  );
};

export default CommonFields;
