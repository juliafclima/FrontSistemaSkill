import styled from "styled-components";

export const Container = styled.div`
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const CardContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 20px;
  margin: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 250px;

  @media (min-width: 768px) {
    width: 200px;
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
`;

export const CardTitle = styled.h1`
  font-size: 20px;
  margin: 10px 0;
  color: #333;
`;

export const CardDescription = styled.p`
  font-size: 14px;
  color: #555;
`;
