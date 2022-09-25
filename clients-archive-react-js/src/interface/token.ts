import { ReactNode } from "react";

export interface ITokenContextType {
  token: string;
  setToken: (newState: string) => void;
  authenticated: string;
  setAuthenticated: (newState: string) => void;
}

export interface ITokenContextProps {
  children: ReactNode;
}

export interface ITokenDecoded {
  name: string;
  id: string;
  exp: string;
  iat: string;
}
