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
