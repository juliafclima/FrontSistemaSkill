import styled from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  flex-direction: column;
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
`;

export const CardTitle = styled.h1`
  font-size: 20px;
`;

export const CardDescription = styled.p`
  font-size: 14px;
  color: #666;
  text-align: justify;
`;
