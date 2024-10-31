import React from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from './Productcard' // Adjust the path based on where ProductCard is located
import './searchResults.css';


const SearchResults = ({ products }) => {
    const location = useLocation();
    const { searchTerm } = location.state || {}; // Retrieve search term from state

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="search-results">
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
      );
};

export default SearchResults;
