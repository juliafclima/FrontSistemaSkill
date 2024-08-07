import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "../../components/forms/button";
import Input from "../../components/forms/input";
import PasswordInput from "../../components/forms/PasswordInput";
import { postCadastro } from "../../server/LoginService";
import { Container } from "./fundo";
import {
  ContainerInputs,
  ContainerNovaConta,
  FormContainer,
  StyledLink,
  Title,
} from "./style";

export default function Cadastro() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const cadastrar = async () => {
    if (senha && confirmSenha && login) {
      if (senha !== confirmSenha) {
        toast.error("Senhas divergem");
        return;
      }

      const usuario = {
        login: login,
        senha: senha,
      };

      try {
        setLoading(true);
        await postCadastro(usuario);

        toast.success("Cadastrado com sucesso");

        setTimeout(() => {
          navigate("/");
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Erro ao cadastrar: ", error);
        toast.error("Usuario já cadastrado!");
        setLoading(false);
      }
    } else {
      toast.info("Preencha todos os campos");
    }
  };

  return (
    <Container>
      <FormContainer>
        <ToastContainer />
        <Title>CADASTRO</Title>
        <ContainerInputs>
          <Input
            placeholder="Digite seu login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />

          <PasswordInput
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <PasswordInput
            placeholder="Confirme sua senha"
            value={confirmSenha}
            onChange={(e) => setConfirmSenha(e.target.value)}
          />
        </ContainerInputs>

        <ContainerNovaConta>
          <StyledLink to="/">Já tem conta?</StyledLink>
          <Button
            onClick={cadastrar}
            title={loading ? "Carregando..." : "Inscrever-se"}
          />
        </ContainerNovaConta>
      </FormContainer>
    </Container>
  );
}
