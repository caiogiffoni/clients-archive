import React from "react";

export interface IUserDB {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: string;
}

export interface IClients {
  id: string;
  name: string;
  telephone: string;
  email: string;
  DOR: string;
  user: IUserDB[];
}

export interface IClientsContextType {
  clients: IClients[];
  setClients: (newState: []) => void;
  refreshClients: () => void;
}

export interface IClientsContextProps {
  children: React.ReactNode;
}

export interface IClientPost {
  name: string;
  telephone: string;
  email: string;
}
export interface IClientDelete {
  id: string;
  clientId?: string | undefined;
}