import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Add product to cart
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  // Remove product from cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Update quantity
  const updateQuantity = (id, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => setCart([]);

  // Wishlist functions
  const addWishlist = (product) => {
    setWishlist((prev) =>
      prev.find((item) => item.id === product.id) ? prev : [...prev, product]
    );
  };
  const removeWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };
  const isInWishlist = (id) => wishlist.some((item) => item.id === id);

  // Cart count
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Cart total
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal,
        wishlist, addWishlist, removeWishlist, isInWishlist
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext); 