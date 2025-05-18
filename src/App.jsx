// /src/App.jsx
import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./components/Auth/Sign_up";
import Login from "./components/Auth/Login";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import Shop from "./pages/Shop";
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";
import "./App.css";

const AppInner = () => {
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
};

export default App;
