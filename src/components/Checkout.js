import { useContext, useEffect, useState } from "react";
import calculateCartTotalPrice from "../helper/calculateCartTotalPrice";
import { CartContext } from "../context/CartContext";

const Checkout = ({ label }) => {
  const { cart } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const totalPrice = calculateCartTotalPrice(cart);
    setTotalPrice(totalPrice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  return (
    <div className="checkout mt-3">
      <div className="checkout-header">
        <p className="fs-6 text-gray mb-0">{label}</p>
      </div>
      <div className="checkout-body bg-white rounded shadow-sm p-3">
        <p className="fs-4">
          Total Price:<span className="text-primary fw-bold ms-1">{totalPrice}₺</span>
        </p>
        <button className="btn btn-primary w-100 fw-bold">Checkout</button>
      </div>
    </div>
  );
};
export default Checkout;
