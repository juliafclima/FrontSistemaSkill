import styled from "styled-components";

import { colors } from "../../global/styles/theme";

export const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-image: linear-gradient(
    180.2deg,
    rgba(30, 33, 48, 1) 6.8%,
    rgba(74, 98, 110, 1) 131%
  );
  color: ${colors.light};
  margin: -8px;
`;

export const MainContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin-left: 30px;
  align-items: center;
  justify-content: space-evenly;

  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`;

export const CardContainer = styled.div`
  width: calc(50% - -200px);
  max-width: 150px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: ${colors.black};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 768px) {
    width: calc(50% - 10px);
  }

  @media screen and (max-width: 480px) {
    width: 100%;
    margin-right: 0;
  }
`;

export const CardImage = styled.img`
  width: 80%;
  height: 100px;
  margin-top: 10px;
  background-color: aliceblue;
  padding: 15px;
  border-radius: 10px;
`;

export const CardTitle = styled.h1`
  font-size: 20px;
`;

export const CardDescription = styled.p`
  font-size: 14px;
  color: #666;
  text-align: justify;
`;

export const CardLevel = styled.p`
  font-size: 16px;
  color: #777;
`;

export const InputField = styled.input`
  font-size: 16px;
  border: 1px solid black;
  outline: none;
  padding: 1px;
  border-radius: 19px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 50px;
`;

export const SaveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
`;

export const ContainerEdicao = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  cursor: pointer;
`;

interface ContainerProps {
  justifyContent?: string;
  alignItems?: string;
}

export const ContainerFiltros = styled.div<ContainerProps>`
  display: flex;
  justify-content: ${(props) => props.justifyContent || "space-between"};
  align-items: center;
  gap: 20px;
`;

export const Botao = styled.button`
  font-size: 1em;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 80px;
  font-size: 14px;
`;
