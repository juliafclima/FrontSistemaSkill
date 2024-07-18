import axios from "axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";

interface Annotation {
  descricao: string;
  dataCriacao: Date;
}

export default function Anotacoes() {
  const [anotacoes, setAnotacoes] = useState<Annotation[]>([]);
  
  async function gerarAnotacoes() {
    try {
      const response = await axios.get<Annotation[]>(
        "http://localhost:8080/anotacao/1/listar/1"
      );

      setAnotacoes(response.data);
    } catch (error) {
      console.error("Erro ao gerar anotações", error);
    }
  }

  useEffect(() => {
    gerarAnotacoes();
  }, []);

  const formatarData = (data: Date): string => {
    return format(data, "'criada em' dd 'de' MMM", { locale: ptBR });
  };

  return (
    <div>
      <h1>anotacoes</h1>
      <ul>
        {anotacoes.map((anotacao, index) => (
          <li key={index}>
            <p>{anotacao.descricao}</p>
            <p>{formatarData(anotacao.dataCriacao)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
