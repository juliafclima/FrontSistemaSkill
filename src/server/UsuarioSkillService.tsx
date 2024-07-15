import { axiosInstance, setAuthToken } from "./api";

export const getUsuarioSkill = async (token: string, ordem = "asc") => {
  setAuthToken(token);

  try {
    const response = await axiosInstance.get("/usuario-skill", {
      params: {
        ordem: ordem,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error("Error fetching user skills:", error);
    throw error;
  }
};

export const getUsuarioSkillDesc = async (token: string, ordem = "desc") => {
  setAuthToken(token);

  try {
    const response = await axiosInstance.get("/usuario-skill", {
      params: {
        ordem: ordem,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user skills:", error);
    throw error;
  }
};

export const putUsuarioSkill = (id: number, novoNivel: string) => {
  return axiosInstance.put(`/usuario-skill/${id}/atualizar-nivel`, {
    novoNivel,
  });
};

export const deleteUsuarioSkill = (id: number) => {
  return axiosInstance.delete(`/usuario-skill/${id}`);
};
