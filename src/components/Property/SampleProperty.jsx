import React from 'react';
import ReactDOM from 'react-dom';
import PropertyDetail from './PropertyDetail';

const SampleProperty = {
    images: [
        'https://via.placeholder.com/400x300',
        'https://via.placeholder.com/400x300',
        'https://via.placeholder.com/400x300',
    ],
    title: 'Beautiful Beach House',
    description: 'This beautiful beach house offers stunning ocean views and modern amenities. It is located just steps from the sandy shores and is perfect for a relaxing getaway.',
    amenities: ['3 Bedrooms', '2 Bathrooms', 'Fully Equipped Kitchen', 'Private Pool', 'Wi-Fi'],
    price: '3500',
    contact: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
    },
};

ReactDOM.render(<PropertyDetail property={SampleProperty} />, document.getElementById('root'));