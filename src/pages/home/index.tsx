import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FiSave } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

import {
  CardImage,
  Container,
  MainContainer,
  InputField,
  SaveButton,
  ContainerEdicao,
} from "./style";
import Button from "../../components/forms/button";
import { putUsuarioSkill } from "../../server/LoginService";
import ModalAddSkill from "./modal";
import "./style.css";

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
  const [novoNivel, setNovoNivel] = useState("");
  const [editingCardId, setEditingCardId] = useState<number | null>(null);
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();

  const openAddSkillModal = () => {
    setShowAddSkillModal(true);
  };

  const closeAddSkillModal = () => {
    setShowAddSkillModal(false);
  };

  const handleSaveNewSkill = () => {
    fetchUserSkills();
  };

  const fetchUserSkills = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return <Navigate to="/" />;
      } else {
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

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

  const handleDelete = async (id: number) => {
    try {
      const result = await Swal.fire({
        title: "Deseja realmente apagar este card?",
        text: "Essa ação não pode ser revertida!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, apagar!",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:8080/usuario-skill/${id}`);

        const updatedSkills = userSkills.filter((skill) => skill.id !== id);
        setUserSkills(updatedSkills);

        if (editingCardId === id) {
          setEditingCardId(null);
        }

        toast.success("Card removido com sucesso!");
      }
    } catch (error) {
      toast.error("Algo aconteceu! Não foi possível apagar.");
    }
  };

  return (
    <Container>
      <ToastContainer />
      <h1
        style={{
          textAlign: "center",
          color: "#d9d9d9",
          textShadow:
            "-1px -1px 1px rgba(255,255,255,.1), 1px 1px 1px rgba(0,0,0,.5)",
          fontSize: "31px",
          letterSpacing: "3px",
          wordSpacing: "3.2px",
        }}
      >
        Gerenciamento de Skills
      </h1>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          gap: 20,
        }}
      >
        <Button title="Adicionar" onClick={openAddSkillModal} />
        <Button title="Sair" onClick={handleLogout} />
      </div>

      <ModalAddSkill
        isOpen={showAddSkillModal}
        onClose={closeAddSkillModal}
        onSave={handleSaveNewSkill}
      />

      {userSkills.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Deseja cadastrar alguma skill?
        </p>
      ) : (
        <MainContainer>
          {userSkills.map((skill) => (
            <div className="card" key={skill.id}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <RiDeleteBin6Line
                  size={18}
                  onClick={() => handleDelete(skill.id)}
                  style={{ cursor: "pointer", color: "black", marginBottom: 5 }}
                />
              </div>
              <div className="card-image">
                <CardImage src={skill.skill.url} alt="" />
              </div>

              {editingCardId === skill.id ? (
                <ContainerEdicao>
                  <InputField
                    type="number"
                    value={novoNivel}
                    onChange={(e) => setNovoNivel(e.target.value)}
                    placeholder="Nº"
                  />
                  <SaveButton onClick={() => handleSave(skill.id)}>
                    <FiSave color="black" size={18} />
                  </SaveButton>
                </ContainerEdicao>
              ) : (
                <div className="category" onClick={() => handleEdit(skill.id)}>
                  <span className="name">{skill.level}</span>
                  /10 <FaPencilAlt size={16} />
                </div>
              )}

              <div className="heading">
                {skill.skill.nome}
                <div className="author">{skill.skill.descricao}</div>
              </div>
            </div>
          ))}
        </MainContainer>
      )}
    </Container>
  );
}
