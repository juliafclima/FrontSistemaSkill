import React, { useState } from "react";

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
    <div>
      <select value={filtroNivel} onChange={handleNivelChange}>
        <option value="">Filtrar por...</option>
        <option value="Nome">Nome</option>
        <option value="Nivel">Nível</option>
      </select>
    </div>
  );
};

export default FiltragemOpcoes;
