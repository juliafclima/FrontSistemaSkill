import { Link } from "react-router-dom";
import styled from "styled-components";

import { colors } from "../../global/styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Arial, Helvetica, sans-serif;
  color: ${colors.light};
  margin: -8px;
  padding-top: 20px;
  padding-bottom: 20px;
  background: linear-gradient(to bottom, #323232 0%, #3f3f3f 40%, #1c1c1c 150%),
    linear-gradient(
      to top,
      rgba(255, 255, 255, 0.4) 0%,
      rgba(0, 0, 0, 0.25) 200%
    );
  background-blend-mode: multiply;
`;

export const FormContainer = styled.div`
  width: 300px;
  padding: 20px;
  border-radius: 8px;
  background-color: ${colors.white};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: ${colors.dark};
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 40px;
  text-align: center;
  text-transform: uppercase;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${colors.primary};
  margin-top: 10px;
  margin-left: 5px;
`;
