import styled from "styled-components";
import { Link } from "react-router-dom";

import { colors } from "../../global/styles/theme";

export const FormContainer = styled.div`
  width: 300px;
  padding: 20px;
  border-radius: 8px;
  background-color: ${colors.white};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: ${colors.dark};
  -webkit-box-shadow: 12px 7px 26px -17px rgba(0, 0, 0, 0.52);
  -moz-box-shadow: 12px 7px 26px -17px rgba(0, 0, 0, 0.52);
  box-shadow: 12px 7px 26px -17px rgba(0, 0, 0, 0.52);
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 40px;
  text-align: center;
  text-transform: uppercase;
  text-shadow: 4px 3px 0px #7a7a7a, 40px -11px 2px rgba(206, 89, 55, 0);
  color: #ffffff;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${colors.primary};
  margin-top: 10px;
  margin-left: 5px;
`;
