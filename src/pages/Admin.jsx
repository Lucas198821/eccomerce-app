import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";

const API_URL = "https://688023a6f1dcae717b6125cb.mockapi.io/products";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (err) {
      setError("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || form.description.length < 10 || Number(form.price) <= 0) {
      alert("Revisa los campos: título obligatorio, precio > 0, descripción min. 10 caracteres.");
      return;
    }

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form);
      } else {
        await axios.post(API_URL, form);
      }

      setForm({ title: "", price: "", description: "", image: "", category: "" });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      alert("Error al guardar el producto");
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchProducts();
    } catch {
      alert("Error al eliminar");
    }
  };

  return (
    <div className="container mt-5">
      <Helmet>
        <title>Administración - Mi Tienda</title>
        <meta name="description" content="Gestiona los productos de la tienda." />
      </Helmet>
      <h2>Gestión de Productos</h2>

      <form className="mb-4" onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="price"
          type="number"
          placeholder="Precio"
          value={form.price}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="category"
          placeholder="Categoría"
          value={form.category}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="image"
          placeholder="URL de imagen"
          value={form.image}
          onChange={handleChange}
        />
        <textarea
          className="form-control mb-2"
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
        />
        <button className="btn btn-success" type="submit">
          {editingId ? "Actualizar" : "Agregar"}
        </button>
      </form>

      {loading && <p>Cargando productos...</p>}
      {error && <p className="text-danger">{error}</p>}

      <ul className="list-group">
        {products.map((p) => (
          <li
            key={p.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{p.title}</strong> (${p.price})<br />
              <em>{p.category}</em>
              <p>{p.description}</p>
            </div>
            <div>
              <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(p)}>
                Editar
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
