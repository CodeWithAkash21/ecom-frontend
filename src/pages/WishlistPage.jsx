import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaTrash } from 'react-icons/fa';

function useTilt(maxTilt = 12) {
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
      node.style.transform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.04)`;
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

const WishlistPage = () => {
  const { wishlist, removeWishlist } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container" style={{ maxWidth: 900, margin: '32px auto', padding: '0 12px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 32 }}>
        <FaHeart color="#e74c3c" style={{ marginRight: 8 }} /> Your Wishlist
      </h2>
      {wishlist.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 40 }}>
          <p>Your wishlist is empty.</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: 16 }}>Go Shopping</Link>
        </div>
      ) : (
        <div className="wishlist-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {wishlist.map((item) => {
            const tiltRef = useTilt(12);
            return (
              <div key={item.id} ref={tiltRef} className="wishlist-card glassmorphic-card" style={{ borderRadius: 10, boxShadow: '0 8px 32px 0 rgba(31,38,135,0.13)', padding: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(12px) saturate(180%)', WebkitBackdropFilter: 'blur(12px) saturate(180%)' }}>
                <button
                  onClick={() => removeWishlist(item.id)}
                  style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', color: '#e74c3c', fontSize: 20, cursor: 'pointer' }}
                  title="Remove from wishlist"
                >
                  <FaTrash />
                </button>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: 120, height: 120, objectFit: 'contain', marginBottom: 16 }}
                  onClick={() => navigate(`/product/${item.id}`)}
                />
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, textAlign: 'center', minHeight: 40 }}>{item.title}</h3>
                <p style={{ color: '#007bff', fontWeight: 700, marginBottom: 8, fontSize: 16 }}>${item.price}</p>
                <button
                  className="btn btn-primary"
                  style={{ width: '100%', fontWeight: 600, fontSize: '1rem', marginTop: 8 }}
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  View Details
                </button>
              </div>
            );
          })}
        </div>
      )}
      <style>{`
        @media (max-width: 700px) {
          .wishlist-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default WishlistPage; 