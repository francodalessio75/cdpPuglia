import { UserRole } from "../enums/UserRoleEnum";

export interface User{
  id?:string;
  username?:string;
  password?:string
  token?:string;
  email?:string;
  role?:UserRole;
  status?:boolean;
  created?:Date;
}
