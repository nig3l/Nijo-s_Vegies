import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/header';
import ProductList from './components/Productlist/Productlist';
import Features from './components/Features/Features';
import Footer from "./components/Footer/Footer";
import Checkout from './components/checkout/checkout';
import { CartProvider } from './components/cart/CartContext';
import Cart from './components/cart/Cart';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SearchResults from './components/SearchResults/SearchResults';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);


function App() {
  
  const [products, setProducts] = useState([]);

  useEffect(() => {
      fetch('/products.json') 
          .then(response => response.json())
          .then(data => setProducts(data))
          .catch(error => console.error('Error loading products:', error));
  }, []);
  

    return (
      <CartProvider>
        <Router>
          <div>
            <Header products={products}/>
            <Routes>
              <Route path="/" element={
                <>
                  <ProductList />
                  <Features />
                </>
              } />
              <Route path="/cart" element={<Cart />} />
              <Route path="/search" element={<SearchResults products={products} />} />
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


