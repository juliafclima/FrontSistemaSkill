import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPencilAlt, FaSave } from "react-icons/fa";

import {
  CardContainer,
  CardDescription,
  CardImage,
  CardTitle,
  Container,
  MainContainer,
  CardLevel,
  InputField,
  SaveButton,
  ContainerEdicao,
} from "./style";
import Button from "../../components/forms/button";
import { putUsuarioSkill } from "../../server/LoginService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Skill = {
  id: number;
  level: string;
  usuario: {
    id: number;
    login: string;
    senha: string;
    situacao: string;
  };
  skill: {
    id: number;
    nome: string;
    descricao: string;
    url: string;
  };
};

export default function Home() {
  const [userSkills, setUserSkills] = useState<Skill[]>([]);
  const [tokenExists, setTokenExists] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [novoNivel, setNovoNivel] = useState("0/10");
  const [editingCardId, setEditingCardId] = useState<number | null>(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          return <Navigate to="/" />;
        } else {
          setTokenExists(true);

          const response = await axios.get(
            `http://localhost:8080/usuario-skill`,
            {
              headers: {
                Authorization: token,
              },
            }
          );

          const userID = Number(localStorage.getItem("userId"));

          const userSkillsFiltered = response.data.filter(
            (skill: Skill) => skill.usuario.id === userID
          );

          setUserSkills(userSkillsFiltered);
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (id: number) => {
    setNovoNivel(userSkills.find((skill) => skill.id === id)?.level || "0/10");
    setEditingCardId(id);
  };

  const handleSave = async (id: number) => {
    try {
      if (novoNivel.trim() === "") {
        toast.error("Campo de atualização de nível vazio.");
        return;
      }

      const novoNivelNumber = parseFloat(novoNivel);
      if (
        isNaN(novoNivelNumber) ||
        novoNivelNumber < 0 ||
        novoNivelNumber > 10
      ) {
        toast.error("O nível deve estar entre 0 e 10.");
        return;
      }

      await putUsuarioSkill(id, novoNivel);

      const updatedSkills = userSkills.map((skill) => {
        if (skill.id === id) {
          return { ...skill, level: novoNivel };
        }
        return skill;
      });
      setUserSkills(updatedSkills);

      setEditingCardId(null);
    } catch (error) {
      console.error("Erro ao salvar edição:", error);
    }
  };

  return (
    <Container>
      <ToastContainer />
      <h1 style={{ textAlign: "center" }}>Gerenciamento de Skills</h1>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        <Button title={<IoIosLogOut />} onClick={handleLogout} />
      </div>

      <MainContainer>
        {userSkills.map((skill) => (
          <CardContainer key={skill.id}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <RiDeleteBin6Line size={18} />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CardImage src={skill.skill.url} alt="" />
            </div>
            <CardTitle>{skill.skill.nome}</CardTitle>

            {editingCardId === skill.id ? (
              <ContainerEdicao>
                <InputField
                  type="number"
                  value={novoNivel}
                  onChange={(e) => setNovoNivel(e.target.value)}
                  placeholder="Novo nível"
                />
                <SaveButton onClick={() => handleSave(skill.id)}>
                  <FaSave color="white" size={18} />
                </SaveButton>
              </ContainerEdicao>
            ) : (
              <ContainerEdicao onClick={() => handleEdit(skill.id)}>
                <CardLevel>Nível {skill.level}/10</CardLevel>
                <FaPencilAlt size={16} />
              </ContainerEdicao>
            )}

            <CardDescription>{skill.skill.descricao}</CardDescription>
          </CardContainer>
        ))}
      </MainContainer>
    </Container>
  );
}
