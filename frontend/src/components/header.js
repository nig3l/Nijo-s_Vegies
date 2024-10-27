import React from 'react';
import { FaHeart, FaUser, FaShoppingBag, FaGift } from 'react-icons/fa';

const Header = () => {
    return (
        <header>
            {/* Top Banner */}
            <div style={{ backgroundColor: '#004d40', color: '#fff', padding: '10px', textAlign: 'center' }}>
                FREE DELIVERY ON ORDERS OVER KES 3000! SHOP NOW & SAVE! 🚚
            </div>

            {/* Main Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 10%', borderBottom: '1px solid #ddd' }}>
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '24px', color: '#004d40', fontWeight: 'bold' }}>
                    <span>EST. 2024</span>
                    <div style={{ marginLeft: '2px', fontSize: '32px', fontFamily: 'Serif' }}>Nigel's Vegies</div>
                    <div style={{ fontSize: '14px', color: '#4CAF50', marginTop: '-15px' }}>Food Market</div>
                </div>

                {/* Search Bar */}
                <div style={{ display: 'flex', alignItems: 'center', flex: 1, margin: '0 20px' }}>
                    <input
                        type="text"
                        placeholder="Search"
                        style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ddd', borderRadius: '4px 0 0 4px' }}
                    />
                    <button style={{ padding: '10px 20px', backgroundColor: '#004d40', color: '#fff', border: 'none', borderRadius: '0 4px 4px 0' }}>
                        Search
                    </button>
                </div>

                {/* Icons Section */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#004d40',  marginLeft:'5px'}}>
                    <div style={{ position: 'relative' }}>
                        <FaHeart size={20} />
                        <span style={{ position: 'absolute', top: '-5px', right: '-10px', backgroundColor: '#4CAF50', color: '#fff', borderRadius: '50%', padding: '2px 5px', fontSize: '12px' }}>0</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <FaUser size={20} />
                        <span style={{ marginLeft: '5px' }}>My Account | Log In</span>
                    </div>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <FaShoppingBag size={20} />
                        <span style={{ marginLeft: '5px' }}>KSh109</span>
                        <span style={{ position: 'absolute', top: '-5px', right: '-10px', backgroundColor: '#4CAF50', color: '#fff', borderRadius: '50%', padding: '2px 5px', fontSize: '12px' }}>1</span>
                    </div>
                </div>
            </div>

            {/* Category Navigation */}
            <nav style={{ display: 'flex', justifyContent: 'center', padding: '10px 0', backgroundColor: '#f8f8f8', fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                <span style={{ marginRight: '10px' }}>All Categories</span> |
                <span style={{ margin: '0 10px' }}>FRUIT</span> |
                <span style={{ margin: '0 10px' }}>VEG</span> |
                <span style={{ margin: '0 10px' }}>DAIRY & EGGS</span> |
                <span style={{ margin: '0 10px' }}>BAKERY</span> |
                <span style={{ margin: '0 10px' }}>PANTRY</span> |
                <span style={{ margin: '0 10px' }}>DELI</span> |
                <span style={{ margin: '0 10px' }}>NEW IN</span> |
                <span style={{ margin: '0 10px' }}>OFFERS</span>
            </nav>

            {/* CTA Button */}
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <button style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: '#fff', fontSize: '16px', border: 'none', borderRadius: '5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <FaGift /> Gifts And Flowers
                </button>
            </div>
        </header>
    );
};

export default Header;
