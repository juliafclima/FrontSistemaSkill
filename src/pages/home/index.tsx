import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FiSave } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

import Ordenacao from "../../components/filtros/ordenacao";
import Header from "../../components/header";
import SearchInput from "../../components/SearchInput";
import {
  deleteUsuarioSkill,
  getUsuarioSkill,
  getUsuarioSkillDesc,
  getUsuarioSkillFiltro,
  putUsuarioSkill,
} from "../../server/UsuarioSkillService";
import ModalAddSkill from "./modal";
import {
  Botao,
  CardImage,
  Container,
  ContainerEdicao,
  ContainerFiltros,
  InputField,
  MainContainer,
  SaveButton,
} from "./style";
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
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(3);

  useEffect(() => {
    fetchData();
  }, [page, pageSize, sortOrder]);

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

  const token = localStorage.getItem("token") ?? "";

  const fetchUserSkills = async (searchTerm?: string) => {
    setIsLoading(true);

    try {
      let response;

      if (searchTerm) {
        response = await getUsuarioSkillFiltro(token, searchTerm);
      } else {
        await (sortOrder === "asc"
          ? getUsuarioSkill(token, page.toString(), pageSize.toString())
          : getUsuarioSkillDesc(token, page.toString(), pageSize.toString()));
      }

      if (!response || !Array.isArray(response.content)) {
        console.error("Resposta da API inválida:", response);
        return;
      }

      const userID = Number(localStorage.getItem("userId"));

      const userSkillsFiltered = response.content.filter(
        (skill: Skill) => skill.usuario.id === userID
      );

      setUserSkills(userSkillsFiltered);
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
      const token = localStorage.getItem("token") ?? "";

      setTokenExists(true);

      const response = await getUsuarioSkill(
        token,
        page.toString(),
        pageSize.toString()
      );

      if (!response || !Array.isArray(response.content)) {
        console.error("Resposta da API inválida:", response);
        return;
      }

      const userID = Number(localStorage.getItem("userId"));

      const userSkillsFiltered = response.content.filter(
        (skill: Skill) => skill.usuario.id === userID
      );

      setUserSkills(userSkillsFiltered);
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
        await deleteUsuarioSkill(id);

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

  const handleChangeOrderClick = async () => {
    try {
      const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
      setSortOrder(newSortOrder);

      let response;
      if (newSortOrder === "asc") {
        response = await getUsuarioSkill(
          token,
          (page + 1).toString(),
          pageSize.toString()
        );
      } else {
        response = await getUsuarioSkillDesc(
          token,
          (page + 1).toString(),
          pageSize.toString()
        );
      }

      console.log("API Response:", response);

      if (!response || !Array.isArray(response)) {
        console.error(
          `Resposta inválida ao alterar ordem para ${newSortOrder}:`,
          response
        );
        return;
      }

      const userID = Number(localStorage.getItem("userId"));

      const userSkillsFiltered = response.filter(
        (skill: Skill) => skill.usuario.id === userID
      );

      setUserSkills(userSkillsFiltered);
    } catch (error) {
      console.error("Erro ao alterar ordem:", error);
    }
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <>
      <Header handleLogout={handleLogout} />
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

        <ContainerFiltros>
          <SearchInput onSearch={fetchUserSkills} />

          <ContainerFiltros>
            <Ordenacao
              ascending={sortOrder === "asc"}
              onClick={handleChangeOrderClick}
            />
            <Botao onClick={openAddSkillModal}>Adicionar</Botao>
          </ContainerFiltros>
        </ContainerFiltros>

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
                    style={{
                      cursor: "pointer",
                      color: "black",
                      marginBottom: 5,
                    }}
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
                  <div
                    className="category"
                    onClick={() => handleEdit(skill.id)}
                  >
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

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <Botao onClick={prevPage} disabled={page === 0}>
            Página Anterior
          </Botao>
          <Botao onClick={nextPage}>Próxima Página</Botao>
        </div>

        <div
          style={{
            height: "50px",
          }}
        />
        <p
          style={{
            marginTop: "100px",
            margin: "auto",
            fontSize: "12px",
            color: "#d9d9d9",
          }}
        >
          © {new Date().getFullYear()} | Desenvolvido por Júlia Lima
        </p>
      </Container>
    </>
  );
}
