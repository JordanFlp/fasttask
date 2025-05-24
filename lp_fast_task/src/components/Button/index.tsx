import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, to, href, onClick, className }) => {
  if (to) {
    return (
      <Link to={to} className={`ft-btn ${className}`} onClick={onClick}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={`ft-btn ${className}`} onClick={onClick} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button className={`ft-btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;