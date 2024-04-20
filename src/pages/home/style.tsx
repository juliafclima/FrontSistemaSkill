import styled from "styled-components";
import { colors } from "../../global/styles/theme";

export const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.dark};
  color: ${colors.light};
  margin: -8px;
`;

export const MainContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`;

export const CardContainer = styled.div`
  width: calc(50% - 20px);
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
  padding: 3px;
  border-radius: 19px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100px;
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
