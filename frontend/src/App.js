import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import ProductList from './components/Productlist';
import Features from './components/Features';
import Footer from "./components/Footer/Footer";
import Checkout from './components/checkout'; // New checkout component
import { CartProvider } from './components/CartContext';
import Cart from './components/Cart';


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
            <Route path="/checkout/:productId" element={<Checkout />} />
          </Routes>
          <Footer />
        </div>
      </Router>

      </CartProvider>
      
    );
  }
  
  export default App;

