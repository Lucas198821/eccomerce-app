import logo from "../assets/logo.png"; 

const Navbar = ({ toggleCart, cartCount, search, setSearch }) => (
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
      <button className="btn btn-outline-light position-relative" onClick={toggleCart}>
        🛒
        {cartCount > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {cartCount}
          </span>
        )}
      </button>
    </div>
  </nav>
);

export default Navbar;