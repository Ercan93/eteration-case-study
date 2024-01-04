import { useContext, useEffect, useState } from "react";
import Cart from "../../components/Cart/Cart";
import Checkout from "../../components/Checkout/Checkout";
import { CartContext } from "../../context/CartContext";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";

const ProductDetail = () => {
  const { addToCart } = useContext(CartContext);
  const { products, fetchProducts } = useContext(ProductContext);
  const [product, setProduct] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const product = products.find((product) => product.id === id);
    if (!product) navigate("/404");
    setProduct(product);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, products]);

  useEffect(() => {
    if (products.length === 0) fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  return (
    <div className="ProductDetail container-fluid">
      <div className="row mt-4">
        <div className="col-12 offset-0 offset-md-1 col-md-7 bg-white shadow-sm p-3">
          <div className="row">
            <div className="col-12 col-md-6">
              <img src={product?.image} alt="product" className="w-100" />
            </div>
            <div className="col-12 col-md-6">
              <p className="fs-3 mb-0">{product?.name}</p>
              <p className="fs-3 fw-semibold text-primary">{product?.price}₺</p>
              <button
                className="btn btn-primary fw-bold mt-4 w-100"
                onClick={() => addToCart(id)}
              >
                Add to Cart
              </button>
              <p className="fs-5 mt-3">{product?.description}</p>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-3">
          <div className="sticky-top sticky-sidebar">
            <Cart label="Cart" />
            <Checkout label="Checkout" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
