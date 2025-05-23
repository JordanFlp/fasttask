import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Logo from "../../../assets/images/symbol_blue.svg";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="ft-header">
      <nav className="ft-nav">
        <div className="ft-nav-top">
          <div className="ft-logo">
            <Link to="/" className="ft-logo-link">
              <img src={Logo} alt="Logo Fast Task" className="ft-logo-img" />
              <span className="ft-logo-text">Fast Task</span>
            </Link>
          </div>
          <div className="ft-menu-label" onClick={handleMenuToggle}>
            <span className="ft-menu-icon"></span>
            <span className="ft-menu-icon"></span>
            <span className="ft-menu-icon"></span>
          </div>
        </div>
        <ul className={`ft-nav-menu ${menuOpen ? "open" : ""}`}>
          <li className="ft-nav-item">
            <Link to="/" className="ft-nav-link">
              Início
            </Link>
          </li>
          <li className="ft-nav-item">
            <Link to="/funcionalidades" className="ft-nav-link">
              Funcionalidades
            </Link>
          </li>
          <li className="ft-nav-item">
            <Link to="/screenshots" className="ft-nav-link">
              Screenshots
            </Link>
          </li>
          <li className="ft-nav-item">
            <Link to="/sobre" className="ft-nav-link">
              Sobre
            </Link>
          </li>
          <li className="ft-nav-item">
            <Link to="http://localhost:3000/login" className="ft-btn-login">
              Entrar
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;