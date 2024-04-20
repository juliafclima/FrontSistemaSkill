import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

import { Editable } from "../../components/level/LevelEditavel";
import {
  CardContainer,
  CardDescription,
  CardImage,
  CardTitle,
  Container,
  MainContainer,
} from "./style";
import Button from "../../components/forms/button";

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
  const navigate = useNavigate();
  const [tokenExists, setTokenExists] = useState(false);

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
          console.log("resposta vindo da api", response.data);

          const userID = Number(localStorage.getItem("userId"));
          console.log("userID", userID);

          const userSkillsFiltered = response.data.filter(
            (skill: Skill) => skill.usuario.id === userID
          );

          setUserSkills(userSkillsFiltered);
          console.log("usuario filtrado", userSkillsFiltered);
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <h1 style={{ textAlign: "center" }}>Gerenciamento de Skills</h1>
      <div
        style={{
          display: "flex",
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
              <RiDeleteBin6Line />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CardImage src={skill.skill.url} alt="" />
            </div>
            <CardTitle>{skill.skill.nome}</CardTitle>
            <CardDescription>Level {skill.level}</CardDescription>
            <CardDescription>{skill.skill.descricao}</CardDescription>
          </CardContainer>
        ))}
      </MainContainer>
    </Container>
  );
}
