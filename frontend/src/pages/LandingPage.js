import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="landing-page"
    >
      <motion.div 
        className="hero-section"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1>Welcome to Nigel's Vegies</h1>
        <p>Fresh vegetables delivered to your doorstep</p>
        
        <div className="auth-buttons">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
          >
            Login
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/SignUp')}
          >
            Create Account
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LandingPage;

