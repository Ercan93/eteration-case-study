import ProductList from "../pages/ProductList/ProductList";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import NotFound from "../pages/NotFound/NotFound";

const routes = [
  {
    path: "/",
    element: <ProductList />,
  },
  {
    path: "/product/:id",
    element: <ProductDetail />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
