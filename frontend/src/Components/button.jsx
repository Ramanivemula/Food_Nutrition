import React from "react";

export const Button = ({ children, onClick, className, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-full font-semibold shadow-md transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed 
        ${className} 
        bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 text-white`}
    >
      {children}
    </button>
  );
};
