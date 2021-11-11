import { Platform } from "../enums/Platform";

export interface Technique{
    data:{
        id?:string;
        name?:string;
        url?:string;
        killChainPhase?:string;
        description?:string;
        dataSource?:string;
        detection?:string;
        platform?:Platform|string[];
    }
}