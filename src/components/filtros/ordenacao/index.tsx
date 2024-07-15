import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import styled from "styled-components";
import { colors } from "../../../global/styles/theme";

interface SortButtonProps {
  ascending: boolean;
  onClick: () => void;
}

const Ordenacao: React.FC<SortButtonProps> = ({ ascending, onClick }) => {
  return (
    <Button onClick={onClick}>
      Ordenar nome {ascending ? <IoIosArrowUp /> : <IoIosArrowDown />}
    </Button>
  );
};

const Button = styled.button`
  font-size: 1em;
  padding: 0.5em;
  border: 1px solid ${colors.gray[500]};
  border-radius: 5px;
  width: 80px;
  font-size: 14px;
`;

export default Ordenacao;
