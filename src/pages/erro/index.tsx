import { Link } from "react-router-dom";
import styled from "styled-components";

import { colors } from "../../global/styles/theme";
import "./style.css";

export default function Erro() {
  return (
    <div className="containerErro">
      <ErroContainer>
        <ErrorTitle>Oops, algo deu errado!</ErrorTitle>
        <ErroTitulo>404 - Página não encontrada</ErroTitulo>

        <div className="hourglassBackground">
          <div className="hourglassContainer">
            <div className="hourglassCurves"></div>
            <div className="hourglassCapTop"></div>
            <div className="hourglassGlassTop"></div>
            <div className="hourglassSand"></div>
            <div className="hourglassSandStream"></div>
            <div className="hourglassCapBottom"></div>
            <div className="hourglassGlass"></div>
          </div>
        </div>

        <ErroAcoes>
          <ErroLinkHome to="/">Voltar para a página inicial</ErroLinkHome>
        </ErroAcoes>
      </ErroContainer>
    </div>
  );
}

const ErroContainer = styled.div`
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const ErroTitulo = styled.h1`
  font-size: 2rem;
  color: ${colors.danger};
`;

const ErrorTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${colors.light};
`;

const ErroAcoes = styled.div`
  margin-top: 20px;
`;

const ErroLinkHome = styled(Link)`
  text-decoration: none;
  color: ${colors.primary};
  margin-top: 10px;
  margin-left: 5px;
  transition: color 0.3s ease;

  &:hover {
    color: ${colors.primaryLight};
  }
`;
