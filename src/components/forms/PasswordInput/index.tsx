import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "./index.css";

interface PasswordInputProps {
  placeholder: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  labelColor?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  placeholder,
  value,
  onChange,
  labelColor,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const Icon = showPassword ? FaRegEye : FaRegEyeSlash;

  const labelStyle = {
    color: labelColor,
  };

  return (
    <div className="form__group field">
      <label className="form__label" style={labelStyle}>
        {placeholder}
      </label>
      <div className="password-input-container">
        <input
          className="form__field"
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={labelStyle}
        />
        <div className="password-icon" onClick={togglePasswordVisibility}>
          <Icon />
        </div>
      </div>
    </div>
  );
};

export default PasswordInput;
