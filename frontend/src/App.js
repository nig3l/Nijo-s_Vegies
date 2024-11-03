import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { WalletProvider } from './context/WalletContext';
import LandingPage from './pages/LandingPage';
import Login from './components/auth/Login';
import Header from './components/Header/header';
import Footer from './components/Footer/Footer';
import Features from './components/Features/Features';
import ProductList from './components/ProductList/ProductList';
import ProductCard from './components/ProductCard/ProductCard';
import SignUp from './components/auth/SignUp';
import { CartProvider } from './components/cart/CartContext';
import Cart from './components/cart/Cart';
import WalletDashboard from './pages/WalletDashboard';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Checkout from './components/checkout/checkout';
import ProfilePage from './pages/ProfilePage';
import './pages/LandingPage.css';
import './components/auth/Auth.css';

const supabaseClient = createClient(
  process.env.REACT_APP_SUPABASE_URL || '',
  process.env.REACT_APP_SUPABASE_ANON_KEY || ''
);

function App() {
  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <WalletProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />       
              <Route path="/checkout" element={
                <ProtectedRoute>
                  <div>
                    <Header />
                    <Checkout />
                    <Footer />
                  </div>
                </ProtectedRoute>
              } />
              <Route path="/products" element={
                <ProtectedRoute>
                  <div>
                    <Header />
                    <ProductList />
                    <ProductCard />
                    <Features />
                    <Footer />
                  </div>
                </ProtectedRoute>
              } />
              <Route path="/wallet" element={
                <ProtectedRoute>
                  <div>
                    <Header />
                    <WalletDashboard />
                    <Footer />
                  </div>
                </ProtectedRoute>
              } />
              <Route path="/cart" element={
                <ProtectedRoute>
                  <div>
                    <Header />
                    <Cart />
                    <Footer />
                  </div>
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <div>
                    <Header />
                    <ProfilePage />
                    <Footer />
                  </div>
                </ProtectedRoute>
              } />
       
            </Routes>
          </Router>
        </CartProvider>
      </WalletProvider>
    </SessionContextProvider>
  );
}

export default App;