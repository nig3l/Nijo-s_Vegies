import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import './Productcard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      {product.isSale && <span className="sale-tag">Sale</span>}
      <img src={product.image} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">
        {product.isSale && <span className="original-price">KSh{product.originalPrice}</span>}
        KSh{product.price}
      </p>
      <div className="quantity-control">
        <button>-</button>
        <input type="number" value={1} readOnly />
        <button>+</button>
      </div>
      <button className="add-to-cart">
        <FaShoppingCart />
      </button>
    </div>
  );
};

export default ProductCard;
