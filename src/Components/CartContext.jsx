import React, { createContext, useState, useEffect } from 'react';
import Swal from "sweetalert2";


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

    const loadCartFromLocalStorage = () => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  };

  useEffect(() => {
    loadCartFromLocalStorage();
  }, []);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    
    if (product.quantity > product.stock) {
      Swal.fire({
        icon: "error",
        title: "Cantidad excede el stock disponible",
        text: "No puedes agregar más productos de los que tenemos en stock.",
      });
      return;
    }
    
    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else if (product.quantity > 1) {
      setCartItems((prevItems) => [...prevItems, { ...product }])
    } else {
      setCartItems((prevItems) => [...prevItems, { ...product, quantity: 1 }]);
    }
  };
  

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : null
          : item
      ).filter((item) => item !== null) 
    );
  };
  

  const clearCart = () => {
    setCartItems([]);
  };


  const saveCartToLocalStorage = (cartItems) => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  useEffect(() => {
    saveCartToLocalStorage(cartItems);
  }, [cartItems]);
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
