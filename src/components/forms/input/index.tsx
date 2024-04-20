import React from "react";
import { colors } from "../../../global/styles/theme";

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
        color: "#f1f1f1",
        marginBottom: "20px",
        padding: "8px",
        borderRadius: "4px",
        outline: "none",
        fontSize: "16px",
        width: "90%",
        backgroundColor: "#29292e",
      }}
    />
  );
};

export default Input;
