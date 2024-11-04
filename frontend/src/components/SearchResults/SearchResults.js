import React from 'react';
import { useLocation } from 'react-router-dom';
import './searchResults.css';
import onionImage from '../assets/onions.jpg';
import tomatoImage from '../assets/tomato.jpg';
import cilantroImage from '../assets/cilantro.jpg';
import kalesImage from '../assets/kales.jpg';
import redcabbageImage from '../assets/redcabbage.jpg';
import spinachImage from '../assets/spinach.jpg';
import carrotsImage from '../assets/carrots.jpg'

const SearchResults = () => {
  const location = useLocation();
  const { searchTerm } = location.state || {};


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

  const filteredProducts = searchTerm 
      ? products.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  return (
      <div className="search-results">
          <h2>Search Results for: {searchTerm}</h2>
          {filteredProducts.length === 0 ? (
              <p>No products found matching "{searchTerm}"</p>
          ) : (
              <div className="products-grid">
                  {filteredProducts.map(product => (
                      <div key={product.id} className="product-card">
                          {product.isSale && <div className="sale-tag">Sale</div>}
                          <img src={product.image} alt={product.name} className="product-image" />
                          <h3 className="product-name">{product.name}</h3>
                          <p className="product-price">KES {product.price}</p>
                          {product.originalPrice && (
                              <span className="original-price">KES {product.originalPrice}</span>
                          )}
                          <button className="add-to-cart">Add to Cart</button>
                      </div>
                  ))}
              </div>
          )}
      </div>
  );
};

export default SearchResults;