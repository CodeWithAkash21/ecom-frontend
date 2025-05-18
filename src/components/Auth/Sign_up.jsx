import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus, FaLock } from "react-icons/fa";

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

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const tiltRef = useTilt(10);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }
    try {
      // Simulate API call or add your signup logic here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // On successful signup, redirect to login
      navigate("/login");
    } catch (err) {
      setError("Error creating account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (user) return null;

  return (
    <div className="auth-page" style={{ minHeight: 'calc(100vh - 100px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div ref={tiltRef} className="auth-container glassmorphic-card fade-in-up" style={{ width: '100%', maxWidth: 500, margin: '0 auto', padding: 40, background: 'rgba(255,255,255,0.96)', borderRadius: 18, boxShadow: '0 8px 32px 0 rgba(31,38,135,0.13)', border: '1.5px solid var(--primary-light)' }}>
        {/* Benefit banner and trust badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <span className="sale-badge" style={{ background: 'var(--accent)', color: '#fff', fontWeight: 700 }}>Sign up now and get 10% off your first order!</span>
          <span style={{ background: 'var(--primary-light)', color: 'var(--primary-dark)', borderRadius: 8, padding: '2px 10px', fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
            <FaLock style={{ color: 'var(--primary)', marginRight: 4 }} /> Secure Signup
          </span>
        </div>
        <div className="auth-header" style={{ textAlign: 'center', marginBottom: 30 }}>
          <h2 style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '1.5rem', marginBottom: 0, letterSpacing: '-0.5px' }}>Create Your Account</h2>
          <p style={{ color: 'var(--text-light)', fontSize: 15, marginTop: 8 }}>Join for faster checkout, order tracking, and exclusive deals.</p>
        </div>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" style={{ fontWeight: 500, marginBottom: 6, color: 'var(--primary-dark)' }}>Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="form-control"
              style={{ marginBottom: 18 }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" style={{ fontWeight: 500, marginBottom: 6, color: 'var(--primary-dark)' }}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
              className="form-control"
              style={{ marginBottom: 18 }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" style={{ fontWeight: 500, marginBottom: 6, color: 'var(--primary-dark)' }}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              required
              className="form-control"
              style={{ marginBottom: 18 }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" style={{ fontWeight: 500, marginBottom: 6, color: 'var(--primary-dark)' }}>Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="********"
              required
              className="form-control"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: 24, fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.5px', background: 'var(--accent)', color: '#fff', boxShadow: '0 2px 12px rgba(255,125,26,0.12)' }}
            disabled={loading}
          >
            {loading ? "Creating account..." : (<><FaUserPlus /> Sign Up</>)}
          </button>
        </form>
        <p className="auth-footer" style={{ textAlign: 'center', marginTop: 20, color: '#555' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>Log In</Link>
        </p>
        <div style={{ marginTop: 18, textAlign: 'center', color: 'var(--text-light)', fontSize: 13 }}>
          <span>We never share your data. <b style={{ color: 'var(--primary)' }}>No spam, ever.</b></span>
        </div>
      </div>
    </div>
  );
};

export default Signup;