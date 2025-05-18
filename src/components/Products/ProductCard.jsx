import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';
import { FaHeart } from 'react-icons/fa';

function useTilt(maxTilt = 12) {
  const ref = useRef();
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

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, addWishlist, removeWishlist, isInWishlist } = useCart();
  const tiltRef = useTilt(12);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeWishlist(product.id);
    } else {
      addWishlist(product);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    alert('Added to cart!');
  };

  return (
    <div
      ref={tiltRef}
      className="product-card modern-card"
      onClick={handleCardClick}
      tabIndex={0}
      aria-label={`View details for ${product.title}`}
    >
      <div className="product-image-container-modern">
        <img src={product.image} alt={product.title} className="product-image-modern" />
        <button className="wishlist-button-modern" onClick={handleWishlist} title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}>
          <FaHeart color={isInWishlist(product.id) ? '#e74c3c' : '#bbb'} />
        </button>
      </div>
      <div className="product-info-modern">
        <h3 className="product-title-modern">{product.title}</h3>
        <div className="product-meta-modern">
          <span className="product-price-modern">${product.price}</span>
        </div>
        <button className="add-to-cart-btn-modern" onClick={handleAddToCart} tabIndex={-1}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;