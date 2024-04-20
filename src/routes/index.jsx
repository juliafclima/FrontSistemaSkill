import { Routes, Route } from "react-router-dom";

import Home from "../pages/home";
import Login from "../pages/login";
import Cadastro from "../pages/cadastro";
import Erro from "../pages/erro";
import { PrivateRoute } from "./privateRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="*" element={<Erro />} />
    </Routes>
  );
}
