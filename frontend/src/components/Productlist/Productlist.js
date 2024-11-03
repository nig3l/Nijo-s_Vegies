import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.css';
import { useNavigate } from 'react-router-dom';
import onionImage from '../assets/onions.jpg';
import tomatoImage from '../assets/tomato.jpg';
import cilantroImage from '../assets/cilantro.jpg';
import kalesImage from '../assets/kales.jpg';
import redcabbageImage from '../assets/redcabbage.jpg';
import spinachImage from '../assets/spinach.jpg';
import carrotsImage from '../assets/carrots.jpg';

const products = [
  {
    id: 1,
    name: 'Red Onions - (Appx. 10 Pieces) Per Kg',
    price: 109,
    originalPrice: null,
    isSale: false,
    image: onionImage,
  },

  {
    id: 2,
    name: 'Tomatoes - (Appx. 8 Pieces) Per Kg',
    price: 79,
    originalPrice: null,
    isSale: false,
    image: tomatoImage,
  },
  {
    id: 3,
    name: 'Carrots - (Appx. 10 Pieces) Per Kg',
    price: 79,
    originalPrice: null,
    isSale: false,
    image: carrotsImage,
  },
  {
    id: 4,
    name: '(sukuma wiki)Collard Greens -  Per Bunch',
    price: 35,
    originalPrice: null,
    isSale: false,
    image: kalesImage,
  },
  {
    id: 5,
    name: '(Spinach) Swiss Chard -  Per Bunch',
    price: 35,
    originalPrice: null,
    isSale: false,
    image: spinachImage,
  },
  {
    id: 6,
    name: '(Dhania) Cilantro - Per Bunch',
    price: 29,
    originalPrice: null,
    isSale: false,
    image: cilantroImage,
  },
  {
    id: 7,
    name: 'Red Cabbage - (Appx. 1 Head) per Kg ',
    price: 109,
    originalPrice: null,
    isSale: false,
    image: redcabbageImage,
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
