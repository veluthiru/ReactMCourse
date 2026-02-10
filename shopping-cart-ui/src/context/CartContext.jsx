import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((preValue) => {
      const existing = preValue.find((item) => item.id === product.id);
      console.log("🚀 ~ addToCart ~ existing:", existing);
      if (existing) {
        return preValue.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [...preValue, { ...product, qty: 1 }];
    });
  };
  const removeFromCart = (productId) => {
    setCart((preValue) => {
      const existing = preValue.find((item) => item.id === productId);
      if (existing) {
        if (existing.qty > 1) {
          return preValue.map((item) =>
            item.id === productId ? { ...item, qty: item.qty - 1 } : item,
          );
        }
        return preValue.filter((item) => item.id !== productId);
      }
      return preValue;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
