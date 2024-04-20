import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Arial, Helvetica, sans-serif;
`;

export const FormContainer = styled.div`
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 40px;
  text-align: center;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #007bff;
  margin-top: 10px;
  margin-left: 5px;
`;
