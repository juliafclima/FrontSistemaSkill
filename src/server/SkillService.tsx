// SkillService.ts
import { axiosInstance, setAuthToken } from "./api";

export const postSkill = (
  nome: string,
  descricao: string,
  url: string,
  token: string
) => {
  setAuthToken(token);

  return axiosInstance.post("/skill", {
    nome: nome,
    descricao: descricao,
    url: url,
  });
};
