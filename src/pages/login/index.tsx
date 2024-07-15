import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Button from "../../components/forms/button";
import Input from "../../components/forms/input";
import LembrarCheckbox from "../../components/lembreDeMim";
import { postLogin } from "../../server/LoginService";
import { Container } from "./fundo";
import { FormContainer, StyledLink, Title } from "./style";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [lembrarUsuario, setLembrarUsuario] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (storedUsername && storedPassword) {
      setUsername(storedUsername);
      setPassword(storedPassword);
      setLembrarUsuario(true);
    }
  }, []);

  const navigate = useNavigate();

  const logar = async () => {
    if (password && username) {
      try {
        const response = await postLogin(username, password);

        const token = response.data.token;
        localStorage.setItem("token", token);

        const userId = response.data.userId;

        if (userId) {
          localStorage.setItem("userId", userId);
        }

        if (lembrarUsuario) {
          localStorage.setItem("username", username);
          localStorage.setItem("password", password);
        } else {
          localStorage.removeItem("username");
          localStorage.removeItem("password");
        }

        navigate("/home");
      } catch (error) {
        console.error("Erro ao realizar login:", error);
        toast.error("Senha e/ou login errados!");
      }
    } else {
      toast.info("Preencha todos os campos");
    }
  };

  return (
    <Container>
      <ToastContainer />
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

        <LembrarCheckbox
          lembrarUsuario={lembrarUsuario}
          onChange={() => setLembrarUsuario(!lembrarUsuario)}
        />

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
