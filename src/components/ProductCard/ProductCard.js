import { useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { CartContext } from "../../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { id, name, price, image } = product;

  return (
    <div className="product-card bg-white p-3 rounded shadow-sm">
      <Link to={`/product/${id}`}>
        <img src={image} className="product-card-img" alt={name} />
      </Link>
      <div className="product-card-body">
        <p className="product-card-body-price text-primary my-2">{price} ₺</p>
        <Link className="text-decoration-none text-black" to={`/product/${id}`}>
          <p className="product-card-body-name fw-semibold my-2 one-line-text">
            {name}
          </p>
        </Link>
      </div>
      <div className="product-card-footer">
        <button
          className="btn btn-primary mt-2 w-100 one-line-text"
          onClick={() => addToCart(id)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

ProductCard.defaultProps = {
  product: {},
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string,
    image: PropTypes.string,
  }),
};

export default ProductCard;
