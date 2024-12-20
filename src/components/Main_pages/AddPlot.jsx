import React from 'react';
import PropertyForm from './PropertyForm';

const AddPlot = () => {
  const plotFields = [
    {
      name: 'area',
      label: 'Area (in sq meters)',
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
      name: 'location',
      label: 'Location',
      type: 'text'
    },
    {
      name: 'contact',
      label: 'Contact Number',
      type: 'text',
      inputType: 'tel'
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
      name: 'status',
      label: 'Status',
      type: 'select',
      options: ['Available', 'Sold', 'Reserved']
    },
    {
      name: 'user',
      label: 'User',
      type: 'text'
    }
  ];

  return (
    <PropertyForm 
      propertyType="Plot"
      fields={plotFields}
      apiEndpoint="http://localhost:3000/plot/insertplot"
    />
  );
};

export default AddPlot;