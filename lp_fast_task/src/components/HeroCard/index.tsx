import React from 'react';
import './style.css';

interface HeroCardProps {
  imageSrc: string;
  altText?: string;
  children?: React.ReactNode;
  className?: string;
}

const HeroCard: React.FC<HeroCardProps> = ({ imageSrc, altText, children, className }) => {
  return (
    <div className={`ft-hero-card ${className}`}>
      <img src={imageSrc} alt={altText} className="ft-hero-card-img" />
      {children && <div className="ft-hero-card-content">{children}</div>}
    </div>
  );
};

export default HeroCard;