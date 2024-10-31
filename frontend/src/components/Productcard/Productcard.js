import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Productcard.css';
import { useCart } from '../cart/CartContext';

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(0);
  const { addToCart } = useCart();

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setQuantity(value);
    }
  };

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity(prev => prev > 0 ? prev - 1 : 0);
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(product, quantity);
      setQuantity(0); // Reset quantity after adding to cart
    }
  };

  return (
    <div className="product-card">
      {product.isSale && <span className="sale-tag">Sale</span>}
      
      <img 
        src={product.image} 
        alt={product.name} 
        className="product-image" 
      />
      
      <h3 className="product-name">{product.name}</h3>
      
      <p className="product-price">
        {product.isSale && (
          <span className="original-price">
            KSh{product.originalPrice}
          </span>
        )}
        KSh{product.price}
      </p>
      
      <div className="quantity-control">
        <button onClick={handleDecrement}>-</button>
        <input 
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          min="0"
        />
        <button onClick={handleIncrement}>+</button>
      </div>
      
      <button 
        className="add-to-cart"
        onClick={handleAddToCart}
      >
        <FaShoppingCart />
      </button>
    </div>
  );
};

export default React.memo(ProductCard);