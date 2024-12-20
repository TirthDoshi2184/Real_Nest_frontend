import React from 'react';
import PropertyForm from './PropertyForm';

const AddShop = () => {
  const shopFields = [
    {
      name: 'interiorType',
      label: 'Interior Type',
      type: 'select',
      options: ['Fully Fitted', 'Shell & Core', 'Bare']
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
      name: 'isAvailableForRent',
      label: 'Available for Rent',
      type: 'checkbox'
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text'
    }
  ];

  return (
    <PropertyForm 
      propertyType="Shop"
      fields={shopFields}
      apiEndpoint="http://localhost:3000/shop/insertshop"
    />
  );
};

export default AddShop;