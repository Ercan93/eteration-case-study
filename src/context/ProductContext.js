import React, { createContext, useEffect, useState } from "react";

const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [model, setModel] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [totalPage, setTotalPage] = useState(0);
  const [cart, setCart] = useState([]);
  const [filters, setFilters] = useState({
    text: "",
    sort: "featured",
    brands: [],
    model: [],
  });

  const applyFilters = () => {
    const { text, sort, brands, model } = filters;
    let tempProducts = [...products];
    // filter based on text
    if (text) {
      tempProducts = tempProducts.filter((product) =>
        product.name.toLowerCase().startsWith(text)
      );
    }
    // filter based on brands
    if (brands.length > 0) {
      tempProducts = tempProducts.filter((product) =>
        brands.includes(product.brand)
      );
    }
    // filter based on model
    if (model.length > 0) {
      tempProducts = tempProducts.filter((product) =>
        model.includes(product.model)
      );
    }
    // sort based on sort
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

  const getUniqueValues = (data, type) => {
    let unique = data.map((item) => item[type]);
    return [...new Set(unique)];
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(process.env.REACT_APP_API_URL);
      const fetchedProducts = await response.json();
      setLoading(false);
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

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
        loading,
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
        setLoading,
        setPage,
        setLimit,
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
