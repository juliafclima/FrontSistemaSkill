import React, { useState } from "react";
import { DivContainer, Select } from "./style";

interface Props {
  items: Item[];
}

interface Item {
  nome: string;
  nivel: string;
}

const FiltragemOpcoes: React.FC<Props> = ({ items }) => {
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroNivel, setFiltroNivel] = useState("");

  const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiltroNome(event.target.value);
  };

  const handleNivelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFiltroNivel(event.target.value);
  };

  const filteredItems = items.filter((item) => {
    const nomeMatch = item.nome
      .toLowerCase()
      .includes(filtroNome.toLowerCase());
    const nivelMatch = filtroNivel === "" || item.nivel === filtroNivel;
    return nomeMatch && nivelMatch;
  });

  return (
    <DivContainer>
      <Select value={filtroNivel} onChange={handleNivelChange}>
        <option value="">Filtrar</option>
        <option value="Nome">Nome</option>
        <option value="Nivel">Nível</option>
      </Select>
    </DivContainer>
  );
};

export default FiltragemOpcoes;
