import React from "react";
import "./index.css";

interface InputProps {
  placeholder: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  labelColor?: string;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChange,
  type,
  labelColor,
}) => {
  const labelStyle = {
    color: labelColor,
  };

  return (
    <div className="form__group field">
      <input
        className="form__field"
        type={type}
        value={value}
        onChange={onChange} style={labelStyle}
      />
      <label htmlFor="name" className="form__label" >
        {placeholder}
      </label>
    </div>
  );
};

export default Input;
