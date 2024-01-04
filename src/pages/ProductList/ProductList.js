import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import ProductCard from "../../components/ProductCard/ProductCard";
import SortFilter from "../../components/SortFilter/SortFilter";
import CheckboxFilter from "../../components/CheckboxFilter/CheckboxFilter";
import Cart from "../../components/Cart/Cart";
import Checkout from "../../components/Checkout/Checkout";
import Pagination from "../../components/Pagination/Pagination";
import { SORT_VALUES } from "../../helper/constants";

const ProductList = () => {
  const {
    products,
    brands,
    model,
    filters,
    page,
    totalPage,
    limit,
    setFilters,
    setPage,
    filteredProducts,
    fetchProducts,
  } = useContext(ProductContext);
  const [listedProducts, setListedProducts] = useState([]);

  /**
   * Handles the checkbox filter event.
   * @param {Object} e - The event object.
   * @param {string} type - The type of filter.
   */
  const checkboxFilterHandler = (e, type) => {
    const { checked, value } = e.target;
    const newFilters = { ...filters };
    if (checked) {
      newFilters[type].push(value);
    } else {
      newFilters[type] = newFilters[type].filter((item) => item !== value);
    }
    setFilters(newFilters);
  };

  /**
   * Handles the sorting and filtering of products.
   * @param {Event} e - The event object.
   */
  const sortFilterHandler = (e) => {
    const { value } = e.target;
    const newFilters = { ...filters };
    newFilters.sort = value;
    setFilters(newFilters);
  };

  useEffect(() => {
    const firstIndex = (page - 1) * limit;
    const lastIndex = page * limit;
    const listedProducts = filteredProducts.slice(firstIndex, lastIndex);
    setListedProducts(listedProducts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredProducts, page]);

  useEffect(() => {
    if (products.length === 0) fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="home container-fluid bg-light">
      <div className="row">
        <div className="offset-0 offset-lg-1 col-12 col-md-3 col-lg-2">
          <div className="Filters sticky-top sticky-sidebar">
            <SortFilter
              sortValues={SORT_VALUES}
              label="Sort By"
              checked={filters.sort}
              onChange={(e) => sortFilterHandler(e)}
            />
            <CheckboxFilter
              options={brands}
              label="Brands"
              checked={filters.brands}
              onChange={(e) => checkboxFilterHandler(e, "brands")}
            />
            <CheckboxFilter
              options={model}
              label="Model"
              checked={filters.model}
              onChange={(e) => checkboxFilterHandler(e, "model")}
            />
          </div>
        </div>
        <div className="col-12 col-md-5 col-lg-6">
          <div className="row">
            {listedProducts.length > 0 ? (
              listedProducts?.map((product) => (
                <div className="col-12 col-lg-6 col-xl-3 my-3" key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <p className="fs-2 text-center text-primary fw-bold mt-4">
                No Products Found
              </p>
            )}
          </div>
          <div className="row my-4">
            <div className="col-12">
              <Pagination
                totalPage={totalPage}
                onChangePage={(currentPage) => setPage(currentPage)}
              />
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4 col-lg-3 col-xl-2">
          <div className="sticky-top sticky-sidebar">
            <Cart label="Cart" />
            <Checkout label="Checkout" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
