import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', fullWidth = false, className = '' }) => {
  const baseClasses = "py-3 px-6 rounded-lg font-medium transition-all duration-300 focus:outline-none";
  const variantClasses = {
    primary: "bg-[var(--color-primary)] text-white hover:opacity-90 active:opacity-80 shadow-md",
    secondary: "bg-white text-[var(--color-text-main)] border border-[var(--color-accent-1)] hover:bg-gray-50",
    google: "bg-white text-[var(--color-text-main)] border border-gray-300 hover:bg-gray-50 shadow-sm",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;