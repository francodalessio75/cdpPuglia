import { TypeRule } from "../enums/TypeRuleEnum";
import { Severity } from "../enums/SeverityEnum";


export interface Rule {

overview: {
    label?: string;
    type?:TypeRule;
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
mitre?:string[];

}

