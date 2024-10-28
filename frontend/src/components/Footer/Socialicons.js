import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";
import "./SocialIcons.css"; 

const SocialIcons = () => {
  return (
    <div className="social-icons">
      <a 
        href="https://facebook.com/yourpage" 
        target="_blank" 
        rel="noopener noreferrer"
        className="social-icon facebook"
      >
        <FaFacebook size={24} />
      </a>
      
      <a 
        href="https://twitter.com/handle" 
        target="_blank" 
        rel="noopener noreferrer"
        className="social-icon twitter"
      >
        <FaTwitter size={24} />
      </a>
      
      <a 
        href="https://instagram.com/profile" 
        target="_blank" 
        rel="noopener noreferrer"
        className="social-icon instagram"
      >
        <FaInstagram size={24} />
      </a>

      <a 
        href="https://wa.me/phonenumber" 
        target="_blank" 
        rel="noopener noreferrer"
        className="social-icon whatsapp"
      >
        <FaWhatsapp size={24} />
      </a>
    </div>
  );
};

export default SocialIcons;
