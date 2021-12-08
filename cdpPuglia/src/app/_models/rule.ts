import { RuleType } from "../enums/TypeRuleEnum";
import { Severity } from "../enums/SeverityEnum";
import { Mitre } from "./mitre";


export interface Rule {

overview: {
    label?: string;
    type?:RuleType;
    severity?: Severity;
    summary?: string;
},
technical: {
    killChain?: string;
    family?: string;
    category?:string;
    protocol?: string;
    defaultStatus?: boolean;
},
cve: [
    {
        id?: string;
        description?:string;
    }
],
mitres?:Mitre[];

}

