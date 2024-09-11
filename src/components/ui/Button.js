import React from 'react';

export const Button = ({ children, variant = 'default', onClick, disabled }) => {
  const baseClasses = "px-4 py-2 rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantClasses = {
    default: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
    outline: "bg-white text-blue-500 border border-blue-500 hover:bg-blue-50 focus:ring-blue-500",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
