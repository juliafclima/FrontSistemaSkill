import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Input from "../../components/forms/input";
import { postSkill } from "../../server/LoginService";

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

  const fetchUserSkills = async () => {
    const response = await axios.get(`http://localhost:8080/skill`);
    setUserSkills(response.data);
  };

  useEffect(() => {
    fetchUserSkills();
  }, []);

  const cadastrar = async () => {
    if (nome && descricao && url) {
      if (descricao.length >= 150) {
        toast.info("A descrição deve ter menos de 150 caracteres.");
        return;
      }

      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setRedirect(true);
          return;
        } else {
          const response = await postSkill(nome, descricao, url, token);

          console.log("resposta ", response.data);
          toast.success("Cadastrado com sucesso");
          fetchUserSkills();
          setTimeout(() => {
            onClose();
          }, 1000);
        }
      } catch (error) {
        console.log("deu errado", error);
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
            <h2 style={{ textAlign: "center", color: "#000" }}>
              Adicionar nova Skill
            </h2>

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

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button onClick={onClose}>Cancelar</Button>

              <Button onClick={cadastrar}>Salvar</Button>
            </div>
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
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 300px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  &:hover {
    background-color: #0056b3;
  }
`;
