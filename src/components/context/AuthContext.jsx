import { createContext } from "react";
import { useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  const handlerAuth = (state) => {
    setIsAuth(state);
  };

  return (
    <AuthContext.Provider value={{ isAuth, handlerAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
