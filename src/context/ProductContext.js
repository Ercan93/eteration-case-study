import React, { createContext, useEffect, useState } from "react";

const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const limit = 8;
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [model, setModel] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [cart, setCart] = useState([]);
  const [filters, setFilters] = useState({
    text: "",
    sort: "featured",
    brands: [],
    model: [],
  });

  /**
   * @description Applies the filters to the products.
   * @returns {void}
   */
  const applyFilters = () => {
    const { text, sort, brands, model } = filters;
    let tempProducts = [...products];

    if (text) {
      tempProducts = tempProducts.filter((product) =>
        product.name.toLowerCase().startsWith(text)
      );
    }

    if (brands.length > 0) {
      tempProducts = tempProducts.filter((product) =>
        brands.includes(product.brand)
      );
    }

    if (model.length > 0) {
      tempProducts = tempProducts.filter((product) =>
        model.includes(product.model)
      );
    }

    if (sort) {
      if (sort === "old-to-new") {
        tempProducts = tempProducts.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      }
      if (sort === "new-to-old") {
        tempProducts = tempProducts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      }
      if (sort === "price-highest") {
        tempProducts = tempProducts.sort((a, b) => b.price - a.price);
      }
      if (sort === "price-lowest") {
        tempProducts = tempProducts.sort((a, b) => a.price - b.price);
      }
    }

    setFilteredProducts(tempProducts);
  };

  /**
   * @description Returns the unique values of the given type.
   * @param {Array} data - The array of products.
   * @param {string} type - The type of value.
   * @returns {Array} - The array of unique values.
   */
  const getUniqueValues = (data, type) => {
    let unique = data.map((item) => item[type]);
    return [...new Set(unique)];
  };

  /**
   * @description Fetches the products from the API.
   * @returns {void}
   */
  const fetchProducts = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL);
      const fetchedProducts = await response.json();
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * @description Creates the filter content.
   * @returns {void}
   */
  const createFilterContent = () => {
    setBrands(getUniqueValues(products, "brand"));
    setModel(getUniqueValues(products, "model"));
  };

  useEffect(() => {
    createFilterContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  useEffect(() => {
    setTotalPage(Math.ceil(filteredProducts.length / limit));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredProducts]);

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        brands,
        model,
        page,
        limit,
        totalPage,
        cart,
        filters,
        fetchProducts,
        applyFilters,
        setProducts,
        setFilteredProducts,
        setPage,
        setTotalPage,
        setCart,
        setFilters,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductContextProvider };
