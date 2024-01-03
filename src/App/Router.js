import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} {...route} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
