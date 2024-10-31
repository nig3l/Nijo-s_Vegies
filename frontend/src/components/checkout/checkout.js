import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './checkout.css';  
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { useCart } from ''


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);


{/* <Elements stripe={stripePromise}>
  <Checkout />
</Elements> */}

const Checkout = () => {
  const { productId } = useParams();
  const location = useLocation();
  const { cart = [] } = location.state || {};
  const {quantity } = location.state || {};
  const stripe = useStripe();
  const elements = useElements()
  const product = cart[0]?.product;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      setError(null);

      try {
        // payment intent
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            amount: cart.reduce((acc, { product, quantity }) => acc + product.price * quantity, 0),
            currency: 'kes',
            customer_email: formData.email,
            metadata: {
              cart: cart.map(({ product, quantity }) => ({
                product_id: product.id,
                quantity,
              })),
            },
          }),
          
          // body: JSON.stringify({
          //   amount: product.price * quantity,
          //   currency: 'kes',
          //   customer_email: formData.email,
          //   metadata: {
          //     product_id: productId,
          //     quantity: quantity,
            // }
          // }),
        });

        if (!response.ok) {
          throw new Error('Failed to create payment intent');
        }

        const { clientSecret } = await response.json();

        // Load Stripe.js
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

        //Confirm the payment
        const result = await stripe.confirmPayment({
          clientSecret,
          payment_method: {
            card: elements.getElement(CardElement) ,
            billing_details: {
              name: formData.fullName,
              email: formData.email,
              phone: formData.phone,
              address: {
                line1: formData.address,
                city: formData.city,
              },
            },
          },
          return_url: `${window.location.origin}/payment-confirmation`,
        });

        if (result.error) {
          throw new Error(result.error.message);
        }

        // Payment successful - redirect or show success message
        window.location.href = '/payment-success';

      } catch (err) {
        setError(err.message || 'Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  if (!product) {
    return (
      <div className="empty-cart-message">
        No product selected. Please return to the shop.
      </div>
    );
  }

  return (

    <Elements stripe={stripePromise}>
    <div className="checkout-container">
    <div className="order-summary">
      <h2>Order Summary</h2>
   {cart.map(({ product, quantity }) => (
    <div key={product.id} className="summary-details">
      <p className="product-name">{product.name}</p>
      <p>Quantity: {quantity}</p>
      <p>Price per item: KSh{product.price}</p>
      <p className="total-price">Total: KSh{product.price * quantity}</p>
    </div>
  ))}
  <p className="overall-total">Grand Total: KSh{cart.reduce((acc, { product, quantity }) => acc + product.price * quantity, 0)}</p>
</div>


      <div className="payment-section">
        <h2>Payment Details</h2>
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="payment-form">
          <div className="form-grid">
            {/* Personal Information */}
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={errors.fullName ? "error" : ""}
                disabled={loading}
              />
              {errors.fullName && <span className="error-text">{errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
                disabled={loading}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? "error" : ""}
                disabled={loading}
              />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={errors.address ? "error" : ""}
                disabled={loading}
              />
              {errors.address && <span className="error-text">{errors.address}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={errors.city ? "error" : ""}
                disabled={loading}
              />
              {errors.city && <span className="error-text">{errors.city}</span>}
            </div>

            {/* Stripe Card Element */}
            <div className="form-group">
              <label>Card Details</label>
              <input
              type="text"
              />
              {/* <div id="card-element" className="card-element" /> */}
            </div>
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? (
              <span className="loading-text">
                Processing...
              </span>
            ) : (
              `Pay KSh`
            )}
          </button>
        </form>
      </div>
    </div>
    </Elements>
  );
};

export default Checkout;