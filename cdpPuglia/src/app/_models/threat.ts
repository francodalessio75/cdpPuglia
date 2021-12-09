import { Protocol } from "../enums/ProtocolEnum";
import { Severity } from "../enums/SeverityEnum";
import { RuleType } from "../enums/RuleTypeEnum";
import { Mitre } from "./mitre";

export interface Threat{
    ts?:string;
    ruleId?:number;
    threatId?:number;
    ipSrc?:string;
    portSrc?:number;
    ipSrcLatitude?:number;
    ipSrcLongitude?:number;
    ipDst?:string;
    portDst?:number;
    ipDstLatitude?:number;
    ipDstLongitude?:number;
    label?:string;
    msg?:string;
    killChain?:string[];
    family?:string;
    protocol?:Protocol;
    ruleType?:RuleType;
    severity?:Severity;
    action?:string;
    cves?:string[];
    mitres?:Mitre[];
    externalRef?:string[];
    intelligence?:{
        id?:number,
        ioc?:string,
        description?:string,
        threatLevel?:Severity}[]
}