import React, { createContext, useContext, useEffect, useState } from "react";
import { ProductContext } from "./ProductContext";
import useDidUpdateEffect from "../helper/useDidUpdateEffect";

const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const { products } = useContext(ProductContext);
  const [cart, setCart] = useState([]);

  /**
   * @description Adds the product to the cart.
   * @param {string} id
   * @returns {void}
   */
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

  /**
   * @description Increases the quantity of the product in the cart.
   * @param {string} id
   * @returns {void}
   */
  const increaseQuantity = (id) => {
    const newCart = cart.map((product) => {
      if (product.id === id) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    setCart(newCart);
  };

  /**
   * @description Decreases the quantity of the product in the cart.
   * @param {string} id
   * @returns {void}
   */
  const decreaseQuantity = (id) => {
    const newCart = cart?.map((product) => {
      if (product.id === id && product.quantity > 1) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });
    setCart(newCart);
  };

  /**
   * @description Removes the product from the cart.
   * @param {string} id
   * @returns {void}
   */
  const removeFromCart = (id) => {
    const newCart = cart.filter((product) => product.id !== id);
    setCart(newCart);
  };

  /**
   * @description Clears the cart.
   * @returns {void}
   */
  const clearCart = () => {
    setCart([]);
  };

  /**
   * @description Gets the cart from the local storage.
   * @returns {void}
   */
  const getCartFromLocalStorage = () => {
    const localCart = localStorage.getItem("et-cart");
    if (localCart) setCart(JSON.parse(localCart));
  };

  /**
   * @description Saves the cart to the local storage.
   * @returns {void}
   */
  const saveCartToLocalStorage = () => {
    localStorage.setItem("et-cart", JSON.stringify(cart));
  };

  /**
   * @description Saves the cart to the local storage when cart changes.
   * @returns {void}
   */
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
