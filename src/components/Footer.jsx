import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const FooterContainer = styled.footer`
  background-color: #212529; /* Color bg-dark de Bootstrap */
  color: #e0e0e0;
  padding: 3rem 2rem;
  margin-top: auto; /* Empuja el footer al final */
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 2rem;
`;

const FooterColumn = styled.div`
  h5 {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
    color: #fff;
    font-weight: 600;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 0.8rem;
  }

  a {
    color: #e0e0e0;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: #fff;
      text-decoration: underline;
    }
  }
`;

const LogoColumn = styled(FooterColumn)`
  img {
    width: 150px;
    margin-bottom: 1rem;
  }

  p {
    font-size: 0.9rem;
    line-height: 1.5;
    max-width: 250px;
  }
`;

const CopyrightSection = styled.div`
  border-top: 1px solid #343a40; /* Un tono más claro que bg-dark */
  padding-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Footer = () => (
  <FooterContainer>
    <FooterGrid>
      <LogoColumn>
        <img src={logo} alt="Logo de la tienda" />
        <p>Tu tienda online de confianza para productos increíbles.</p>
      </LogoColumn>

      <FooterColumn>
        <h5>Enlaces útiles</h5>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/about">Nosotros</Link></li>
          <li><Link to="/contact">Contacto</Link></li>
        </ul>
      </FooterColumn>

      <FooterColumn>
        <h5>Síguenos</h5>
        <ul>
          <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
          <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
          <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        </ul>
      </FooterColumn>
    </FooterGrid>
    <CopyrightSection>
      <p>&copy; {new Date().getFullYear()} Mi Tienda. Todos los derechos reservados.</p>
    </CopyrightSection>
  </FooterContainer>
);

export default Footer;
