import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const COLOR_OPTIONS = ["#4f46e5", "#22c55e", "#fbbf24", "#ef4444", "#6366f1", "#f59e42"];
const SIZE_OPTIONS = [7, 8, 9, 10, 11];

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
  const [selectedSize, setSelectedSize] = useState(SIZE_OPTIONS[0]);
  const navigate = useNavigate();
  const { addToCart, addWishlist, removeWishlist, isInWishlist } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error("Product not found");
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleWishlist = () => {
    if (!product) return;
    if (isInWishlist(product.id)) {
      removeWishlist(product.id);
    } else {
      addWishlist(product);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert('Added to cart!');
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  const handleQuantityChange = (type) => {
    setQuantity((prev) => {
      if (type === 'inc') return prev + 1;
      if (type === 'dec') return prev > 1 ? prev - 1 : 1;
      return prev;
    });
  };

  if (loading) return <div className="container">Loading product details...</div>;
  if (error) return <div className="container">Error: {error}</div>;
  if (!product) return <div className="container">Product not found</div>;

  return (
    <div className="container" style={{ marginTop: 32, marginBottom: 32, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <AnimatePresence>
        <motion.div
          key={product.id}
          initial={{ opacity: 0, scale: 0.85, y: 60 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 60 }}
          transition={{ type: 'spring', stiffness: 80, damping: 18, duration: 0.6 }}
          style={{ background: '#fff', borderRadius: 32, boxShadow: '0 8px 40px 0 rgba(31,38,135,0.13)', display: 'flex', maxWidth: 900, width: '100%', overflow: 'hidden', position: 'relative' }}
        >
          {/* Left: Image with yellow accent */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, x: -60 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.1 }}
            style={{ background: 'linear-gradient(135deg,rgb(255, 255, 255) 60%, #fff 100%)', flex: '1 1 380px', minWidth: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: 36 }}
          >
            {/* Brand logo (mock) */}
            <div style={{ position: 'absolute', top: 28, left: 28, fontWeight: 900, fontSize: 32, color: '#222', opacity: 0.7 }}>
              <span role="img" aria-label="brand">★</span>
            </div>
            <motion.img
              src={product.image || 'https://via.placeholder.com/600'}
          alt={product.title} 
              style={{ width: 260, maxWidth: '100%', objectFit: 'contain', filter: 'drop-shadow(0 8px 32pxrgba(255, 255, 255, 0.27))' }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.18 }}
            />
            {/* Thumbnails (mock) */}
            <div style={{ display: 'flex', gap: 10, marginTop: 28 }}>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} style={{ width: 44, height: 44, borderRadius: 10, background: '#fff', boxShadow: '0 2px 8px #0001', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '2px solid #eee' }}>
                  <img src={product.image} alt="thumb" style={{ width: 32, height: 32, objectFit: 'contain' }} />
                </div>
              ))}
            </div>
          </motion.div>
          {/* Right: Details */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 18, delay: 0.22 }}
            style={{ flex: '2 1 420px', minWidth: 320, padding: '44px 40px 40px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', background: '#fff' }}
          >
            <button onClick={handleBackClick} className="btn btn-accent" style={{ position: 'absolute', top: 24, left: 24, fontSize: 16, padding: '4px 14px', borderRadius: 12, background: '#ffe259', color: '#222', border: 'none', fontWeight: 600, boxShadow: '0 2px 8px #ffe25944' }}>
              <FaArrowLeft style={{ marginRight: 6 }} />
            </button>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
              <div>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, color: '#222' }}>{product.title}</h2>
                <div style={{ color: '#555', fontWeight: 500, fontSize: 18, marginBottom: 8 }}>{product.category}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 10 }}>
                  {[1,2,3,4,5].map((n) => (
                    <span key={n} style={{ color: n <= Math.round(product.rating.rate) ? '#ffc107' : '#e5e7eb', fontSize: 18 }}>★</span>
                  ))}
                  <span style={{ color: '#888', fontSize: 15, marginLeft: 8 }}>({product.rating.count} reviews)</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={handleWishlist} style={{ background: '#fff', border: '2px solid #ffe259', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: isInWishlist(product.id) ? '#e74c3c' : '#bbb', cursor: 'pointer', boxShadow: '0 2px 8px #ffe25944' }} title="Wishlist">
                  <FaHeart />
          </button>
                <button onClick={handleAddToCart} style={{ background: '#fff', border: '2px solid #ffe259', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: '#ff7d1a', cursor: 'pointer', boxShadow: '0 2px 8px #ffe25944' }} title="Add to Cart">
                  <FaShoppingCart />
          </button>
        </div>
      </div>
            <div style={{ fontWeight: 700, margin: '18px 0 6px 0', color: '#222', fontSize: 15 }}>INFINITE SUPPORT. TOTAL CONTROL.</div>
            <div style={{ color: '#888', fontSize: 15, marginBottom: 18, maxWidth: 420 }}>
              {product.description}
            </div>
            {/* Color selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              {COLOR_OPTIONS.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: color,
                    border: selectedColor === color ? '3px solid #222' : '2px solid #fff',
                    outline: selectedColor === color ? '2px solidrgb(255, 255, 255)' : 'none',
                    cursor: 'pointer',
                    boxShadow: '0 1px 4px #0001',
                    marginRight: 2,
                  }}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
            {/* Size selector */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 8 }}>Select Size</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {SIZE_OPTIONS.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      minWidth: 38,
                      height: 38,
                      borderRadius: 8,
                      background: selectedSize === size ? '#ffe259' : '#f3f4f6',
                      color: '#222',
                      border: selectedSize === size ? '2px solid #222' : '2px solid #eee',
                      fontWeight: 700,
                      fontSize: 16,
                      cursor: 'pointer',
                      boxShadow: selectedSize === size ? '0 2px 8px #ffe25944' : 'none',
                    }}
                    aria-label={`Select size ${size}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            {/* Price and Buy button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 18 }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#222', letterSpacing: 1 }}>
                $ {product.price?.toFixed(2) || '0.00'}
              </div>
              <button
                className="btn"
                style={{
                  background: '#ff7d1a',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: 22,
                  borderRadius: 12,
                  padding: '16px 54px',
                  border: 'none',
                  boxShadow: '0 4px 18px #ff7d1a33',
                  letterSpacing: 1,
                  transition: 'background 0.2s',
                  marginLeft: 8,
                }}
                onClick={handleBuyNow}
              >
                BUY
              </button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
      <style>{`
        @media (max-width: 1100px) {
          .container > div { flex-direction: column; min-width: 0 !important; }
        }
        @media (max-width: 700px) {
          .container > div { flex-direction: column; padding: 0 !important; border-radius: 0 !important; }
          .container > div > div { padding: 18px !important; }
        }
      `}</style>
    </div>
  );
};

export default ProductDetailsPage;