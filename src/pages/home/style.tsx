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

export const CardImage = styled.img`
  width: 80%;
  height: 100px;
  margin-top: 10px;
  background-color: aliceblue;
  padding: 15px;
  border-radius: 10px;
`;

export const InputField = styled.input`
  font-size: 16px;
  border: 1px solid ${colors.dark};
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
  border: 1px solid ${colors.gray[500]};
  border-radius: 5px;
  width: 80px;
  font-size: 14px;
`;

export const Titulo = styled.h1`
  text-align: center;
  color: ${colors.light};
  text-shadow: -1px -1px 1px rgba(255, 255, 255, 0.1),
    1px 1px 1px rgba(0, 0, 0, 0.5);
  font-size: 31px;
  letter-spacing: 3px;
  word-spacing: 3.2px;
`;

export const Subtitulo = styled.p`
  text-align: center;
  margin-top: 20px;
`;

export const ContainerLixeira = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ContainerPaginacao = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

export const FooterEspaco = styled.div`
  height: 50px;
`;

export const FooterParagrafo = styled.p`
  margin-top: 100px;
  margin: auto;
  font-size: 12px;
  color: ${colors.light};
`;
