import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSignOutAlt, FaHeart, FaMoon, FaSun } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { ThemeContext } from "../context/ThemeContext";

const Header = () => {
  const { cartCount, wishlist } = useCart();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    else setUser(null);
  }, []);

  // Responsive menu toggle (for demo, simple state)

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <header
      className="main-header glassmorphic-card"
      style={{
        boxShadow: '0 8px 32px 0 rgba(31,38,135,0.18)',
        background: 'rgba(40,60,120,0.22)',
        border: '1.5px solid rgba(255,255,255,0.24)',
        backdropFilter: 'blur(18px) saturate(180%)',
        WebkitBackdropFilter: 'blur(18px) saturate(180%)',
        borderRadius: 32,
        margin: '24px auto 32px auto',
        maxWidth: 1100,
        position: 'sticky',
        top: 24,
        zIndex: 100,
        padding: 0,
      }}
    >
      <div className="container">
        <div className="header-content" style={{ gap: 10 }}>
          <Link to="/" className="logo" style={{ minWidth: 120, textDecoration: 'none' }}>
            <h1
              style={{
                color: '#fff',
                fontWeight: 800,
                fontSize: '2.2rem',
                letterSpacing: '1.5px',
                textShadow: '0 2px 12px rgba(31,38,135,0.22)',
                background: 'linear-gradient(90deg, #2563eb 30%, #a259e6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0,
                padding: 0,
              }}
            >
              ShopMate
            </h1>
          </Link>
          <nav
            className="main-nav"
            style={{
              display: menuOpen ? 'flex' : '',
              gap: 32,
              alignItems: 'center',
              flex: 1,
              justifyContent: 'center',
            }}
            aria-label="Main navigation"
          >
            <Link
              to="/"
              className="nav-link"
              style={{
                color: '#fff',
                fontWeight: 600,
                fontSize: '1.15rem',
                letterSpacing: '0.5px',
                padding: '8px 18px',
                borderRadius: 12,
                textShadow: '0 2px 8px rgba(31,38,135,0.18)',
                background: 'rgba(255,255,255,0.06)',
                transition: 'background 0.2s, color 0.2s',
              }}
              onClick={() => navigate("/")}
              tabIndex={0}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="nav-link"
              style={{
                color: '#fff',
                fontWeight: 600,
                fontSize: '1.15rem',
                letterSpacing: '0.5px',
                padding: '8px 18px',
                borderRadius: 12,
                textShadow: '0 2px 8px rgba(31,38,135,0.18)',
                background: 'rgba(255,255,255,0.06)',
                transition: 'background 0.2s, color 0.2s',
              }}
              onClick={() => navigate("/shop")}
              tabIndex={0}
            >
              Shop
            </Link>
          </nav>
          <div
            className="user-actions"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              position: 'relative',
            }}
          >
            <Link
              to="/wishlist"
              className="wishlist-header-icon"
              title="Wishlist"
              style={{
                position: 'relative',
                fontSize: 22,
                color: wishlist.length > 0 ? '#ff7d1a' : '#fff',
                background: 'rgba(255,255,255,0.13)',
                borderRadius: '50%',
                padding: 8,
                boxShadow: '0 2px 8px rgba(31,38,135,0.10)',
                transition: 'background 0.2s, color 0.2s',
                border: wishlist.length > 0 ? '2px solid #ff7d1a' : '2px solid transparent',
              }}
              aria-label="Wishlist"
            >
              <FaHeart />
              {wishlist.length > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    background: '#ff7d1a',
                    color: '#fff',
                    borderRadius: '50%',
                    fontSize: 11,
                    width: 18,
                    height: 18,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    boxShadow: '0 2px 8px rgba(255,125,26,0.18)',
                  }}
                >
                  {wishlist.length}
                </span>
              )}
            </Link>
            {!user && (
              <>
                <Link
                  to="/login"
                  className="login-btn"
                  style={{
                    background: 'rgba(255,255,255,0.13)',
                    color: '#fff',
                    marginRight: 8,
                    border: '2px solid #fff',
                    fontWeight: 700,
                    fontSize: '1.05rem',
                    borderRadius: 14,
                    padding: '8px 20px',
                    letterSpacing: '0.5px',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="login-btn"
                  style={{
                    background: 'linear-gradient(90deg, #2563eb 0%, #a259e6 100%)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '1.05rem',
                    borderRadius: 14,
                    padding: '8px 20px',
                    letterSpacing: '0.5px',
                    border: 'none',
                    boxShadow: '0 2px 12px rgba(161,140,209,0.12)',
                  }}
                >
                  Sign Up
                </Link>
              </>
            )}
            {user && (
              <div style={{ position: 'relative' }}>
                <span
                  style={{
                    color: '#fff',
                    fontSize: 22,
                    marginRight: 8,
                    cursor: 'pointer',
                    background: 'rgba(255,255,255,0.13)',
                    borderRadius: '50%',
                    padding: 8,
                    border: '2px solid #fff',
                    boxShadow: '0 2px 8px rgba(31,38,135,0.10)',
                  }}
                  title={user.name || user.email}
                  onClick={() => setDropdownOpen((open) => !open)}
                  tabIndex={0}
                  onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                >
                  <FaUser />
                </span>
                {dropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 38,
                      background: 'rgba(255,255,255,0.98)',
                      color: '#222',
                      borderRadius: 12,
                      boxShadow: '0 4px 16px rgba(31,38,135,0.13)',
                      minWidth: 140,
                      zIndex: 10,
                      border: '1.5px solid #eee',
                    }}
                  >
                    <div style={{ padding: '12px 18px', borderBottom: '1px solid #eee', fontWeight: 700, color: 'var(--primary-dark)' }}>{user.name || user.email}</div>
                    <button
                      onClick={handleLogout}
                      style={{
                        width: '100%',
                        background: 'none',
                        border: 'none',
                        color: '#e74c3c',
                        fontWeight: 700,
                        padding: '12px 18px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        fontSize: 16,
                        borderRadius: 0,
                        transition: 'background 0.2s',
                      }}
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
            <Link
              to="/cart"
              className="cart-icon"
              aria-label="Cart"
              style={{
                position: 'relative',
                fontSize: 22,
                color: '#fff',
                background: 'rgba(255,255,255,0.13)',
                borderRadius: '50%',
                padding: 8,
                boxShadow: '0 2px 8px rgba(31,38,135,0.10)',
                marginLeft: 4,
                border: '2px solid #fff',
                transition: 'background 0.2s, color 0.2s',
              }}
            >
              <FaShoppingCart />
              <span
                className="cart-count"
                style={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  background: '#ff7d1a',
                  color: '#fff',
                  borderRadius: '50%',
                  width: 20,
                  height: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  boxShadow: '0 2px 8px rgba(255,125,26,0.18)',
                }}
              >
                {cartCount}
              </span>
            </Link>
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              style={{
                background: theme === 'dark' ? 'rgba(40,40,60,0.7)' : 'rgba(255,255,255,0.13)',
                border: '2px solid #fff',
                borderRadius: '50%',
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme === 'dark' ? '#ffe066' : '#2563eb',
                fontSize: 20,
                marginLeft: 2,
                marginRight: 2,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(31,38,135,0.10)',
                transition: 'background 0.2s, color 0.2s',
                outline: 'none',
              }}
            >
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>
            <button
              className="menu-toggle"
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: 28,
                display: 'none',
                marginLeft: 8,
                cursor: 'pointer',
              }}
              onClick={() => setMenuOpen((m) => !m)}
              aria-label="Toggle menu"
            >
              ☰
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .main-header { margin: 0 0 24px 0 !important; border-radius: 0 !important; }
          .container { padding: 0 8px !important; }
        }
        @media (max-width: 700px) {
          .main-nav { display: none !important; }
          .menu-toggle { display: inline-block !important; }
          .header-content { flex-wrap: wrap; gap: 8px !important; }
        }
        @media (max-width: 500px) {
          .main-header { padding: 0 !important; }
          .logo h1 { font-size: 1.3rem !important; }
          .cart-icon, .wishlist-header-icon { font-size: 18px !important; padding: 6px !important; }
        }
        .main-header .nav-link:hover, .main-header .nav-link:focus-visible {
          background: #fff !important;
          color: #2563eb !important;
          text-decoration: underline;
        }
        .main-header .login-btn:hover, .main-header .login-btn:focus-visible {
          background: #ff7d1a !important;
          color: #fff !important;
        }
        .main-header .cart-icon:hover, .main-header .wishlist-header-icon:hover {
          background: #2563eb !important;
          color: #fff !important;
        }
      `}</style>
    </header>
  );
};

export default Header;