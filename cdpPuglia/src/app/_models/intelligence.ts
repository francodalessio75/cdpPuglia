import { Severity } from "../enums/SeverityEnum";

export interface Intelligence{
    id?:number;
    ioc?:string;
    description?:string;
    threathLevel?:Severity;
  }