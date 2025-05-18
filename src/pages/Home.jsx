import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Products from "../components/Products/Products";
import Footer from "../components/Footer";
import CartPage from "../pages/CartPage";
import BackgroundShapes from "../components/BackgroundShapes";
import FeaturedCategories from "../components/FeaturedCategories";

const Home = () => {
  return (
    <div className="home-page">
      <BackgroundShapes />
      <Header />
      <main>
        <Hero />
        <FeaturedCategories />
        <section className="products-section">
          <div className="container">
            <div className="section-header" style={{ justifyContent: 'center' }}>
              <h2 style={{ textAlign: 'center', width: '100%' }}>Featured Products</h2>
            </div>
            <Products limit={8} />
          </div>
        </section>
        {/* Newsletter Signup Section */}
        <section className="newsletter-section">
          <div className="container">
            <div className="glassmorphic-card fade-in-up" style={{ maxWidth: 540, margin: '0 auto', padding: 36, borderRadius: 24, background: 'rgba(255,255,255,0.92)', boxShadow: '0 8px 32px 0 rgba(31,38,135,0.13)', border: '1.5px solid var(--primary-light)', textAlign: 'center' }}>
              <h3 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: 12 }}>Get Exclusive Offers & Updates</h3>
              <p style={{ color: 'var(--text-light)', fontSize: 17, marginBottom: 22 }}>Join our newsletter for early access to new arrivals, special discounts, and style inspiration. No spam, ever.</p>
              <form className="newsletter-form" style={{ display: 'flex', gap: 0, maxWidth: 420, margin: '0 auto' }}>
                <input type="email" placeholder="Your email address" required style={{ flex: 1, padding: '14px 16px', border: 'none', borderRadius: '8px 0 0 8px', fontSize: 16, outline: 'none', background: '#f5f6fa' }} />
                <button type="submit" className="btn btn-primary" style={{ borderRadius: '0 8px 8px 0', fontWeight: 700, fontSize: 16, padding: '0 28px', background: 'var(--primary)', color: '#fff', border: 'none' }}>Subscribe</button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
