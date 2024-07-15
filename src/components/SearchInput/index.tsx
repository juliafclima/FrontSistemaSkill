import { useState } from "react";
import { SearchInputContainer } from "./style";

const SearchInput = ({
  onSearch,
}: {
  onSearch: (searchTerm: string) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    try {
      onSearch(searchTerm);
    } catch (error) {
      console.error("Erro ao buscar habilidades do usuário:", error);
    }
  };

  return (
    <div>
      <SearchInputContainer
        type="text"
        placeholder="Pesquisar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default SearchInput;
