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

export interface IContact {
  id: string;
  name: string;
  telephone: string;
  email: string;
  client: IClients;
}

export interface IContactContextType {
  contacts: IContact[];
  setContacts: (newState: []) => void;
  refreshContacts: (id: string | undefined) => void;
}

export interface IContactContextProps {
  children: React.ReactNode;
}

export interface IContactPost {
  name: string;
  telephone: string;
  email: string;
}

export interface IContactCard {
  id: string;
  name: string;
  telephone: string;
  email: string;
  clientId: string | undefined;
}

export interface IContactDelete {
  id: string;
  clientId?: string | undefined;
}
