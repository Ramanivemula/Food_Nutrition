// src/components/ui/card.jsx
import React from "react";

export const Card = ({ children, className }) => (
  <div className={`rounded-xl shadow-lg bg-white p-4 ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children }) => (
  <div className="p-4">{children}</div>
  );
