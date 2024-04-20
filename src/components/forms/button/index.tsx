import React from "react";

interface ButtonProps {
  title: string | React.ReactNode;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 16px",
        borderRadius: "4px",
        border: "none",
        background: "#eba417",
        color: "#f1f1f1",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
      }}
    >
      {title}
    </button>
  );
};

export default Button;
