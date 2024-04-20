import React from "react";

interface InputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChange,
  type = "text",
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        marginBottom: "8px",
        padding: "8px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        outline: "none",
        fontSize: "16px",
        width: "90%",
      }}
    />
  );
};

export default Input;
