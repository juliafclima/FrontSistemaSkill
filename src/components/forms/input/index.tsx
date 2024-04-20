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
      style={inputStyle}
    />
  );
};

export default Input;

const inputStyle = {
  color: "#f1f1f1",
  marginBottom: "20px",
  padding: "8px",
  borderRadius: "4px",
  outline: "none",
  fontSize: "16px",
  width: "90%",
  backgroundColor: "#5d5d65af",
};
