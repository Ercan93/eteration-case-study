import { render, fireEvent, screen } from "@testing-library/react";
import { CartContext } from "../../context/CartContext";
import Cart from "./Cart";

describe("Cart", () => {
  const mockCart = [
    { id: "1", name: "Product 1", price: 10, quantity: 2 },
    { id: "2", name: "Product 2", price: 20, quantity: 1 },
  ];
  const mockIncreaseQuantity = jest.fn();
  const mockDecreaseQuantity = jest.fn();
  const mockRemoveFromCart = jest.fn();

  it("renders without crashing", () => {
    render(
      <CartContext.Provider
        value={{
          cart: mockCart,
          increaseQuantity: mockIncreaseQuantity,
          decreaseQuantity: mockDecreaseQuantity,
          removeFromCart: mockRemoveFromCart,
        }}
      >
        <Cart label="Test Cart" />
      </CartContext.Provider>
    );
  });

  it("displays the correct label", () => {
    render(
      <CartContext.Provider
        value={{
          cart: mockCart,
          increaseQuantity: mockIncreaseQuantity,
          decreaseQuantity: mockDecreaseQuantity,
          removeFromCart: mockRemoveFromCart,
        }}
      >
        <Cart label="Test Cart" />
      </CartContext.Provider>
    );
    expect(screen.getByText("Test Cart")).toBeInTheDocument();
  });

  it("displays the correct products", () => {
    render(
      <CartContext.Provider
        value={{
          cart: mockCart,
          increaseQuantity: mockIncreaseQuantity,
          decreaseQuantity: mockDecreaseQuantity,
          removeFromCart: mockRemoveFromCart,
        }}
      >
        <Cart label="Test Cart" />
      </CartContext.Provider>
    );
    mockCart.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(`${product.price} ₺`)).toBeInTheDocument();
      expect(screen.getByText(product.quantity.toString())).toBeInTheDocument();
    });
  });

  it("calls increaseQuantity when + button is clicked", () => {
    render(
      <CartContext.Provider
        value={{
          cart: mockCart,
          increaseQuantity: mockIncreaseQuantity,
          decreaseQuantity: mockDecreaseQuantity,
          removeFromCart: mockRemoveFromCart,
        }}
      >
        <Cart label="Test Cart" />
      </CartContext.Provider>
    );
    fireEvent.click(screen.getAllByText("+")[0]);
    expect(mockIncreaseQuantity).toHaveBeenCalledWith(mockCart[0].id);
  });

  it("calls decreaseQuantity or removeFromCart when - button is clicked", () => {
    render(
      <CartContext.Provider
        value={{
          cart: mockCart,
          increaseQuantity: mockIncreaseQuantity,
          decreaseQuantity: mockDecreaseQuantity,
          removeFromCart: mockRemoveFromCart,
        }}
      >
        <Cart label="Test Cart" />
      </CartContext.Provider>
    );
    fireEvent.click(screen.getAllByText("-")[0]);
    expect(mockDecreaseQuantity).toHaveBeenCalledWith(mockCart[0].id);
  });

  it("displays Cart is empty when cart is empty", () => {
    render(
      <CartContext.Provider
        value={{
          cart: [],
          increaseQuantity: mockIncreaseQuantity,
          decreaseQuantity: mockDecreaseQuantity,
          removeFromCart: mockRemoveFromCart,
        }}
      >
        <Cart label="Test Cart" />
      </CartContext.Provider>
    );
    expect(screen.getByText("Cart is empty")).toBeInTheDocument();
  });
});
