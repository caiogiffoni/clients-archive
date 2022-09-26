// fazer os imports
import { createContext, useContext, useEffect, useState } from "react";
import {
  IContactContextProps,
  IContactContextType,
} from "../../interface/contacts";
import api from "../../services";
import { useToken } from "../token";

const initialValue = {
  contacts: [],
  setContacts: () => {},
  refreshContacts: () => {},
};

// criar o context
export const ContactContext = createContext(
  initialValue as IContactContextType
);

// criar o provider
export const ContactProvider = ({ children }: IContactContextProps) => {
  const [contacts, setContacts] = useState(initialValue.contacts);
  const { token } = useToken();

  const refreshContacts = (id: string | undefined) => {
    api
      .get(`/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setContacts(res.data);
      })
      .catch((e) => console.log(e));
  };

  return (
    <ContactContext.Provider value={{ contacts, setContacts, refreshContacts }}>
      {children}
    </ContactContext.Provider>
  );
};

export const useContacts = () => useContext(ContactContext);
