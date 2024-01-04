import { render, screen, fireEvent } from "@testing-library/react";
import { CartContext } from "../../context/CartContext";
import { BrowserRouter as Router } from "react-router-dom";
import ProductCard from "./ProductCard";

describe("ProductCard", () => {
  const mockProduct = {
    id: "1",
    name: "Product 1",
    price: "10",
    image: "image.jpg",
  };
  const addToCart = jest.fn();

  it("renders without crashing", () => {
    render(
      <CartContext.Provider value={{ addToCart }}>
        <Router>
          <ProductCard product={mockProduct} />
        </Router>
      </CartContext.Provider>
    );
  });

  it("displays the correct product name", () => {
    render(
      <CartContext.Provider value={{ addToCart }}>
        <Router>
          <ProductCard product={mockProduct} />
        </Router>
      </CartContext.Provider>
    );
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
  });

  it("displays the correct product price", () => {
    render(
      <CartContext.Provider value={{ addToCart }}>
        <Router>
          <ProductCard product={mockProduct} />
        </Router>
      </CartContext.Provider>
    );
    expect(screen.getByText(`${mockProduct.price} ₺`)).toBeInTheDocument();
  });

  it('calls addToCart when "Add to Cart" button is clicked', () => {
    render(
      <CartContext.Provider value={{ addToCart }}>
        <Router>
          <ProductCard product={mockProduct} />
        </Router>
      </CartContext.Provider>
    );
    fireEvent.click(screen.getByText("Add to Cart"));
    expect(addToCart).toHaveBeenCalledWith(mockProduct.id);
  });
});
