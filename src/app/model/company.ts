import { User } from './user';

export class Company {
  id?: number;
  cnpj: string;
  description: string;
  city: string;
  state: string;
  cep: string;
  observation?: string;
  situation?: boolean;
  firstAccess?: boolean;
  usersDto?: User[];

    constructor() {
    }
}