import { Permission } from './permission';

export class User {
    public id?: string;
    public email: string;
    public name: string;
    public password?: string;
    public confirmPassword?: string;
    public changedPassword?: boolean;
    public firstAccessCompany?: boolean;
    public cpf?: string;
    public phone?: string;
    public city?: string;
    public state?: string;
    public cep?: string;
    public observation?: string; 
    public situation?: string;
    public novi?: boolean;
    public userLeaderIdDto?: number
    public userCommercial?: number;
    public companyId?: number;
    public token?: string;
    public userPermissionsDto?: Permission[];
  
    constructor() {
    }
  
  }
  