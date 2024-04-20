import { useEffect, useState } from "react";
import { Editable } from "../../components/level/LevelEditavel";
import {
  CardContainer,
  CardDescription,
  CardImage,
  CardTitle,
  Container,
  MainContainer,
} from "./style";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../components/forms/button";
import { IoIosLogOut } from "react-icons/io";

type Skill = {
  id: string;
  url: string;
  nome: string;
  descricao: string;
};

export default function Home() {
  const [userSkills, setUserSkills] = useState<Skill[]>([]);
  const navigate = useNavigate();
  const [tokenExists, setTokenExists] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
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

          const response = await axios.get(`http://localhost:8080/skill`, {
            headers: {
              Authorization: token,
            },
          });

          setUserSkills(response.data);
          console.log("data", response.data);
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
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CardImage src={skill.url} alt="" />
            </div>
            <CardTitle>{skill.nome}</CardTitle>
            <Editable
              text="Nível 0/10"
              placeholder="Nível: 0/10"
              type="text"
              onSave={() => console.log("salvar")}
            />
            <CardDescription>{skill.descricao}</CardDescription>
          </CardContainer>
        ))}
      </MainContainer>
    </Container>
  );
}
