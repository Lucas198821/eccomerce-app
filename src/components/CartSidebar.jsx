import { useCart } from "./context/CartContext";
import { FaTrash, FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import styled from "styled-components";

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 350px;
  height: 100%;
  background-color: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  overflow-y: auto;
  z-index: 1050;
  transform: ${({ isOpen }) => (isOpen ? "translateX(0%)" : "translateX(100%)")};
  transition: transform 0.3s ease;
`;

const CartItem = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
    object-fit: contain;
    margin-right: 0.5rem;
  }

  .info {
    flex-grow: 1;

    p {
      margin-bottom: 0.25rem;
    }

    .price {
      color: #888;
    }

    .quantity-controls {
      display: flex;
      align-items: center;

      button {
        border: none;
        background: #ddd;
        padding: 2px 6px;
        margin: 0 5px;
        border-radius: 4px;
        cursor: pointer;
      }

      span {
        min-width: 20px;
        text-align: center;
      }
    }
  }

  .remove-btn {
    border: none;
    background: transparent;
    color: red;
    font-size: 0.9rem;
    cursor: pointer;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  button {
    background: none;
    border: 1px solid #000;
    border-radius: 4px;
    padding: 2px 6px;
    cursor: pointer;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h5 {
    margin: 0;
  }

  button {
    background-color: red;
    color: white;
    border: none;
    padding: 6px 10px;
    font-size: 0.9rem;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
  }
`;

const EmptyMessage = styled.p`
  color: #777;
`;

const CartSidebar = ({ isOpen, toggle }) => {
  const { cart, setCart, removeFromCart, clearCart } = useCart();

  const handleQuantity = (id, delta) => {
    const updatedCart = cart.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCart(updatedCart);
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  return (
    <Sidebar isOpen={isOpen}>
      <Header>
        <h5>Carrito</h5>
        <button onClick={toggle}>
          <FaTimes />
        </button>
      </Header>

      {cart.length === 0 ? (
        <EmptyMessage>El carrito está vacío.</EmptyMessage>
      ) : (
        <>
          {cart.map((item) => (
            <CartItem key={item.id}>
              <img src={item.image} alt={item.title} />
              <div className="info">
                <p>{item.title}</p>
                <p className="price">${item.price}</p>
                <div className="quantity-controls">
                  <button onClick={() => handleQuantity(item.id, -1)}>
                    <FaMinus />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantity(item.id, 1)}>
                    <FaPlus />
                  </button>
                </div>
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)} title="Eliminar">
                <FaTrash />
              </button>
            </CartItem>
          ))}

          <hr />
          <Footer>
            <h5>Total: ${total}</h5>
            <button onClick={clearCart}>
              <FaTrash />
              Vaciar
            </button>
          </Footer>
        </>
      )}
    </Sidebar>
  );
};

export default CartSidebar;
