import { Navigate, Route, Routes } from "react-router-dom";

import Cadastro from "../pages/cadastro";
import Erro from "../pages/erro";
import Home from "../pages/home";
import Login from "../pages/login";

const isAuthenticated = () => {
  return localStorage.getItem("userId") !== null;
};

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
