import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  useEffect(() => {
    seiLaToken();
  }, []);

  let token = localStorage.getItem("idUser");

  if (typeof token !== "string") {
    token = String(token);
  }

  async function seiLaToken() {
    let decodedToken;
    try {
      decodedToken = jwtDecode(token);
    } catch (error) {
      return <Navigate to="/" />;
    }

    let currentDate = new Date();

    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      return <Navigate to="/" />;
    }
  }

  return children;
};

export { PrivateRoute };
