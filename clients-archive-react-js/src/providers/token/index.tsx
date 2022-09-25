// fazer os imports
import { createContext, useContext, useEffect, useState } from "react";
import { ITokenContextProps, ITokenContextType } from "../../interface/token";

const initialValue = {
  token: JSON.parse(localStorage.getItem("@CA:token") as string),
  setToken: () => {},
  authenticated: "",
  setAuthenticated: () => {},
};

// criar o context
export const TokenContext = createContext(initialValue as ITokenContextType);

// criar o provider
export const TokenProvider = ({ children }: ITokenContextProps) => {
  const [token, setToken] = useState(initialValue.token);
  const [authenticated, setAuthenticated] = useState(
    initialValue.authenticated
  );

  useEffect(() => {
    setAuthenticated(token);
  }, [token]);

  return (
    <TokenContext.Provider
      value={{ token, setToken, authenticated, setAuthenticated }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
