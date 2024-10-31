import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/')}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      <div className="cart-items">
        {cart.map(({ product, quantity }) => (
          <div key={product.id} className="cart-item">
            <img 
              src={product.image} 
              alt={product.name} 
              className="cart-item-image" 
            />
            <div className="cart-item-details">
              <h3>{product.name}</h3>
              <p>KSh{product.price} per item</p>
              <div className="cart-item-controls">
                <div className="quantity-control">
                  <button 
                    onClick={() => updateQuantity(product.id, Math.max(0, quantity - 1))}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => updateQuantity(product.id, parseInt(e.target.value) || 0)}
                    min="0"
                  />
                  <button 
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button 
                  className="remove-item"
                  onClick={() => removeFromCart(product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="cart-item-total">
              KSh{product.price * quantity}
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="cart-total">
          <h3>Total: KSh{getCartTotal()}</h3>
        </div>
        <div className="cart-actions">
          <button onClick={() => navigate('/')}>Continue Shopping</button>
          <button onClick={() => navigate('/checkout', { state: { cart } })} className="checkout-button">
                Proceed to Checkout
            </button>

        </div>
      </div>
    </div>
  );
};

export default Cart;