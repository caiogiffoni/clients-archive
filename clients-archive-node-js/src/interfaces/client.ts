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
