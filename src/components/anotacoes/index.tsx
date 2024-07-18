import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { postAnotacao } from "../../server/AnotacoesService";

interface Annotation {
  id: number;
  descricao: string;
  dataCriacao: Date;
}

export default function Anotacoes() {
  const [anotacoes, setAnotacoes] = useState<Annotation[]>([]);
  const [descricao, setDescricao] = useState("");
  const [dataCriacao, setDataCriacao] = useState(new Date());

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    gerarAnotacoes();
  };

  return (
    <div>
      <h1>anotacoes</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Digite sua anotação"
        />
        <button type="submit">Adicionar Anotação</button>
      </form>
      <ul>
        {anotacoes.map((anotacao, index) => (
          <li key={index}>
            <p>anotacao: {index + 1}</p>
            <p>{anotacao.descricao}</p>
            <p>{formatarData(anotacao.dataCriacao)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
