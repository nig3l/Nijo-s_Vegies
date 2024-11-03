import React, { useState ,useEffect} from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { FaHeart, FaUser, FaShoppingBag, FaGift} from 'react-icons/fa';
import './header.css';
import { useCart } from '../cart/CartContext';
import { useWallet } from '../../context/WalletContext';
import { useNavigate } from 'react-router-dom';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';

const Header = () => {
    const { getCartCount } = useCart();
    const navigate = useNavigate();
    const { walletBalance } = useWallet();
    const [searchTerm ,setSearchTerm] = useState('');
    const session = useSession();
    const supabase = useSupabaseClient();
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [username, setUsername] = useState('My Account');

    useEffect(() => {
        if (session?.user) {
          // Get user profile data
          const getProfile = async () => {
            const { data, error } = await supabase
              .from('profiles')
              .select('username, avatar_url')
              .eq('id', session.user.id)
              .single();
    
            if (data) {
              setUsername(data.username || session.user.email);
              setAvatarUrl(data.avatar_url);
            }
          };
    
          getProfile();
        }
      }, [session, supabase]);


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

                    {/* <div className="icon-wrapper">
                        <FaHeart size={20} />
                        <span className="badge">0</span>
                    </div> */}

                <div className="account-wrapper" onClick={() => navigate('/profile')}>
                      {avatarUrl ? (
                <img 
                   src={avatarUrl} 
                   alt="Profile" 
                   className="profile-avatar"
                   style={{ width: '20px', height: '20px', borderRadius: '50%' }}
               />
              ) : (
                <FaUser size={20} />
              )}
             <span className="account-text">{username}</span>
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