import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Cargar usuario logueado y lista de usuarios desde localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  const login = (username, password) => {
    const userExists = users.find(
      (u) => u.username === username && u.password === password
    );

    if (userExists) {
      setUser({ username });
      localStorage.setItem("user", JSON.stringify({ username }));
    } else {
      throw new Error("Usuario o contraseña incorrectos.");
    }
  };

  const register = (username, password) => {
    const userExists = users.find((u) => u.username === username);
    if (userExists) {
      throw new Error("El nombre de usuario ya existe.");
    }

    const newUser = { username, password };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, users, login, logout, register, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
