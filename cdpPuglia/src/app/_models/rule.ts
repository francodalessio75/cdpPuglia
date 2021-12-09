import { RuleType } from "../enums/RuleTypeEnum";
import { Severity } from "../enums/SeverityEnum";
import { Mitre } from "./mitre";
import { CVE } from "./cve";


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
    cves?:CVE[],
    mitres?:Mitre[];
}

