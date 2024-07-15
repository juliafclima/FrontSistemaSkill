import { GoSignOut } from "react-icons/go";
import styled from "styled-components";

import logo from "../../assets/logo.png";
import { colors } from "../../global/styles/theme";

interface HeaderProps {
  handleLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleLogout }) => {
  const usuarioLogado = localStorage.getItem("username");

  return (
    <HeaderContainer>
      <img width={50} src={logo} alt="Logo HTML" />
      <WelcomeText>Olá, {usuarioLogado}! :)</WelcomeText>

      <Botao onClick={handleLogout}>
        <GoSignOut />
      </Botao>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background-color: ${colors.light};
`;

const WelcomeText = styled.p`
  text-align: right;
  margin: 0;
  font-size: 18px;
  color: #333;
  font-family: Arial, Helvetica, sans-serif;
`;

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

export default Header;
