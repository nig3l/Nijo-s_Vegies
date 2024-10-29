import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { FaHeart, FaUser, FaShoppingBag, FaGift} from 'react-icons/fa';
import './header.css';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { getCartCount } = useCart();
    const navigate = useNavigate();

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
                    />
                    <button className="search-button">
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
                    {/* <div className="cart-wrapper">
                        <FaShoppingBag size={20} />
                        <span className="cart-amount">KSh109</span>
                        <span className="badge">1</span>
                    </div> */}

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
                    <FaGift /> Gifts And Flowers
                </button>
            </div>
        </header>
    );
};

export default Header;