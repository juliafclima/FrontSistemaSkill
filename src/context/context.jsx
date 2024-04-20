import { createContext, useEffect, useState } from "react";

export const Context = createContext({});

export const Provider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const useToken = localStorage.getItem("user_token");
    const usersStorage = localStorage.getItem("users_db");

    if (useToken && usersStorage) {
      const hasUser = JSON.parse(usersStorage)?.filter(
        (user) => user.login === JSON.parse(useToken).login
      );

      if (hasUser) setUser(hasUser[0]);
    }
  }, []);

  /*  const signin = (username, password) => {
    const pessoaEncontrada = pessoas.find(
      login => login.username === username 
    );

    if (pessoaEncontrada) {
      console.log("Usuário logado");
      setUser({ user: pessoaEncontrada.username });
    } else {
      console.log("Usuário não encontrado");
      alert("Senha inválida!");
    }
  }; */

  const signin = (login, senha) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_db"));

    const hasUser = usersStorage?.filter((user) => user.login === login);

    if (hasUser?.length) {
      if (hasUser[0].login === login && hasUser[0].senha === senha) {
        const token = Math.round().toString(36).substring(2);

        localStorage.setItem("user_token", JSON.stringify({ login, token }));

        setUser({ login, senha });
        return;
      } else {
        return "Login ou senha incorretos";
      }
    } else {
      return "Usuário não encontrado";
    }
  };

  const signup = (login, senha) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_db"));

    const hasUser = usersStorage?.filter((user) => user.login === login);

    if (hasUser?.length) {
      return "Já tem uma conta com esse E-mail";
    }

    let newUser;

    if (usersStorage) {
      newUser = [...usersStorage, { login, senha }];
    } else {
      newUser = [{ login, senha }];
    }

    localStorage.setItem("users_db", JSON.stringify(newUser));

    return;
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  return (
    <Context.Provider value={{ user, signed: !!user, signin, signup, signout }}>
      {children}
    </Context.Provider>
  );
};
