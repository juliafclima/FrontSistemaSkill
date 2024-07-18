import axiosInstance, { setAuthToken } from "./api";

export const getAnotacao = (
  idUsuario: string,
  idUsuarioConsulta: string,
  token: string
) => {
  setAuthToken(token);

  return axiosInstance.get(
    `/anotacao/${idUsuario}/listar/${idUsuarioConsulta}`
  );
};

export const postAnotacao = (
  idUsuario: number,
  descricao: string,
  dataCriacao: Date,
  token: string
) => {
  setAuthToken(token);

  return axiosInstance.post(`/anotacao/${idUsuario}/adicionar`, {
    idUsuario: idUsuario,
    descricao: descricao,
    dataCriacao: dataCriacao,
  });
};

export const deleteUsuarioSkill = (idUsuario: number, idAnotacao: number) => {
  return axiosInstance.delete(`/anotacao/${idUsuario}/apagar/${idAnotacao}`);
};
