import React from "react";
import styled from "styled-components";

import { colors } from "../../../global/styles/theme";

interface ButtonProps {
  title: string | React.ReactNode;
  onClick: () => void;
}

const ButtonMy: React.FC<ButtonProps> = ({ title, onClick }) => {
  return <Botao onClick={onClick}>{title}</Botao>;
};

const Botao = styled.div`
  width: fit-content;
  min-width: 100px;
  height: 25px;
  padding: 8px;
  border-radius: 5px;
  border: 2.5px solid ${colors.light};
  box-shadow: 0px 0px 20px -20px;
  cursor: pointer;
  background-color: ${colors.primary};
  color: ${colors.dark};
  font-style: bolder;
  transition: all 0.2s ease-in-out 0ms;
  user-select: none;
  font-family: "Poppins", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${colors.light};
    box-shadow: 0px 0px 20px -18px;
    border: 2.5px solid ${colors.primary};
  }

  &:active {
    transform: scale(0.95);
  }
`;

export default ButtonMy;
