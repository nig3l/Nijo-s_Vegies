import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';  // Updated import
import LandingPage from './pages/LandingPage';
import Login from './components/auth/Login';
import Header from './components/Header/header';
import FooterSection from './components/Footer/Footer';
import Features from './components/Features/Features';
import ProductList from './components/Productlist/ProductList';
import ProductCard from './components/Productcard/ProductCard';
import SignUp from './components/auth/SignUp';
import { CartProvider } from './components/cart/CartContext';
import './pages/LandingPage.css';
import './components/auth/Auth.css';

const supabaseClient = createClient(
  process.env.REACT_APP_SUPABASE_URL || '',
  process.env.REACT_APP_SUPABASE_ANON_KEY || ''
);

function App() {
  return (
    <SessionContextProvider supabaseClient={supabaseClient}>  {/* Updated component name */}
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route 
              path="/products" 
              element={
                <>
                  <Header />
                  <ProductList />
                  <ProductCard />
                  <Features />
                  <FooterSection />
                </>
              } 
            />
          </Routes>
        </Router>
      </CartProvider>
    </SessionContextProvider>
  );
}

export default App;