import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Container, FormContainer, StyledLink, Title } from "./style";
import Button from "../../components/forms/button";
import Input from "../../components/forms/input";
import { postCadastro } from "../../server/LoginService";

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
        console.error("Erro ao cadastrar:", error);
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
        <Title>Sistema Skill</Title>
        <Title>Cadastro</Title>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Input
            placeholder="Digite seu login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <Input
            placeholder="Digite sua senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <Input
            placeholder="Confirme sua senha"
            type="password"
            value={confirmSenha}
            onChange={(e) => setConfirmSenha(e.target.value)}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "30px",
          }}
        >
          <StyledLink to="/">Já tem conta?</StyledLink>
          <Button
            onClick={cadastrar}
            title={loading ? "Carregando..." : "Inscrever-se"}
          />
        </div>
      </FormContainer>
    </Container>
  );
}
