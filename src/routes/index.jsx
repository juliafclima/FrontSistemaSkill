import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Cadastro from "../pages/cadastro";
import Erro from "../pages/erro";

// Função para verificar se o userId está presente no localStorage
const isAuthenticated = () => {
  return localStorage.getItem("userId") !== null;
};

// Componente PrivateRoute que verifica se o usuário está autenticado antes de renderizar o componente
const CustomPrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="*" replace />;
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<CustomPrivateRoute element={<Home />} />} />
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="*" element={<Erro />} />
    </Routes>
  );
}
