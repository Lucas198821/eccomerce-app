import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { FaEdit, FaTrash, FaSave, FaTimes, FaShoppingCart } from "react-icons/fa";
import { useCart } from "./context/CartContext";

const API_URL = "https://fakestoreapi.com/products";
const PRODUCTS_PER_PAGE = 5;

// Estilos
const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
`;

const ProductCard = styled.div`
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.img`
  max-width: 100%;
  height: 150px;
  object-fit: contain;
  margin-bottom: 1rem;
  align-self: center;
`;

const ProductInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductTitle = styled.h5`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  height: 4.5em;
  line-height: 1.5em;
  overflow: hidden;
`;

const AddToCartButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 0.75rem;
  width: 100%;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #218838;
  }
`;

const FormEdit = styled.form`
  border: 1px solid #007bff;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  background: #f8f9fa;
  grid-column: 1 / -1;
`;

const ProductList = ({ search }) => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", price: "", description: "", image: "" });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProducts(data);
    } catch {
      toast.error("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Producto eliminado");
      fetchProducts();
    } catch {
      toast.error("Error al eliminar");
    }
  };

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setEditForm(product);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editForm.title.trim()) return toast.error("El nombre es obligatorio");
    if (isNaN(editForm.price) || parseFloat(editForm.price) <= 0) return toast.error("El precio debe ser mayor a 0");
    if (editForm.description.trim().length < 10) return toast.error("La descripción debe tener al menos 10 caracteres");

    try {
      const res = await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (!res.ok) throw new Error();
      toast.success("Producto actualizado correctamente");
      setEditingId(null);
      fetchProducts();
    } catch {
      toast.error("Error al actualizar el producto");
    }
  };

  // FILTRADO Y PAGINADO
  const filtered = products.filter((p) =>
    (p.title || "").toLowerCase().includes((search || "").toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE);

  return (
    <div className="container mt-5">
      <h4 className="mb-4">Lista de Productos</h4>

      {loading ? (
        <p>Cargando productos...</p>
      ) : paginated.length === 0 ? (
        <p>No se encontraron productos.</p>
      ) : (
        <ProductGrid>
          {paginated.map((product) =>
            editingId === product.id ? (
              <FormEdit key={product.id} onSubmit={handleUpdate}>
                <input name="title" value={editForm.title} onChange={handleEditChange} className="form-control mb-2" placeholder="Nombre" />
                <input name="price" value={editForm.price} onChange={handleEditChange} type="number" className="form-control mb-2" placeholder="Precio" />
                <textarea name="description" value={editForm.description} onChange={handleEditChange} className="form-control mb-2" placeholder="Descripción" />
                <input name="image" value={editForm.image} onChange={handleEditChange} className="form-control mb-2" placeholder="Imagen URL" />
                <button className="btn btn-success btn-sm me-2" type="submit"><FaSave /> Guardar</button>
                <button className="btn btn-secondary btn-sm" onClick={() => setEditingId(null)}><FaTimes /> Cancelar</button>
              </FormEdit>
            ) : (
              <ProductCard key={product.id}>
                <ProductImage src={product.image} alt={product.title} />
                <ProductInfo>
                  <div>
                    <ProductTitle>{product.title}</ProductTitle>
                    <p>${product.price}</p>
                  </div>
                  <AddToCartButton onClick={() => addToCart(product)}>
                    Agregar al carrito
                  </AddToCartButton>
                </ProductInfo>
              </ProductCard>
            )
          )}
        </ProductGrid>
      )}

      {/* PAGINACIÓN */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-3">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`btn btn-sm me-1 ${page === i + 1 ? "btn-primary" : "btn-outline-primary"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
