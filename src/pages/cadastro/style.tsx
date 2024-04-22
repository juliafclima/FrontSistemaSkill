import { Link } from "react-router-dom";
import styled from "styled-components";

import { colors } from "../../global/styles/theme";

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
