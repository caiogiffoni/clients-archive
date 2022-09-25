import { ReactNode } from "react";

export interface IUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserContextType {
  username: string;
  setUsername: (username: string) => void;
  refreshUsername: () => void;
}


export interface IUserContextProps {
  children: ReactNode;
}