/** @format */

import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToModify) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToModify.id);

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToModify.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
  }
  return [...cartItems, { ...productToModify, quantity: 1 }];
};

const removeCartItem = (cartItems, productToModify) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToModify.id);

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToModify.id && cartItem.quantity > 1
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...productToModify, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    setCartCount(newCartCount);
  }, [cartItems]);

  const addItemToCart = (productToModify) => {
    setCartItems(addCartItem(cartItems, productToModify));
  };

  const removeItemFromCart = (productToModify) => {
    setCartItems(removeCartItem(cartItems, productToModify));
  };

  const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, cartItems, cartCount };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
