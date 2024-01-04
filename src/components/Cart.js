import { useContext } from "react";
import PropTypes from "prop-types";
import { CartContext } from "../context/CartContext";

const Cart = ({ label }) => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useContext(CartContext);

  return (
    <div className="Cart">
      <div className="cart-header">
        <p className="fs-6 text-gray mb-0">{label}</p>
      </div>
      {cart.length > 0 ? (
        <div className="cart-body bg-white rounded shadow-sm">
          {cart.map((product) => (
            <div className="cart-body-item d-flex flex-column flex-lg-row align-items-center justify-content-between px-3 py-2" key={product.id}>
              <div className="cart-body-item-header text-center text-lg-start one-line-text">
                <p className="fs-6 text-gray mb-0">{product.name}</p>
                <p className="fs-6 text-primary mb-0">{product.price} ₺</p>
              </div>
              <div className="cart-body-item-body d-flex align-items-center justify-content-between">
                <div className="cart-body-item-body-quantity d-flex align-items-center justify-content-between">
                  <button
                    className="btn btn-light btn-sm fw-bold fs-5"
                    onClick={() => {
                      if (product.quantity === 1) {
                        removeFromCart(product.id);
                      } else {
                        decreaseQuantity(product.id);
                      }
                    }}
                  >
                    -
                  </button>
                  <p className="fs-4 text-white bg-primary mb-0 px-2 mx-1 rounded">
                    {product.quantity}
                  </p>
                  <button
                    className="btn btn-light btn-sm fw-bold fs-5"
                    onClick={() => {
                      if (product.quantity === 20) {
                        return;
                      } else {
                        increaseQuantity(product.id);
                      }
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="cart-body-empty bg-white rounded shadow-sm mt-1 mb-3 p-3">
          <p className="text-center mb-0">Cart is empty</p>
        </div>
      )}
    </div>
  );
};

Cart.defaultProps = {
  label: "",
};

Cart.propTypes = {
  label: PropTypes.string,
};

export default Cart;
