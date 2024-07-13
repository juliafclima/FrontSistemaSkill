import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Button } from "./style";

interface SortButtonProps {
  ascending: boolean;
  onClick: () => void;
}

const Ordenacao: React.FC<SortButtonProps> = ({ ascending, onClick }) => {
  return (
    <Button onClick={onClick}>
      Ordenar {ascending ? <IoIosArrowUp /> : <IoIosArrowDown />}
    </Button>
  );
};

export default Ordenacao;
