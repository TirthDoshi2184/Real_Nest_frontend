import React from 'react';
import PropertyForm from './PropertyForm';

const AddFlat = () => {
  const flatFields = [
    {
      name: 'type',
      label: 'Type of Flat',
      type: 'radio',
      options: ['2BHK', '3BHK', '4BHK']
    },
    {
      name: 'interiorType',
      label: 'Interior Type',
      type: 'select',
      options: ['Fully Furnished', 'Semi-Furnished', 'Unfurnished']
    },
    {
      name: 'sqrft',
      label: 'Square Feet',
      type: 'text',
      inputType: 'number'
    },
    {
      name: 'price',
      label: 'Price',
      type: 'text',
      inputType: 'number'
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: ['Available', 'Sold', 'Reserved']
    },
    {
      name: 'user',
      label: 'User',
      type: 'text'
    },
    {
      name: 'review',
      label: 'Review',
      type: 'text'
    },
    {
      name: 'availableForRent',
      label: 'Available for Rent',
      type: 'checkbox'
    },
    {
      name: 'society',
      label: 'Society',
      type: 'text'
    },
    {
      name: 'city',
      label: 'City',
      type: 'text'
    },
    {
      name: 'address',
      label: 'Address',
      type: 'text'
    }
  ];

  return (
    <PropertyForm 
      propertyType="Flat"
      fields={flatFields}
      apiEndpoint="http://localhost:3000/flat/insertflat"
    />
  );
};

export default AddFlat;