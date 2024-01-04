import { render, screen } from "@testing-library/react";
import { CartContext } from "../../context/CartContext";
import Checkout from "./Checkout";

describe("Checkout", () => {
  const mockCart = [
    { id: "1", name: "Product 1", price: 10, quantity: 1 },
    { id: "2", name: "Product 2", price: 20, quantity: 2 },
  ];

  it("renders without crashing", () => {
    render(
      <CartContext.Provider value={{ cart: mockCart }}>
        <Checkout label="Test Checkout" />
      </CartContext.Provider>
    );
  });

  it("displays the correct label", () => {
    render(
      <CartContext.Provider value={{ cart: mockCart }}>
        <Checkout label="Test Checkout" />
      </CartContext.Provider>
    );
    expect(screen.getByText("Test Checkout")).toBeInTheDocument();
  });

  it("calculates the total price correctly", () => {
    render(
      <CartContext.Provider value={{ cart: mockCart }}>
        <Checkout label="Test Checkout" />
      </CartContext.Provider>
    );
    const totalPrice = mockCart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    expect(screen.getByText(`${totalPrice}₺`)).toBeInTheDocument();
  });

  it('displays "Checkout" on the button', () => {
    render(
      <CartContext.Provider value={{ cart: mockCart }}>
        <Checkout label="Test Checkout" />
      </CartContext.Provider>
    );
    expect(screen.getByText("Checkout")).toBeInTheDocument();
  });
});
