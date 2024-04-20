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

type Skill = {
  id: string;
  url: string;
  nome: string;
  descricao: string;
};

export default function Home() {
  const [skills, setSkills] = useState([]);
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
      <h1>Gerenciamento de Skills</h1>
      <button onClick={handleLogout}>Logout</button>
      <MainContainer>
        <ul>
          {userSkills.map((skill) => (
            <li key={skill.id}>
              <CardContainer>
                <CardImage src={skill.url} alt="" />
                <CardTitle>{skill.nome}</CardTitle>
                <Editable
                  text="0/10"
                  placeholder="Nível: 0/10"
                  type="text"
                  onSave={(newLevel) => console.log("salvar")}
                />
                <CardDescription>{skill.descricao}</CardDescription>
              </CardContainer>
            </li>
          ))}
        </ul>
      </MainContainer>
    </Container>
  );
}
