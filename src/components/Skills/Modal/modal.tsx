import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

import { colors } from "../../../global/styles/theme";
import { getSkill } from "../../../server/SkillService";
import ModalNovaSkill from "../NovaSkill/novaSkill";

interface ModalAddSkillProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

type Skill = {
  id: number;
  nome: string;
  descricao: string;
  url: string;
};

const ModalAddSkill: React.FC<ModalAddSkillProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [userSkills, setUserSkills] = useState<Skill[]>([]);
  const [selectedSkillId, setSelectedSkillId] = useState<number | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);
  const [isModalNovaOpen, setIsModalNovaOpen] = useState<boolean>(false);

  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(30);

  const fetchUserSkills = async (
    token: string | null,
    page: number,
    size: number
  ) => {
    try {
      if (!token) {
        return <Navigate to="/" />;
      } else {
        const response = await getSkill(token, page, size);
        const maxPageSize = response.data.totalElements;

        setSize(maxPageSize);
        setUserSkills(response.data.content);
      }
    } catch (error) {
      console.error("Erro ao buscar habilidades do usuário: ", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetchUserSkills(token, page, size);
  }, [page, size]);

  const opcoesSkills = () => {
    return userSkills.map((skill) => (
      <option key={skill.id} value={skill.id}>
        {skill.nome}
      </option>
    ));
  };

  const handleSkillChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(event.target.value);
    setSelectedSkillId(selectedId);
  };

  const handleSubmit = async () => {
    if (selectedSkillId !== null) {
      if (selectedSkills.includes(selectedSkillId)) {
        toast.error("Você já adicionou esta skill.");
        return;
      }

      const userID = Number(localStorage.getItem("userId"));
      const token = localStorage.getItem("token");
      try {
        await axios.post(
          `http://localhost:8080/usuario-skill`,
          {
            level: "",
            usuario: { id: userID },
            skill: { id: selectedSkillId },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        onSave();
        fetchUserSkills(token, page, size);

        setSelectedSkills([...selectedSkills, selectedSkillId]);
      } catch (error) {
        console.error("Erro: ", error);
      }
    }
    onClose();
  };

  const handleNovaClick = () => {
    setIsModalNovaOpen(true);
    onClose();
  };

  const handleNovaSkillSaved = () => {
    setIsModalNovaOpen(false);
  };

  return (
    <>
      {isOpen && (
        <ModalBackground onClick={onClose}>
          <ToastContainer />
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <Titulo>Adicionar Skill</Titulo>

            <Select onChange={handleSkillChange} value={selectedSkillId || ""}>
              {opcoesSkills()}
            </Select>

            <ContainerButton>
              <Button onClick={onClose}>Cancelar</Button>
              <Button onClick={handleNovaClick}>Nova</Button>
              <Button onClick={handleSubmit}>Salvar</Button>
            </ContainerButton>
          </ModalContent>
        </ModalBackground>
      )}

      {isModalNovaOpen && (
        <ModalNovaSkill
          key={userSkills.length}
          isOpen={isModalNovaOpen}
          onClose={() => setIsModalNovaOpen(false)}
          onSkillSaved={handleNovaSkillSaved}
        />
      )}
    </>
  );
};

export default ModalAddSkill;

const ModalBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: ${colors.light};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 300px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid ${colors.gray[500]};
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: ${colors.secondaryDark};
  color: ${colors.light};
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  &:hover {
    background-color: ${colors.secondary};
  }
`;

const Titulo = styled.h2`
  text-align: center;
  color: ${colors.dark};
`;

const ContainerButton = styled.div`
  display: flex;
  justify-content: space-between;
`;
