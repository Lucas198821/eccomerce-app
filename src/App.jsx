import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartSidebar from "./components/CartSidebar";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
        const uniqueCats = [...new Set(data.map(p => p.category))];
        setCategories(uniqueCats);
      })
      .catch((err) => {
        setError("Error al cargar los productos");
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {
    const index = cart.findIndex((item) => item.id === product.id);
    if (index > -1) {
      const updatedCart = [...cart];
      updatedCart[index].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const toggleCart = () => setShowCart(!showCart);

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) &&
    (filterCategory === "" || p.category === filterCategory)
  );

  return (
    <div>
      <Navbar toggleCart={toggleCart} cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} search={search} setSearch={setSearch} />
      <CartSidebar cart={cart} setCart={setCart} toggleCart={toggleCart} show={showCart} />

      <div className="container-fluid mt-5 px-4">

        <h1 className="text-center mb-4">Catálogo de Productos</h1>

        <div className="mb-4">
          <select className="form-select w-auto" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="">Todas las categorías</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {loading && <div className="alert alert-info">Cargando productos...</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row">
          {filteredProducts.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card h-100">
                <img
                  src={product.image}
                  className="card-img-top p-3"
                  alt={product.title}
                  style={{ height: "200px", objectFit: "contain" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">Precio: ${product.price}</p>
                  <button className="btn btn-primary" onClick={() => addToCart(product)}>
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;