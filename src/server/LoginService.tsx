import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

interface User {
  login: string;
  senha: string;
}

export const postCadastro = (usuario: User) => {
  return axiosInstance.post("/auth/novoUsuario", usuario);
};

export const postLogin = (username: string, password: string) => {
  return axiosInstance.post("/auth/login", {
    username: username,
    password: password,
  });
};

export const getCadastro = () => {
  return axiosInstance.get("/usuario");
};

export const getUsuarioSkill = () => {
  return axiosInstance.get("/usuario-skill");
};

export const putUsuarioSkill = (id: number, novoNivel: string) => {
  return axiosInstance.put(`/usuario-skill/${id}/atualizar-nivel`, {
    novoNivel,
  });
};

export const postSkill = (nome: string, descricao: string, url: string) => {
  return axiosInstance.post("/skill", {
    nome: nome,
    descricao: descricao,
    url: url,
  });
};
