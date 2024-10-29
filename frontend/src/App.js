import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import ProductList from './components/Productlist';
import Features from './components/Features';
import Footer from "./components/Footer/Footer";
import Checkout from './components/checkout'; // New checkout component

function App() {
    return (
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
            <Route path="/checkout/:productId" element={<Checkout />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    );
  }
  
  export default App;

