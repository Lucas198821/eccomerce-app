
const CartSidebar = ({ cart, setCart, toggleCart, show }) => {
  const handleQuantity = (index, delta) => {
    const updatedCart = [...cart];
    const item = updatedCart[index];
    item.quantity = Math.max(1, item.quantity + delta);
    setCart(updatedCart);
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  return (
    <div
      className="position-fixed top-0 end-0 bg-white shadow p-4 h-100 overflow-auto"
      style={{ width: "350px", zIndex: 1050, transform: show ? "translateX(0%)" : "translateX(100%)", transition: "transform 0.3s ease" }}
    >
      <div className="d-flex justify-content-between mb-3">
        <h5>Carrito de Compras</h5>
        <button className="btn-close" onClick={toggleCart}></button>
      </div>
      {cart.map((item, index) => (
        <div className="d-flex mb-3 align-items-center" key={index}>
          <img src={item.image} alt={item.title} width="50" height="50" className="me-2" style={{ objectFit: "contain" }} />
          <div className="flex-grow-1">
            <strong>{item.title}</strong>
            <div>Precio: ${item.price}</div>
            <div className="d-flex align-items-center">
              <span className="me-2">Cantidad: {item.quantity}</span>
              <button className="btn btn-sm btn-danger me-1" onClick={() => handleQuantity(index, -1)}>-</button>
              <button className="btn btn-sm btn-success" onClick={() => handleQuantity(index, 1)}>+</button>
            </div>
          </div>
        </div>
      ))}
      <hr />
      <h5>Total: ${total}</h5>
      <div className="d-flex justify-content-between mt-3">
        <button className="btn btn-outline-danger" onClick={() => setCart([])}>Vaciar Carrito</button>
        <button className="btn btn-primary">Realizar Compra</button>
      </div>
    </div>
  );
};

export default CartSidebar;