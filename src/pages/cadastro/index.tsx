import { useState } from "react";
import Button from "../../components/forms/button";
import Input from "../../components/forms/input";
import { useNavigate } from "react-router-dom";
import { postCadastro } from "../../server/LoginService";
import { Container, FormContainer, StyledLink, Title } from "./style";

export default function Cadastro() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const navigate = useNavigate();

  const cadastrar = async () => {
    if (senha && confirmSenha && login) {
      if (senha !== confirmSenha) {
        alert("As senhas não coincidem");
        return;
      }

      const usuario = {
        login: login,
        senha: senha,
      };

      try {
        await postCadastro(usuario);

        alert("Cadastrado com sucesso");
        navigate("/");
      } catch (error) {
        console.error("Erro ao cadastrar:", error);
        alert("Erro ao cadastrar");
      }
    } else {
      alert("Preencha todos os campos");
    }
  };

  return (
    <Container>
      <FormContainer>
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
          <Button onClick={cadastrar} title="Inscrever-se" />
        </div>
      </FormContainer>
    </Container>
  );
}
