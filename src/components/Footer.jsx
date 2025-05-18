// /src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="main-footer" style={{ background: '#111', color: '#fff', padding: '60px 0 20px' }}>
      <div className="container">
        <div className="footer-content" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 40 }}>
          <div className="footer-section">
            <h4>ShopMate</h4>
            <p>We provide the best products at unbeatable prices with excellent customer service.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><a href="/" style={{ color: '#eee', textDecoration: 'none' }}>Home</a></li>
              <li><a href="/shop" style={{ color: '#eee', textDecoration: 'none' }}>Shop</a></li>
              <li><a href="/categories" style={{ color: '#eee', textDecoration: 'none' }}>Categories</a></li>
              <li><a href="/contact" style={{ color: '#eee', textDecoration: 'none' }}>Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Customer Service</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><a href="/faq" style={{ color: '#eee', textDecoration: 'none' }}>FAQ</a></li>
              <li><a href="/returns" style={{ color: '#eee', textDecoration: 'none' }}>Returns & Exchanges</a></li>
              <li><a href="/shipping" style={{ color: '#eee', textDecoration: 'none' }}>Shipping Policy</a></li>
              <li><a href="/privacy" style={{ color: '#eee', textDecoration: 'none' }}>Privacy Policy</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>Email: support@shopmate.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Address: 123 E-Commerce St, Shopping Mall, SM 12345</p>
          </div>
        </div>
        <div className="footer-bottom" style={{ textAlign: 'center', paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          © 2025 ShopMate. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
