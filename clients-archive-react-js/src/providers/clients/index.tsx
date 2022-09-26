// fazer os imports
import { createContext, useContext, useEffect, useState } from "react";
import {
  IClientPost,
  IClientsContextProps,
  IClientsContextType,
} from "../../interface/clients";
import api from "../../services";
import { useToken } from "../token";

const initialValue = {
  clients: [],
  setClients: () => {},
  refreshClients: () => {},
};

// criar o context
export const ClientsContext = createContext(
  initialValue as IClientsContextType
);

// criar o provider
export const ClientsProvider = ({ children }: IClientsContextProps) => {
  const [clients, setClients] = useState(initialValue.clients);
  const { token } = useToken();

  const refreshClients = () => {
    api
      .get(`/client`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setClients(res.data))
      .catch((e) => console.log(e));
  };


  return (
    <ClientsContext.Provider
      value={{ clients, setClients, refreshClients }}
    >
      {children}
    </ClientsContext.Provider>
  );
};

export const useClients = () => useContext(ClientsContext);
