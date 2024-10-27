import React from 'react';
import ProductCard from './Productcard';
import './Productlist.css';

const products = [
  {
    id: 1,
    name: 'Red Onions - (Appx. 10 Pieces) Per Kg',
    price: 109,
    originalPrice: null,
    isSale: false,
    image: '/path/to/red-onion-image.jpg',
  },

  {
    id: 1,
    name: 'Red Onions - (Appx. 10 Pieces) Per Kg',
    price: 109,
    originalPrice: null,
    isSale: false,
    image: '/path/to/red-onion-image.jpg',
  },
  {
    id: 1,
    name: 'Red Onions - (Appx. 10 Pieces) Per Kg',
    price: 109,
    originalPrice: null,
    isSale: false,
    image: '/path/to/red-onion-image.jpg',
  },
  {
    id: 1,
    name: 'Red Onions - (Appx. 10 Pieces) Per Kg',
    price: 109,
    originalPrice: null,
    isSale: false,
    image: '/path/to/red-onion-image.jpg',
  },
  {
    id: 1,
    name: 'Red Onions - (Appx. 10 Pieces) Per Kg',
    price: 109,
    originalPrice: null,
    isSale: false,
    image: '/path/to/red-onion-image.jpg',
  },
  {
    id: 1,
    name: 'Red Onions - (Appx. 10 Pieces) Per Kg',
    price: 109,
    originalPrice: null,
    isSale: false,
    image: '/path/to/red-onion-image.jpg',
  },
  {
    id: 1,
    name: 'Red Onions - (Appx. 10 Pieces) Per Kg',
    price: 109,
    originalPrice: null,
    isSale: false,
    image: '/path/to/red-onion-image.jpg',
  },
  
  
];

const ProductList = () => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
