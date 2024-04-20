import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import styled from "styled-components";

type EditableProps = {
  text: string;
  placeholder: string;
  type: string;
  onSave: (text: string) => void;
};

export const Editable = ({
  text,
  placeholder,
  type,
  onSave,
}: EditableProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    onSave(currentText);
  };

  return (
    <div onClick={handleEdit}>
      {isEditing ? (
        <>
          <input
            type={type}
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
            onBlur={handleSave}
            autoFocus
          />
          <button>Salvar</button>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            cursor: "pointer",
          }}
        >
          <CardLevel>{currentText || placeholder}</CardLevel>
          <FaPencilAlt onClick={handleEdit} />
        </div>
      )}
    </div>
  );
};

const CardLevel = styled.p`
  font-size: 16px;
  color: #777;
`;
