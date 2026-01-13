'use client';

import { createContext, useContext } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [cart, setCart, isInitialized] = useLocalStorage('fakestore-cart', []);

  // Add item to cart or increase quantity if already exists
  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);

      if (existingItem) {
        // Increase quantity
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Add new item with quantity 1
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  // Remove one unit or remove item entirely if quantity reaches 0
  const removeFromCart = (productId) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === productId);

      if (!existingItem) return currentCart;

      if (existingItem.quantity > 1) {
        // Decrease quantity
        return currentCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }

      // Remove item if quantity is 1
      return currentCart.filter((item) => item.id !== productId);
    });
  };

  // Update quantity directly (used for manual input)
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      // Remove item if quantity is 0 or negative
      setCart((currentCart) => currentCart.filter((item) => item.id !== productId));
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Get quantity of specific product in cart
  const getItemQuantity = (productId) => {
    const item = cart.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  // Get total number of items in cart
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Get total price of cart
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
  };

  const value = {
    cart,
    isInitialized,
    addToCart,
    removeFromCart,
    updateQuantity,
    getItemQuantity,
    getTotalItems,
    getTotalPrice,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
