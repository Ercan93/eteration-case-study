import ProductList from "../pages/ProductList";
import ProductDetail from "../pages/ProductDetail";
import NotFound from "../pages/NotFound";

const routes = [
  {
    path: "/",
    element: <ProductList />,
  },
  {
    path: "/detail/:id",
    element: <ProductDetail />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
