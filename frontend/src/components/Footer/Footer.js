import React from "react";
import FooterSection from "./Footersection";
import SocialIcons from "./Socialicons";
import Newsletter from "./Newsletter";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Contact Section */}
        <FooterSection title="Contact Us">
          <p>Nigel's Vegies, Nairobi</p>
          <p>Phone: +254 700 123456</p>
          <p>Email: contact@nigel'svegies.com</p>
        </FooterSection>

        {/* Links Section */}
        <FooterSection title="Shop">
          <ul>
            <li><a href="#">Fruits</a></li>
            <li><a href="#">Vegetables</a></li>
            <li><a href="#">Groceries</a></li>
          </ul>
        </FooterSection>

        <FooterSection title="Customer Service">
          <ul>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Shipping Info</a></li>
          </ul>
        </FooterSection>

        <FooterSection title="Policies">
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </FooterSection>

        {/* Social Media and Newsletter Section */}
        <div className="footer-section social-newsletter">
          <h3>Connect with Us</h3>
          <SocialIcons />
          {/* <Newsletter /> */}
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>&copy; 2024 Nigel's Vegies. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
