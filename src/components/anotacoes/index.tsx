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

      setAnotacoes([response.data, ...anotacoes]);
      setDescricao("");
    } catch (error) {
      console.error("Erro ao gerar anotações", error);
    }
  };

  const apagarAnotacoes = async (idUsuario: any, idAnotacao: any) => {
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
    <AnotacaoContainer>
      <Titulo></Titulo>
      <Formulario onSubmit={handleSubmit}>
        <div className="wave-group">
          <input
            type="text"
            className="input"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
          <span className="bar"></span>
          <label className="label">
            <span className="label-char">N</span>
            <span className="label-char">o</span>
            <span className="label-char">t</span>
            <span className="label-char">a</span>
          </label>
        </div>

        <button type="submit">Enviar</button>
      </Formulario>

      <PageContainer>
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
                onClick={() => apagarAnotacoes(userId, anotacao.id)}
              />
            </div>
          </Container>
        ))}
      </PageContainer>
    </AnotacaoContainer>
  );
}

const Titulo = styled.h1`
  color: ${colors.dark};
`;

const AnotacaoContainer = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.light};
  border-radius: 30px;
`;

const PageContainer = styled.div`
  height: 300px;
  width: 400px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  display: flex;
  gap: 40px;
  margin-bottom: 20px;

  .wave-group {
    position: relative;
  }

  .wave-group .input {
    font-size: 16px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 185px;
    border: none;
    border-bottom: 1px solid #515151;
    background: transparent;
  }

  .wave-group .input:focus {
    outline: none;
  }

  .wave-group .label {
    color: #999;
    font-size: 18px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    display: flex;
  }

  .wave-group .label-char {
    transition: 0.2s ease all;
    transition-delay: calc(var(--index) * 0.05s);
  }

  .wave-group .input:focus ~ label .label-char,
  .wave-group .input:valid ~ label .label-char {
    transform: translateY(-20px);
    font-size: 14px;
    color: ${colors.primary};
  }

  .wave-group .bar {
    position: relative;
    display: block;
    width: 200px;
  }

  .wave-group .bar:before,
  .wave-group .bar:after {
    content: "";
    height: 1px;
    width: 0;
    bottom: 0px;
    position: absolute;
    background: ${colors.primary};
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }

  .wave-group .bar:before {
    left: 50%;
  }

  .wave-group .bar:after {
    right: 50%;
  }

  .wave-group .input:focus ~ .bar:before,
  .wave-group .input:focus ~ .bar:after {
    width: 50%;
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    color: ${colors.dark};
    background-color: ${colors.primary};
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: ${colors.light};
      border: 2px solid ${colors.primaryLight};
    }
  }
`;
