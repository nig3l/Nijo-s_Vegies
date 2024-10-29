import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

const Checkout = () => {
  const { productId } = useParams();
  const location = useLocation();
  const { product, quantity } = location.state || {};

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {product ? (
        <div>
          <h3>Order Summary</h3>
          <div>
            <img 
              src={product.image} 
              alt={product.name} 
              style={{ width: '200px', height: 'auto' }} 
            />
            <h4>{product.name}</h4>
            <p>Quantity: {quantity}</p>
            <p>Price per item: KSh{product.price}</p>
            <p>Total: KSh{product.price * quantity}</p>
            {/* payment form and other checkout fields here */}
          </div>
        </div>
      ) : (
        <p>No product selected. Please return to the shop.</p>
      )}
    </div>
  );
}

export default Checkout;