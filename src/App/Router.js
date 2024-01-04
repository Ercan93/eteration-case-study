import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes";
import AppHeader from "../components/AppHeader/AppHeader";

const Router = () => {
  return (
    <BrowserRouter>
      <AppHeader />
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} {...route} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
