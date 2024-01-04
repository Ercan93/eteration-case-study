const calculateCartTotalPrice = (cart) => {
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return totalPrice;
};

export default calculateCartTotalPrice;
