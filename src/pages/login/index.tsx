import { useState } from "react";
import Input from "../../components/forms/input";
import Button from "../../components/forms/button";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../server/LoginService";
import { Container, FormContainer, StyledLink, Title } from "./style";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const logar = async () => {
    if (password && username) {
      try {
        const response = await postLogin(username, password);

        console.log("response: ", response);
        console.log("response data: ", response.data);

        navigate("/home");
      } catch (error) {
        console.error("Erro ao realizar login:", error);
        alert("Erro ao logar");
      }
    } else {
      alert("Preencha todos os campos");
    }
  };

  return (
    <Container>
      <FormContainer>
        <Title>Sistema Skill</Title>
        <Title>Login</Title>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Input
            placeholder="Digite seu login"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            placeholder="Digite sua senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "30px",
          }}
        >
          <Button title="Entrar" onClick={logar} />
          <StyledLink to="/cadastro">Não tem conta?</StyledLink>
        </div>
      </FormContainer>
    </Container>
  );
}
