import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ProductContextProvider } from "./context/ProductContext";
import { CartContextProvider } from "./context/CartContext";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProductContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </ProductContextProvider>
  </React.StrictMode>
);
