import React, { useState } from "react";
import { toast } from "react-toastify";

const ProductForm = () => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!form.title.trim()) {
      toast.error("El nombre es obligatorio");
      return;
    }

    if (isNaN(form.price) || parseFloat(form.price) <= 0) {
      toast.error("El precio debe ser mayor a 0");
      return;
    }

    if (form.description.trim().length < 10) {
      toast.error("La descripción debe tener al menos 10 caracteres");
      return;
    }

    try {
      const response = await fetch(
        "https://688023a6f1dcae717b6125cb.mockapi.io/products",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) throw new Error("Error al crear el producto");

      toast.success("Producto agregado con éxito");

      setForm({ title: "", price: "", description: "", image: "" }); // Limpiar form
    } catch (err) {
      toast.error("Error al agregar el producto");
    }
  };

  return (
    <div className="container mt-4">
      <h4>Agregar Producto</h4>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Nombre del producto"
          className="form-control mb-2"
          value={form.title}
          onChange={handleChange}
        />
        <input
          name="price"
          type="number"
          placeholder="Precio"
          className="form-control mb-2"
          value={form.price}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Descripción"
          className="form-control mb-2"
          value={form.description}
          onChange={handleChange}
        />
        <input
          name="image"
          placeholder="URL de la imagen (opcional)"
          className="form-control mb-2"
          value={form.image}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-success">
          Agregar
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
