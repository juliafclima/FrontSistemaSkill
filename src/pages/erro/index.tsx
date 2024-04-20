import { Link } from "react-router-dom";
import styled from "styled-components";

const ErroContainer = styled.div`
  text-align: center;
  padding: 20px;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
`;

const ErroTitulo = styled.h1`
  font-size: 2rem;
  color: #e74c3c;
`;

const ErroMensagem = styled.p`
  font-size: 1.2rem;
  color: #333;
`;

const ErroAcoes = styled.div`
  margin-top: 20px;
`;

const ErroLinkHome = styled(Link)`
  text-decoration: none;
  color: #eba417;
  margin-top: 10px;
  margin-left: 5px;
`;

export default function Erro() {
  return (
    <ErroContainer>
      <ErroTitulo>404 - Página não encontrada</ErroTitulo>
      <ErroMensagem>
        Desculpe, a página que você está procurando não existe.
      </ErroMensagem>
      <ErroAcoes>
        <ErroLinkHome to="/">Voltar para a página inicial</ErroLinkHome>
      </ErroAcoes>
    </ErroContainer>
  );
}
