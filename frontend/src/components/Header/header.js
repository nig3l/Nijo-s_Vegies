import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { FaHeart, FaUser, FaShoppingBag, FaGift} from 'react-icons/fa';
import './header.css';
import { useCart } from '../cart/CartContext';
import { useWallet } from '../../context/WalletContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { getCartCount } = useCart();
    const navigate = useNavigate();
    const { walletBalance } = useWallet();
    const [searchTerm ,setSearchTerm] = useState('');

    const handleSearch = () => {
        if (searchTerm) {
            navigate('/search', { state: { searchTerm } }); // Navigate with search term as state
        }
    };



    return (
        <header>
            <div className="top-banner">
                FREE DELIVERY ON ORDERS OVER KES 3000! SHOP NOW & SAVE! 🚚
            </div>

            <div className="main-header">
                <div className="logo-container">
                    <span className="est-year">EST. 2024</span>
                    <div className="brand-name">Nigel's Vegies</div>
                    <div className="brand-subtitle">Food Market</div>
                </div>

                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search"
                        className="search-input"
                        value={searchTerm}
                        onChange={(e)=> setSearchTerm(e.target.value)}
                        
                    />
                    <button className="search-button" onClick={handleSearch}>
                        Search
                    </button>
                </div>

               
                <div className="icons-section">

                    {/* <div className="icon-wrapper">
                        <FaHeart size={20} />
                        <span className="badge">0</span>
                    </div> */}

                    <div className="account-wrapper">
                        <FaUser size={20} />
                        <span className="account-text">My Account</span>
                    </div>
                    <div className="wallet-wrapper" onClick={() => navigate('/wallet')}>
                        <FaShoppingBag size={20} />
                        <div className="wallet-details">
                            <span className="wallet-balance">KSh {walletBalance}</span>
                            <button className="deposit-btn">Top Up</button>
                        </div>
                        <span className="wallet-label">My Wallet</span>
                    </div>
                    <div className="cart-icon" onClick={() => navigate('/cart')}>
                    <FaShoppingCart size={30} />
                   <span className="cart-count">{getCartCount()}</span>
                  </div>

                </div>
            </div>

            <nav className="category-nav">
                <span>FRUIT</span>
                <span>VEG</span>
                <span>NEW IN</span>
                <span>OFFERS</span>
            </nav>

            <div className="cta-container">
                <button className="cta-button">
                    <FaGift /> Healthy Living
                </button>
            </div>
        </header>
    );
};

export default Header;