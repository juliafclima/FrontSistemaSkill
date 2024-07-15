import { useState } from "react";
import { Botao, SearchInputContainer } from "./style";

const SearchInput = ({
  onSearch,
}: {
  onSearch: (searchTerm: string) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    try {
      onSearch(searchTerm);

      setSearchTerm("");
    } catch (error) {
      console.error("Erro ao buscar habilidades do usuário:", error);
    }
  };

  return (
    <div>
      <SearchInputContainer
        type="text"
        placeholder="Pesquisar pelo nome da skill..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Botao onClick={handleSearch}>Buscar</Botao>
    </div>
  );
};

export default SearchInput;
