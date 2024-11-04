import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { FaHeart, FaUser, FaShoppingBag, FaGift} from 'react-icons/fa';
import './header.css';
import { useCart } from '../cart/CartContext';
import { useWallet } from '../../context/WalletContext';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../context/ProfileContext';

const Header = () => {
    const { getCartCount } = useCart();
    const navigate = useNavigate();
    const { walletBalance } = useWallet();
    const [searchTerm ,setSearchTerm] = useState('');
    const { profileData } = useProfile();

    const handleSearch = () => {
        if (searchTerm) {
            navigate('/search', { state: { searchTerm } }); // Navigate with search term as state
        }
    };

    return (
        <header>
            <div className="top-banner">
                WELCOME TO NIGEL'S VEGIES, SHOP NOW & SAVE!!! FIRST ORDERS' ON US 🚚
            </div>

            <div className="main-header">
                <div className="logo-container" onClick={() => navigate('/products')}>
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

                    <div className="account-wrapper" onClick={() => navigate('/profile')}>
                      {profileData.avatarUrl ? (
                        <img 
                          src={profileData.avatarUrl} 
                          alt="Profile" 
                          className="profile-avatar"
                          style={{ width: '20px', height: '20px', borderRadius: '50%' }}
                        />
                      ) : (
                        <FaUser size={20} />
                      )}
                      <span className="account-text">{profileData.username}</span>
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