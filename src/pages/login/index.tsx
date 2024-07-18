import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Button from "../../components/forms/button";
import Input from "../../components/forms/input";
import PasswordInput from "../../components/forms/PasswordInput";
import LembrarCheckbox from "../../components/lembreDeMim";
import { postLogin } from "../../server/LoginService";
import { Container } from "./fundo";
import {
  ContainerInputs,
  ContainerNovaConta,
  FormContainer,
  StyledLink,
  Title,
} from "./style";

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
        localStorage.setItem("username", username);

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
        console.error("Erro ao realizar login: ", error);
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
        <ContainerInputs>
          <Input
            placeholder="Digite seu login"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <PasswordInput
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </ContainerInputs>

        <LembrarCheckbox
          lembrarUsuario={lembrarUsuario}
          onChange={() => setLembrarUsuario(!lembrarUsuario)}
        />

        <ContainerNovaConta>
          <Button title="Entrar" onClick={logar} />
          <StyledLink to="/cadastro">Não tem conta?</StyledLink>
        </ContainerNovaConta>
      </FormContainer>
    </Container>
  );
}
