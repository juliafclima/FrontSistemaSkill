import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import styled from "styled-components";

import { toast } from "react-toastify";
import backgroundImg from "../../assets/anotacoes_fundo.png";
import { colors } from "../../global/styles/theme";
import {
  deleteAnotacao,
  getAnotacao,
  postAnotacao,
} from "../../server/AnotacoesService";

interface Annotation {
  id: number;
  descricao: string;
  dataCriacao: Date;
}

export default function Anotacoes() {
  const [anotacoes, setAnotacoes] = useState<Annotation[]>([]);
  const [descricao, setDescricao] = useState("");
  const [dataCriacao, setDataCriacao] = useState(new Date());

  useEffect(() => {
    const fetchAnotacoes = async () => {
      try {
        const token = localStorage.getItem("token") ?? "";
        const user = localStorage.getItem("userId");

        const response = await getAnotacao(user, user, token);
        setAnotacoes(response.data);
      } catch (error) {
        console.error("Erro ao carregar anotações", error);
      }
    };

    fetchAnotacoes();
  }, []);

  const formatarData = (data: Date): string => {
    return format(data, "'criada em' dd 'de' MMM 'às' HH'h'mm", {
      locale: ptBR,
    });
  };

  const gerarAnotacoes = async () => {
    try {
      const token = localStorage.getItem("token") ?? "";
      const user = localStorage.getItem("userId");

      const response = await postAnotacao(user, descricao, dataCriacao, token);

      setAnotacoes([...anotacoes, response.data]);
      setDescricao("");
    } catch (error) {
      console.error("Erro ao gerar anotações", error);
    }
  };

  const apagarAnotacoes = async (idUsuario: any, idAnotacao: any) => {
    console.log("Tentando apagar anotação:", idAnotacao);

    try {
      await deleteAnotacao(idUsuario, idAnotacao);

      const updatedAnotacoes = anotacoes.filter(
        (anotacao) => anotacao.id !== idAnotacao
      );

      toast.success("Anotação apagada!");

      setAnotacoes(updatedAnotacoes);
    } catch (error) {
      toast.error("Algo aconteceu! Não foi possível apagar.");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    gerarAnotacoes();
  };

  const userId = localStorage.getItem("userId");

  return (
    <PageContainer>
      <Titulo>anotacões</Titulo>
      <Formulario onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Criar uma nota..."
        />
        <button type="submit">Enviar</button>
      </Formulario>

      {anotacoes.map((anotacao, index) => (
        <Container key={index}>
          <div>
            <p>{anotacao.descricao}</p>
            <span>{formatarData(anotacao.dataCriacao)}</span>
          </div>

          <div>
            <RiDeleteBin6Line
              style={{ cursor: "pointer" }}
              size={18}
              onClick={() => {
                console.log("ID da anotação:", anotacao.id);
              }}
            />
          </div>
        </Container>
      ))}
    </PageContainer>
  );
}

const Titulo = styled.h1`
  color: ${colors.dark};
`;

const PageContainer = styled.div`
  min-height: 100vh;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: aliceblue;
  border-radius: 10%;
`;

const Container = styled.div`
  background-image: url(${backgroundImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #333;
  max-width: 300px;
  width: 100%;
  text-align: left;
  display: flex;
  justify-content: space-between;

  div {
    p {
      margin-bottom: 5px;
    }

    span {
      color: #8d8282e0;
      font-style: italic;
    }
  }
`;

const Formulario = styled.form`
  margin-bottom: 20px;

  input {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 10px;
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;
