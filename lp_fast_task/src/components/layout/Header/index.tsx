import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Header: React.FC = () => {
  return (
    <header className="ft-header">
      <nav className="ft-nav">
        <div className="ft-nav-top">
          <div className="ft-logo">
            <Link to="/" className="ft-logo-link">
              <img
                src="./src/assets/images/symbol_blue.svg"
                alt="Logo Fast Task"
                className="ft-logo-img"
              />
              <span className="ft-logo-text">Fast Task</span>
            </Link>
          </div>
          <input
            type="checkbox"
            id="ft-menu-toggle"
            className="ft-menu-toggle"
          />
          <label htmlFor="ft-menu-toggle" className="ft-menu-label">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
        <ul className="ft-nav-menu">
          <li>
            <Link to="/">Início</Link>
          </li>
          <li>
            <Link to="/funcionalidades">Funcionalidades</Link>
          </li>
          <li>
            <Link to="/screenshots">Screenshots</Link>
          </li>
          <li>
            <Link to="/sobre">Sobre</Link>
          </li>
          <li>
            <Link to="http://localhost:8080/login" className="ft-btn-login">
              Entrar
            </Link>
          </li>
        </ul>
        
      </nav>
    </header>
  );
};

export default Header;
