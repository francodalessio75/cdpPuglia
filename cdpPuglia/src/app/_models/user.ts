import { UserRole } from "../enums/UserRoleEnum";

export interface User{
  username?:string;
  password?:string
  token?:string;
  email?:string;
  role?:UserRole;
  status?:boolean;
  created?:Date;
}
