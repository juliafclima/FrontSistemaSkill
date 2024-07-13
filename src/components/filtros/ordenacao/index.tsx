import React from "react";

interface Option {
  value: string;
  label: string;
}

interface OrdenacaoProps {
  options: Option[];
  sortBy: string | undefined;
  onSortChange: any;
}

const Ordenacao: React.FC<OrdenacaoProps> = ({
  options,
  sortBy,
  onSortChange,
}) => {
  return (
    <div>
      <select id="sort-select" value={sortBy} onChange={onSortChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Ordenacao;
