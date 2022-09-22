export interface IContactRequest {
  name: string;
  email: string;
  telephone: string;
  user_id: string;
  client_id: string;
}

export interface IContact {
  id: string;
  name: string;
  email: string;
  telephone: string;
}

export interface IContactList {
  id: string;
  client_id: string;
}

export interface IContactSchema {
  name: string;
  email: string;
  telephone: string;
}

export interface IContactSchemaUpdate {
  name?: string;
  email?: string;
  telephone?: string;
}

export interface IContactDelete {
  contact_id: string;
  user_id: string;
}

export interface IContactUpdate extends IContactRequest {
  contact_id: string;
}
