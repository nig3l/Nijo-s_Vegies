import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import ProductList from './components/Productlist';
import Features from './components/Features';
import Footer from "./components/Footer/Footer";
import Checkout from './components/checkout'; 
import { CartProvider } from './components/CartContext';
import Cart from './components/Cart';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function App() {
    return (
      <CartProvider>
        <Router>
          <div>
            <Header />
            <Routes>
              <Route path="/" element={
                <>
                  <ProductList />
                  <Features />
                </>
              } />
              <Route path="/cart" element={<Cart />} />
              <Route 
                   path="/checkout" 
                   element={
                <Elements stripe={stripePromise}>
           <Checkout />
      </Elements>
       }/>

            </Routes>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    );
  }
  
export default App;


