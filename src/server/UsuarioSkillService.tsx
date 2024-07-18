import { axiosInstance, setAuthToken } from "./api";

export const getUsuarioSkill = async (
  token: string,
  page: any,
  size: any,
  sort = "asc"
) => {
  setAuthToken(token);

  try {
    const response = await axiosInstance.get("/usuario-skill/paginado-sorted", {
      params: {
        sort: sort,
        page: page,
        size: size,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar habilidades do usuário: ", error);
    throw error;
  }
};

export const getUsuarioSkillDesc = async (
  token: string,
  page: any,
  size: any,
  sort = "desc"
) => {
  setAuthToken(token);

  try {
    const response = await axiosInstance.get("/usuario-skill/paginado-sorted", {
      params: {
        sort: sort,
        page: page,
        size: size,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar habilidades do usuário: ", error);
    throw error;
  }
};

export const getUsuarioSkillFiltro = async (
  token: string,
  searchTerm: string
) => {
  setAuthToken(token);

  try {
    const response = await axiosInstance.get("/usuario-skill/filtrar", {
      params: {
        nomeSkill: searchTerm,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar habilidades do usuário: ", error);
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
