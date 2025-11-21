import React from 'react';

interface ChipProps {
  label: string;
  variant?: 'default' | 'outline' | 'glass' | 'glow';
  className?: string;
  onClick?: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, variant = 'default', className = '', onClick }) => {
  const baseStyles = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all duration-300';
  
  const variants = {
    default: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
    glass: 'glass hover:bg-white/10 text-white border-white/10',
    glow: 'bg-primary/20 text-primary border border-primary/50 shadow-glow hover:bg-primary/30',
  };

  return (
    <span 
      className={`${baseStyles} ${variants[variant]} ${onClick ? 'cursor-pointer active:scale-95' : ''} ${className}`}
      onClick={onClick}
    >
      {label}
    </span>
  );
};

export default Chip;
