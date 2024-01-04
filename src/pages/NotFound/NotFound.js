import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="row mt-5 text-center">
        <div className="col-12">
          <h1 className="fs-1 fw-bold text-danger">404</h1>
          <p className="fs-2 fw-semibold">Page not found</p>
          <p className="fs-5">The page you are looking for does not exist.</p>
          <button
            className="btn btn-primary mt-2"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
