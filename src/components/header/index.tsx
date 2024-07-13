import { GoSignOut } from "react-icons/go";
import styled from "styled-components";
import { Botao } from "../forms/button/style";

interface HeaderProps {
  handleLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleLogout }) => {
  const usuarioLogado = localStorage.getItem("username");

  return (
    <HeaderContainer style={{ display: "flex", justifyContent: "flex-end" }}>
      <WelcomeText style={{ textAlign: "right" }}>
        Olá, {usuarioLogado}! :)
      </WelcomeText>

      <Botao onClick={handleLogout}>
        <GoSignOut />
      </Botao>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background-color: #f0f0f0;
`;

const WelcomeText = styled.p`
  text-align: right;
  margin: 0;
  font-size: 18px;
  color: #333;
  font-family: Arial, Helvetica, sans-serif;
`;
