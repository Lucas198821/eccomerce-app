import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";
import CartSidebar from "../components/CartSidebar";
import ImageCarousel from "../components/Carousel";
import { useCart } from "../components/context/CartContext";

const Home = () => {
  const [isCartOpen, setCartOpen] = useState(false);
  const { cart } = useCart();
  const [search, setSearch] = useState("");

  const toggleCart = () => {
    setCartOpen(!isCartOpen);
  };

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <div>
      <Helmet>
        <title>Mi Tienda - Página Principal</title>
        <meta name="description" content="Encuentra los mejores productos en nuestra tienda online." />
      </Helmet>
      <Navbar
        toggleCart={toggleCart}
        cartCount={cartCount}
        search={search}
        setSearch={setSearch}
      />
      <ImageCarousel />
      <div style={{ display: "flex" }}>
        <div className="container mt-4" style={{ flexGrow: 1 }}>
          <ProductList search={search} />
        </div>
        <CartSidebar isOpen={isCartOpen} toggle={toggleCart} />
      </div>
    </div>
  );
};

export default Home;
