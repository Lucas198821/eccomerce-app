import logo from "../assets/logo.png"; 
import { useAuth } from "./context/AuthContext.jsx";
import { Link } from "react-router-dom";

const Navbar = ({ toggleCart, cartCount, search, setSearch }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid d-flex justify-content-between align-items-center px-4">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="Logo" height="60" />
        </a>

        <input
          type="text"
          className="form-control w-50 mx-3"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="d-flex align-items-center gap-2">
          {user && (
            <button
              className="btn btn-outline-light position-relative me-2"
              onClick={toggleCart}
            >
              🛒
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {user ? (
            <>
              <span className="text-white me-2">Hola, {user.username}</span>
              <button className="btn btn-outline-danger btn-sm" onClick={logout}>
                Salir
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-outline-primary btn-sm">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
