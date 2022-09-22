export interface IClientRequest {
  name: string;
  email: string;
  telephone: string;
}

export interface IClientCreate {
  name: string;
  email: string;
  telephone: string;
  id: string;
}

export interface IClient {
  id: string;
  name: string;
  email: string;
  telephone: string;
  DOR: Date;
}

export interface IClientUpdate extends IClientRequest {
  user_id: string;
  client_id: string;
}

export interface IClientDelete {
  client_id: string;
  user_id: string;
}

export interface IClientUpdateSchema {
  name?: string;
  email?: string;
  telephone?: string;
}
