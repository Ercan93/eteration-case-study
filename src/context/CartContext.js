import React, { createContext, useContext, useEffect, useState } from "react";
import { ProductContext } from "./ProductContext";
import useDidUpdateEffect from "../helper/useDidUpdateEffect";

const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const { products } = useContext(ProductContext);
  const [cart, setCart] = useState([]);

  const addToCart = (id) => {
    let product = products.find((product) => product.id === id);
    let item = cart.find((product) => product.id === id);

    if (item) {
      increaseQuantity(id);
      return;
    }

    const newCart = [
      ...cart,
      {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      },
    ];
    setCart(newCart);
  };

  const increaseQuantity = (id) => {
    const newCart = cart.map((product) => {
      if (product.id === id) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    setCart(newCart);
  };

  const decreaseQuantity = (id) => {
    const newCart = cart?.map((product) => {
      if (product.id === id && product.quantity > 1) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });
    setCart(newCart);
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter((product) => product.id !== id);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartFromLocalStorage = () => {
    const localCart = localStorage.getItem("et-cart");
    if (localCart) setCart(JSON.parse(localCart));
  };

  const saveCartToLocalStorage = () => {
    localStorage.setItem("et-cart", JSON.stringify(cart));
  };

  useDidUpdateEffect(() => {
    saveCartToLocalStorage();
  }, [cart]);

  useEffect(() => {
    getCartFromLocalStorage();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };
