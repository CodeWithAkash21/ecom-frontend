import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaGoogle, FaFacebook, FaLock } from "react-icons/fa";

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

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
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
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      let data;
      try {
        data = await response.json();
      } catch {
        setError("Server error: Invalid response");
        setLoading(false);
        return;
      }

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        navigate("/");
      } else {
        setError("Login failed: No user returned");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (user) return null;

  return (
    <div
      className="auth-page"
      style={{
        minHeight: "calc(100vh - 100px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#2563eb",
      }}
    >
      <div
        ref={tiltRef}
        className="auth-container glassmorphic-card fade-in-up"
        style={{
          width: "100%",
          maxWidth: 500,
          margin: "0 auto",
          padding: 40,
          background: "rgba(255,255,255,0.96)",
          borderRadius: 18,
          boxShadow: "0 8px 32px 0 rgba(31,38,135,0.13)",
          border: '1.5px solid var(--primary-light)'
        }}
      >
        {/* Trust badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <span style={{ background: 'var(--primary-light)', color: 'var(--primary-dark)', borderRadius: 8, padding: '2px 10px', fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
            <FaLock style={{ color: 'var(--primary)', marginRight: 4 }} /> Secure Login
          </span>
          <span style={{ color: 'var(--success)', fontWeight: 600, fontSize: 13, marginLeft: 6 }}>100% Privacy Guaranteed</span>
        </div>
        <div
          className="auth-header"
          style={{ textAlign: "center", marginBottom: 30 }}
        >
          <h2
            style={{
              color: "var(--primary)",
              fontWeight: 700,
              fontSize: "1.5rem",
              marginBottom: 0,
              letterSpacing: '-0.5px'
            }}
          >
            Welcome Back!
          </h2>
          <p style={{ color: 'var(--text-light)', fontSize: 15, marginTop: 8 }}>Log in to access exclusive deals and faster checkout.</p>
        </div>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" style={{ fontWeight: 500, marginBottom: 6, color: 'var(--primary-dark)' }}>
              Email
            </label>
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
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label
              htmlFor="password"
              style={{ fontWeight: 500, marginBottom: 6, color: 'var(--primary-dark)' }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              required
              className="form-control"
            />
            <div style={{ textAlign: "right", marginTop: 6 }}>
              <Link
                to="/forgot-password"
                className="forgot-password"
                style={{
                  fontSize: "0.95rem",
                  color: "var(--primary)",
                  textDecoration: "none",
                }}
              >
                Forgot password?
              </Link>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: "100%",
              marginTop: 24,
              fontWeight: 700,
              fontSize: "1.1rem",
              letterSpacing: '0.5px',
              background: 'var(--accent)',
              color: '#fff',
              boxShadow: '0 2px 12px rgba(255,125,26,0.12)'
            }}
            disabled={loading}
          >
            {loading ? (
              <span className="loading-spinner" style={{ width: 20, height: 20 }} />
            ) : (
              <>
                <FaSignInAlt /> Login
              </>
            )}
          </button>
        </form>
        <div className="auth-divider">
          <span>OR</span>
        </div>
        <div className="social-login">
          <button type="button" className="btn btn-google">
            <FaGoogle /> Continue with Google
          </button>
          <button type="button" className="btn btn-facebook">
            <FaFacebook /> Continue with Facebook
          </button>
        </div>
        <button
          type="button"
          className="btn btn-secondary"
          style={{ width: '100%', margin: '16px 0 0 0', fontWeight: 700, fontSize: '1.05rem', borderRadius: 8, background: '#2563eb', color: '#fff', boxShadow: '0 2px 12px rgba(37,99,235,0.12)' }}
          onClick={() => navigate('/')}
        >
          Go to Home Page
        </button>
        <p
          className="auth-footer"
          style={{ textAlign: "center", marginTop: 20, color: "#555" }}
        >
          Don't have an account?{" "}
          <Link
            to="/signup"
            style={{
              color: "var(--accent)",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Sign up
          </Link>
        </p>
        <div style={{ marginTop: 18, textAlign: 'center', color: 'var(--text-light)', fontSize: 13 }}>
          <span>We never share your data. <b style={{ color: 'var(--primary)' }}>No spam, ever.</b></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
