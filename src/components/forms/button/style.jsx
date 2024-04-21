import styled from "styled-components";
import { colors } from "../../../global/styles/theme";

export const Botao = styled.div`
  width: fit-content;
  min-width: 100px;
  height: 25px;
  padding: 8px;
  border-radius: 5px;
  border: 2.5px solid #e0e1e4;
  box-shadow: 0px 0px 20px -20px;
  cursor: pointer;
  background-color: #eba417;
  color: ${colors.dark};
  font-style: bolder;
  transition: all 0.2s ease-in-out 0ms;
  user-select: none;
  font-family: "Poppins", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f2f2f2;
    box-shadow: 0px 0px 20px -18px;
    border: 2.5px solid #eba417;
  }

  &:active {
    transform: scale(0.95);
  }
`;
