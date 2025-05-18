import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function useTilt(maxTilt = 8) {
  const ref = React.useRef();
  React.useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    const node = ref.current;
    if (!node) return;
    const handleMove = (e) => {
      const rect = node.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const px = x / rect.width;
      const py = y / rect.height;
      const tiltX = (py - 0.5) * -2 * maxTilt;
      const tiltY = (px - 0.5) * 2 * maxTilt;
      node.style.transform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
    };
    const reset = () => {
      node.style.transform = '';
    };
    node.addEventListener('mousemove', handleMove);
    node.addEventListener('mouseleave', reset);
    return () => {
      node.removeEventListener('mousemove', handleMove);
      node.removeEventListener('mouseleave', reset);
    };
  }, [maxTilt]);
  return ref;
}

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <div className="cart-nike-container">
      {/* Free shipping banner */}
      <div className="cart-banner">
        <span className="cart-banner-main">GET FREE SHIPPING WITH <b>NIKE+</b> ON EVERY ORDER. EVERY TIME.</span>
        <span className="cart-banner-sub">Non-members receive free shipping for purchases $150 or more. <a href="#" style={{ color: '#2563eb', textDecoration: 'underline' }}>See details</a></span>
      </div>
      <div className="cart-main-content">
        {/* Left: Cart Items */}
        <div className="cart-items-col">
          <h2 className="cart-section-title">YOUR CART <span className="cart-count">({cart.length})</span></h2>
          {cart.length === 0 ? (
            <div className="cart-empty">
              <p>Your cart is empty.</p>
              <Link to="/" className="btn btn-primary" style={{ marginTop: 16 }}>Go Shopping</Link>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item) => {
                const tiltRef = useTilt(8);
                return (
                  <div key={item.id} ref={tiltRef} className="cart-item-card">
                    <div className="cart-item-img-wrap">
                      <img src={item.image} alt={item.title} className="cart-item-img" />
                    </div>
                    <div className="cart-item-info">
                      <div className="cart-item-title-row">
                        <div className="cart-item-title">{item.title}</div>
                        <div className="cart-item-price">${item.price.toFixed(2)}</div>
                      </div>
                      <div className="cart-item-meta">
                        <div>Qty: <b>{item.quantity}</b></div>
                        <div>Subtotal: <b>${(item.price * item.quantity).toFixed(2)}</b></div>
                      </div>
                      <div className="cart-item-actions">
                        <button className="cart-remove-btn" onClick={() => removeFromCart(item.id)}>REMOVE</button>
                        <button className="cart-edit-btn" disabled>EDIT</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {/* Right: Summary */}
        <div className="cart-summary-col">
          <div className="cart-summary-card">
            <div className="cart-summary-title">SUMMARY</div>
            <div className="cart-summary-row cart-summary-promo">
              <input className="cart-promo-input" placeholder="DO YOU HAVE A PROMO CODE?" disabled />
              <span className="cart-summary-promo-icon">&#9654;</span>
            </div>
            <div className="cart-summary-row">
              <span>SUBTOTAL</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="cart-summary-row">
              <span>ESTIMATED SHIPPING & HANDLING</span>
              <span style={{ color: '#22c55e' }}>$0.00</span>
            </div>
            <div className="cart-summary-row">
              <span>Standard: <b>FREE</b> <span style={{ color: '#888', fontWeight: 400 }}>Arrives 2-5 Days</span></span>
            </div>
            <div className="cart-summary-row">
              <span>TAX</span>
              <span>—</span>
            </div>
            <div className="cart-summary-total-row">
              <span>TOTAL</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <button className="cart-checkout-btn">CHECKOUT</button>
            <div className="cart-or">OR</div>
            <button className="cart-paypal-btn">Check out with <b>PayPal</b></button>
          </div>
        </div>
      </div>
      <style>{`
        .cart-nike-container {
          max-width: 1200px;
          margin: 36px auto;
          padding: 0 12px;
        }
        .cart-banner {
          background: #f5f5f5;
          border-radius: 6px;
          padding: 18px 24px 8px 24px;
          margin-bottom: 28px;
        }
        .cart-banner-main {
          color: #e65100;
          font-weight: 700;
          font-size: 1.08rem;
          letter-spacing: 0.5px;
        }
        .cart-banner-sub {
          display: block;
          color: #888;
          font-size: 0.98rem;
          margin-top: 4px;
        }
        .cart-main-content {
          display: flex;
          gap: 36px;
          align-items: flex-start;
        }
        .cart-items-col {
          flex: 2 1 0;
        }
        .cart-summary-col {
          flex: 1 1 320px;
          min-width: 320px;
          position: sticky;
          top: 32px;
          align-self: flex-start;
        }
        .cart-section-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 18px;
          letter-spacing: 0.5px;
        }
        .cart-count {
          color: #e65100;
          font-weight: 700;
        }
        .cart-items-list {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }
        .cart-item-card {
          display: flex;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 12px #0001;
          padding: 18px 18px 18px 0;
          gap: 18px;
          align-items: flex-start;
        }
        .cart-item-img-wrap {
          min-width: 100px;
          max-width: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cart-item-img {
          width: 100px;
          height: 100px;
          object-fit: contain;
        }
        .cart-item-info {
          flex: 1 1 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .cart-item-title-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }
        .cart-item-title {
          font-size: 1.08rem;
          font-weight: 700;
          color: #222;
          max-width: 320px;
        }
        .cart-item-price {
          color: #e65100;
          font-weight: 700;
          font-size: 1.08rem;
        }
        .cart-item-meta {
          color: #888;
          font-size: 0.98rem;
          display: flex;
          gap: 18px;
        }
        .cart-item-actions {
          display: flex;
          gap: 12px;
          margin-top: 8px;
        }
        .cart-remove-btn, .cart-edit-btn {
          background: #f5f5f5;
          border: none;
          border-radius: 4px;
          padding: 7px 18px;
          font-weight: 700;
          font-size: 0.98rem;
          color: #222;
          cursor: pointer;
          transition: background 0.18s;
        }
        .cart-remove-btn:hover {
          background: #ffeede;
          color: #e65100;
        }
        .cart-edit-btn {
          color: #888;
          cursor: not-allowed;
        }
        .cart-summary-card {
          background: #181818;
          color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 16px #0002;
          padding: 32px 28px 24px 28px;
          min-width: 280px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .cart-summary-title {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 8px;
          letter-spacing: 0.5px;
        }
        .cart-summary-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 1rem;
          margin-bottom: 6px;
        }
        .cart-summary-promo {
          background: #222;
          border-radius: 4px;
          padding: 7px 12px;
          margin-bottom: 10px;
        }
        .cart-promo-input {
          background: transparent;
          border: none;
          color: #fff;
          font-size: 1rem;
          width: 80%;
          outline: none;
        }
        .cart-summary-promo-icon {
          color: #fff;
          font-size: 1.1rem;
          margin-left: 8px;
        }
        .cart-summary-total-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 1.15rem;
          font-weight: 700;
          margin: 18px 0 8px 0;
        }
        .cart-checkout-btn {
          background: #e65100;
          color: #fff;
          border: none;
          border-radius: 4px;
          padding: 14px 0;
          font-size: 1.08rem;
          font-weight: 700;
          margin-top: 8px;
          margin-bottom: 0;
          cursor: pointer;
          transition: background 0.18s;
        }
        .cart-checkout-btn:hover {
          background: #ff7d1a;
        }
        .cart-or {
          text-align: center;
          color: #fff;
          margin: 10px 0 0 0;
          font-size: 1rem;
          font-weight: 600;
        }
        .cart-paypal-btn {
          background: #fff;
          color: #222;
          border: 2px solid #0070ba;
          border-radius: 4px;
          padding: 12px 0;
          font-size: 1.08rem;
          font-weight: 700;
          margin-top: 8px;
          cursor: pointer;
          transition: background 0.18s, color 0.18s;
        }
        .cart-paypal-btn:hover {
          background: #0070ba;
          color: #fff;
        }
        @media (max-width: 900px) {
          .cart-main-content { flex-direction: column; gap: 24px; }
          .cart-summary-col { position: static; min-width: 0; }
        }
        @media (max-width: 600px) {
          .cart-nike-container { padding: 0 2px; }
          .cart-item-card { flex-direction: column; align-items: stretch; padding: 12px 8px; }
          .cart-item-img-wrap { max-width: 100%; justify-content: flex-start; }
          .cart-item-img { width: 80px; height: 80px; }
          .cart-summary-card { padding: 18px 8px; }
        }
      `}</style>
    </div>
  );
};

export default CartPage; 