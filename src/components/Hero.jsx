import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function useTilt(maxTilt = 10) {
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
      node.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.01)`;
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

const textVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.12 * i,
      duration: 0.7,
      type: 'spring',
      stiffness: 60,
      damping: 18,
    },
  }),
};

const Hero = () => {
  const tiltRef = useTilt(10);
  return (
    <section className="hero">
      <div ref={tiltRef} className="glassmorphic-card hero-content fade-in-up" style={{ padding: '48px 36px', minHeight: 340, display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 8px 32px 0 rgba(31,38,135,0.18)', background: 'rgba(255,255,255,0.92)', border: '1.5px solid var(--primary-light)' }}>
        {/* Trust badge and urgency banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, type: 'spring', stiffness: 60 }}
          style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}
        >
          <span className="sale-badge" style={{ background: 'var(--error)', color: '#fff', fontWeight: 700 }}>Limited Time Offer</span>
          <span style={{ background: 'var(--primary-light)', color: 'var(--primary-dark)', borderRadius: 8, padding: '2px 10px', fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#2563eb"/><path d="M8.5 12.5l2 2 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Trusted by 10,000+ customers
          </span>
        </motion.div>
        <motion.h1
          initial="hidden"
          animate="visible"
          custom={1}
          variants={textVariants}
          style={{ fontSize: '2.8rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: 18, letterSpacing: '-1px' }}
        >
          Shop with <span style={{ color: 'var(--accent)' }}>Confidence</span>
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="visible"
          custom={2}
          variants={textVariants}
          style={{ fontSize: '1.2rem', color: 'var(--text-light)', marginBottom: 28, maxWidth: 480 }}
        >
          Discover the latest trends and best-selling styles. Enjoy secure checkout, fast shipping, and a 100% satisfaction guarantee.
        </motion.p>
        <motion.div
          initial="hidden"
          animate="visible"
          custom={3}
          variants={textVariants}
        >
          <Link to="/shop" className="btn btn-primary hero-btn" style={{ maxWidth: 220, marginTop: 8, textAlign: 'center', fontWeight: 700, fontSize: '1.15rem', letterSpacing: '0.5px', boxShadow: '0 2px 12px rgba(255,125,26,0.12)' }}>
          Shop Now
        </Link>
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          custom={4}
          variants={textVariants}
          style={{ marginTop: 32, display: 'flex', gap: 16, alignItems: 'center', color: 'var(--primary-dark)', fontWeight: 500, fontSize: 16 }}
        >
          <span>Secure Checkout</span>
          <span style={{ fontSize: 18, color: 'var(--gray)' }}>|</span>
          <span>Free Returns</span>
          <span style={{ fontSize: 18, color: 'var(--gray)' }}>|</span>
          <span>24/7 Support</span>
        </motion.div>
      </div>
      <div className="hero-ring">
        {/* SVG 3D Ring */}
        <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="ringGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.7" />
              <stop offset="60%" stopColor="#fbc2eb" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.9" />
            </radialGradient>
          </defs>
          <ellipse cx="110" cy="110" rx="90" ry="90" fill="url(#ringGradient)" />
          <ellipse cx="110" cy="110" rx="70" ry="70" fill="#fff" fillOpacity="0.1" />
          <ellipse cx="110" cy="110" rx="60" ry="60" fill="#fff" fillOpacity="0.05" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;