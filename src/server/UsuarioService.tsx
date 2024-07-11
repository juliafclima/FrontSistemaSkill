import { axiosInstance, setAuthToken } from "./api";

export const getCadastro = (token: string) => {
  setAuthToken(token);

  return axiosInstance.get("/usuario");
};
