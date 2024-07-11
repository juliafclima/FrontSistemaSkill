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

export const getSkill = (token: string, page: number, size: number) => {
  setAuthToken(token);

  return axiosInstance.get("/skill", {
    params: {
      page: page,
      size: size,
    },
  });
};
