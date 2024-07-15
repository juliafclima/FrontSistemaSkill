import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

import { postSkill } from "../../../server/SkillService";
import Input from "../../forms/input";
import { colors } from "../../../global/styles/theme";

interface ModalAddSkillProps {
  isOpen: boolean;
  onClose: () => void;
  onSkillSaved: () => void;
  onSkillAdded?: () => void;
}

type Skill = {
  id: number;
  nome: string;
  descricao: string;
  url: string;
};

const ModalNovaSkill: React.FC<ModalAddSkillProps> = ({ isOpen, onClose }) => {
  const [userSkills, setUserSkills] = useState<Skill[]>([]);
  const [nome, setNome] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>(false);

  const fetchUserSkills = async (token: string) => {
    const response = await axios.get(`http://localhost:8080/skill`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUserSkills(response.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchUserSkills(token);
    } else {
      console.error("Token não encontrado no localStorage.");
    }
  }, []);

  const cadastrar = async () => {
    if (nome && descricao && url) {
      if (descricao.length >= 150) {
        toast.info("A descrição deve ter menos de 150 caracteres.");
        return;
      }

      const token = localStorage.getItem("token");

      try {
        if (!token) {
          setRedirect(true);
          return;
        } else {
          await postSkill(nome, descricao, url, token);

          toast.success("Cadastrado com sucesso");

          fetchUserSkills(token);

          setTimeout(() => {
            onClose();
          }, 1000);
        }
      } catch (error) {
        console.error("deu errado", error);
      }
    } else {
      toast.info("Preencha todos os campos");
    }
  };

  return (
    <>
      {isOpen && (
        <ModalBackground onClick={onClose}>
          <ToastContainer />
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <Titulo>Adicionar nova Skill</Titulo>

            <Input
              placeholder="Nome"
              type="text"
              onChange={(e) => setNome(e.target.value)}
              labelColor="#000"
            />
            <Input
              placeholder="descrição"
              type="text"
              onChange={(e) => setDescricao(e.target.value)}
              labelColor="#000"
            />
            <Input
              placeholder="URL imagem"
              type="text"
              onChange={(e) => setUrl(e.target.value)}
              labelColor="#000"
            />

            <ContainerButton>
              <Button onClick={onClose}>Cancelar</Button>

              <Button onClick={cadastrar}>Salvar</Button>
            </ContainerButton>
          </ModalContent>
        </ModalBackground>
      )}
    </>
  );
};

export default ModalNovaSkill;

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
