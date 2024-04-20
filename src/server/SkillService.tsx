import axios from "axios";

const getToken = () => localStorage.getItem("token");

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

interface Skill {
  nome: String;
  descricao: String;
  url: String;
}

export const postSkill = (skill: Skill) => {
  return axiosInstance.post("/skill", skill);
};

export const getSkill = () => {
  return axiosInstance.post("/skill");
};

export const deleteSkill = (id: number) => {
  return axiosInstance.post(`/skill/${id}`);
};

export const putSkill = (id: number, skillAtualizada: Skill) => {
  return axiosInstance.put(`/skill/${id}`, skillAtualizada);
};
