import { Routes, Route } from "react-router-dom";

import Home from "../pages/home";
import Login from "../pages/login";
import Cadastro from "../pages/cadastro";
import Erro from "../pages/erro";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="*" element={<Erro />} />
    </Routes>
  );
}
