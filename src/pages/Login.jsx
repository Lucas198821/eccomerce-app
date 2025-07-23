import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../components/context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png"; // Asegúrate de que la ruta al logo sea correcta

// --- Styled Components ---

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background-color: #f8f9fa;
`;

const LoginCard = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 320px;
  text-align: center;
`;

const Logo = styled.img`
  width: 60px;
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  margin-bottom: 2rem;
  color: #333;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  text-align: left;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #555;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  label {
    color: #555;
  }
`;

const SubmitButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 0.8rem;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #218838;
  }
`;

const ForgotPasswordLink = styled.a`
  color: #007bff;
  text-decoration: none;
  margin-top: 1rem;
  display: inline-block;

  &:hover {
    text-decoration: underline;
  }
`;

const SignUpLink = styled.div`
  margin-top: 1.5rem;
  color: #555;
  
  a {
    color: #007bff;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

// --- Login Component ---

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === "" || password.trim() === "") {
      return alert("Ingresa usuario y contraseña");
    }
    try {
      login(username, password);
      navigate("/"); // redirige al home
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <LoginContainer>
      <Helmet>
        <title>Iniciar Sesión - Mi Tienda</title>
        <meta name="description" content="Inicia sesión para acceder a tu cuenta." />
      </Helmet>
      <LoginCard>
        <Logo src={logo} alt="Logo" />
        <Title>Iniciar sesión</Title>
        <StyledForm onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              type="text"
              placeholder="Ingresa tu usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <CheckboxWrapper>
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">Recuérdame</label>
          </CheckboxWrapper>
          <SubmitButton type="submit">Entrar</SubmitButton>
        </StyledForm>
        <ForgotPasswordLink href="#">
          ¿Olvidaste tu contraseña?
        </ForgotPasswordLink>

        <SignUpLink>
          ¿No tienes una cuenta? <Link to="/register">Crear cuenta</Link>
        </SignUpLink>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
