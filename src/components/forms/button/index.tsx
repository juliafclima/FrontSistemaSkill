import React from "react";
import { Botao } from "./style";

interface ButtonProps {
  title: string | React.ReactNode;
  onClick: () => void;
}

const ButtonMy: React.FC<ButtonProps> = ({ title, onClick }) => {
  return <Botao onClick={onClick}>{title}</Botao>;
};

export default ButtonMy;
