import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Products from '../components/Products/Products';

const Shop = () => {
  return (
    <div className="shop-page">
      <Header />
      <main>
        <section className="products-section">
          <div className="container">
            <div className="section-header">
              <h2>Our Products</h2>
            </div>
            <Products />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Shop; 