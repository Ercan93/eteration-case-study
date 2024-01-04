import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { ProductContext } from "../context/ProductContext";
import cartIcon from "../assets/static/cart.svg";
import profileIcon from "../assets/static/profile.svg";
import calculateCartTotalPrice from "../helper/calculateCartTotalPrice";

const AppHeader = () => {
  const [total, setTotal] = useState(0);
  const { filters, setFilters } = useContext(ProductContext);
  const { cart } = useContext(CartContext);

  const searchHandler = (e) => {
    const { value } = e.target;
    setFilters({ ...filters, text: value });
  };

  useEffect(() => {
    const totalPrice = calculateCartTotalPrice(cart);
    setTotal(totalPrice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  return (
    <header className="App-header sticky-top container-fluid bg-primary py-3">
      <div className="row d-flex flex-wrap align-items-center justify-content-start">
        <div className="offset-0 offset-lg-1 col-12 col-md-3 col-lg-2 d-flex flex-wrap flex-md-nowrap align-items-center">
          <Link to="/" className="text-decoration-none">
            <p className="App-title fs-2 text-white fw-bold mb-0">Eteration</p>
          </Link>
        </div>
        <div className="col-12 col-md-4">
          <input
            id="search"
            className="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={filters?.search}
            onChange={searchHandler}
          />
        </div>
        <div className="col-12 col-md-3 d-flex flex-wrap align-items-center justify-content-end mt-3 mt-md-0">
          <div className="d-flex align-items-center">
            <img src={cartIcon} alt="cart" className="me-2" />
            <p className="text-white fs-5 mb-0">{total}₺</p>
          </div>
          <div className="d-flex align-items-center ms-4">
            <img src={profileIcon} alt="cart" className="me-1" />
            <p className="text-white fs-5 mb-0">Ercan</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
