import { useState } from "react";
import styled from "styled-components";
import { colors } from "../../global/styles/theme";

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
    <SearchInputContainer>
      <SearchInputStyle
        type="text"
        placeholder="Pesquisar pelo nome da skill..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Botao onClick={handleSearch}>Buscar</Botao>
    </SearchInputContainer>
  );
};

const SearchInputContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const SearchInputStyle = styled.input`
  padding: 8px;
  border: 1px solid ${colors.gray[500]};
  border-radius: 4px;
  width: 200px;
`;

const Botao = styled.button`
  font-size: 1em;
  padding: 0.5em;
  border: 1px solid ${colors.gray[500]};
  border-radius: 5px;
  width: 80px;
  font-size: 14px;
`;

export default SearchInput;
