import axiosInstance, { setAuthToken } from "./api";

export const getAnotacao = (
  idUsuario: any,
  idUsuarioConsulta: any,
  token: string
) => {
  setAuthToken(token);

  return axiosInstance.get(
    `/anotacao/${idUsuario}/listar/${idUsuarioConsulta}`
  );
};

export const postAnotacao = (
  idUsuario: any,
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

export const deleteAnotacao = (idUsuario: any, idAnotacao: any) => {
  return axiosInstance.delete(`/anotacao/${idUsuario}/apagar/${idAnotacao}`);
};
