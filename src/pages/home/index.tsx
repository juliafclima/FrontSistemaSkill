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
import { getSkill } from "../../server/SkillService";
import { useNavigate } from "react-router-dom";

type Skill = {
  id: string;
  url: string;
  nome: string;
  descricao: string;
};

export default function Home() {
  const [userSkills, setUserSkills] = useState<Skill[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserSkills = async () => {
      try {
        const response = await getSkill();
        const data = response.data;
        setUserSkills(data);
      } catch (error) {
        console.error("Erro ao buscar as skills do usuário:", error);
      }
    };

    fetchUserSkills();
  }, []);

  return (
    <Container>
      <h1>Gerenciamento de Skills</h1>
      <button onClick={() => navigate("/")}>Logout</button>
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
