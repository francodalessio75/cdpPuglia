import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Protocol } from '../enums/ProtocolEnum';
import { Severity } from '../enums/SeverityEnum';
import { TypeRule } from '../enums/TypeRuleEnum';
import { Threat } from '../_models/threat';

@Injectable({
  providedIn: 'root'
})
export class ThreatsService {
  private readonly baseUrl = 'http://127.0.0.1:5000/';
  
  currentThreats:Threat[]=[];

  private last30DaysThreats:Threat[] = [
    {
      ipSrcLongitude:-93.2323,
      action:'drop',
      cves:[
        'CVE-2021-0022',
        'CVE-2021-0023'
      ],
      externalRef:[
        'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-0022',
        'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-3156'
      ],
      family:'risk type',
      intelligence:[
        {
          description:"descrizione",
          id:0,
          ioc:'ioc',
          threatLevel:Severity.medium
        }
      ],
      ipDst:'172.21.1.56',
      ipDstLatitude:44.9733,
      ipDstLongitude:-93.2323,
      ipSrc:'172.21.1.55',
      ipSrcLatitude:44.9733,
      killChain:[
        'Command and Control',
        'Initial Access'
      ],
      label:'Brute Force SSH',
      mitre:[
        't1100',
        't1111'
      ],
      msg:'message of rule',
      portDst:22,
      portSrc:80,
      protocol:Protocol.tcp,
      ruleId:0,
      severity:Severity.medium,
      threatId:0,
      ts:'2021-10-10T12:00:00+02:00',
      typeRule:TypeRule.behaviour
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:1,
      ts:'2021-10-10T13:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:2,
      ts:'2021-10-10T14:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:3,
      ts:'2021-10-10T15:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:4,
      ts:'2021-10-10T16:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:5,
      ts:'2021-10-10T17:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:6,
      ts:'2021-10-10T18:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:7,
      ts:'2021-10-10T19:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:7,
      ts:'2021-10-10T20:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:7,
      ts:'2021-10-10T21:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:7,
      ts:'2021-10-10T22:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:7,
      ts:'2021-10-10T23:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    }
  ];

  private last7DaysThreats:Threat[] = [
    {
      ipSrcLongitude:-93.2323,
      action:'drop',
      cves:[
        'CVE-2021-0022',
        'CVE-2021-0023'
      ],
      externalRef:[
        'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-0022',
        'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-3156'
      ],
      family:'risk type',
      intelligence:[
        {
          description:"descrizione",
          id:0,
          ioc:'ioc',
          threatLevel:Severity.medium
        }
      ],
      ipDst:'172.21.1.56',
      ipDstLatitude:44.9733,
      ipDstLongitude:-93.2323,
      ipSrc:'172.21.1.55',
      ipSrcLatitude:44.9733,
      killChain:[
        'Command and Control',
        'Initial Access'
      ],
      label:'Brute Force SSH',
      mitre:[
        't1100',
        't1111'
      ],
      msg:'message of rule',
      portDst:22,
      portSrc:80,
      protocol:Protocol.tcp,
      ruleId:0,
      severity:Severity.medium,
      threatId:0,
      ts:'2021-10-10T12:00:00+02:00',
      typeRule:TypeRule.behaviour
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:1,
      ts:'2021-10-10T13:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:2,
      ts:'2021-10-10T14:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:3,
      ts:'2021-10-10T15:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:4,
      ts:'2021-10-10T16:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:5,
      ts:'2021-10-10T17:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:6,
      ts:'2021-10-10T18:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:7,
      ts:'2021-10-10T19:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:8,
      ts:'2021-10-10T20:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:9,
      ts:'2021-10-10T21:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:10,
      ts:'2021-10-10T22:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:11,
      ts:'2021-10-10T23:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      ipSrcLongitude:-93.2323,
      action:'drop',
      cves:[
        'CVE-2021-0022',
        'CVE-2021-0023'
      ],
      externalRef:[
        'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-0022',
        'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-3156'
      ],
      family:'risk type',
      intelligence:[
        {
          description:"descrizione",
          id:0,
          ioc:'ioc',
          threatLevel:Severity.medium
        }
      ],
      ipDst:'172.21.1.56',
      ipDstLatitude:44.9733,
      ipDstLongitude:-93.2323,
      ipSrc:'172.21.1.55',
      ipSrcLatitude:44.9733,
      killChain:[
        'Command and Control',
        'Initial Access'
      ],
      label:'Brute Force SSH',
      mitre:[
        't1100',
        't1111'
      ],
      msg:'message of rule',
      portDst:22,
      portSrc:80,
      protocol:Protocol.tcp,
      ruleId:0,
      severity:Severity.medium,
      threatId:0,
      ts:'2021-10-11T12:00:00+02:00',
      typeRule:TypeRule.behaviour
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:1,
      ts:'2021-10-10T13:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:2,
      ts:'2021-10-10T14:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:3,
      ts:'2021-10-10T15:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:4,
      ts:'2021-10-10T16:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:5,
      ts:'2021-10-10T17:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:6,
      ts:'2021-10-10T18:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:7,
      ts:'2021-10-10T19:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:8,
      ts:'2021-10-10T20:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:9,
      ts:'2021-10-10T21:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:10,
      ts:'2021-10-10T22:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:11,
      ts:'2021-10-10T23:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    }
  ];
  
  private last24HoursThreats:Threat[] = [
    {
      ipSrcLongitude:-93.2323,
      action:'drop',
      cves:[
        'CVE-2021-0022',
        'CVE-2021-0023'
      ],
      externalRef:[
        'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-0022',
        'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-3156'
      ],
      family:'risk type',
      intelligence:[
        {
          description:"descrizione",
          id:0,
          ioc:'ioc',
          threatLevel:Severity.medium
        }
      ],
      ipDst:'172.21.1.56',
      ipDstLatitude:44.9733,
      ipDstLongitude:-93.2323,
      ipSrc:'172.21.1.55',
      ipSrcLatitude:44.9733,
      killChain:[
        'Command and Control',
        'Initial Access'
      ],
      label:'Brute Force SSH',
      mitre:[
        't1100',
        't1111'
      ],
      msg:'message of rule',
      portDst:22,
      portSrc:80,
      protocol:Protocol.tcp,
      ruleId:0,
      severity:Severity.medium,
      threatId:0,
      ts:'2021-10-10T12:00:00+02:00',
      typeRule:TypeRule.behaviour
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:1,
      ts:'2021-10-10T13:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:2,
      ts:'2021-10-10T14:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:3,
      ts:'2021-10-10T15:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:4,
      ts:'2021-10-10T16:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:5,
      ts:'2021-10-10T17:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:6,
      ts:'2021-10-10T18:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:7,
      ts:'2021-10-10T19:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:8,
      ts:'2021-10-10T20:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:9,
      ts:'2021-10-10T21:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:10,
      ts:'2021-10-10T22:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:11,
      ts:'2021-10-10T23:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    }
  ];

  private last12HoursThreats:Threat[] = [
    {
      ipSrcLongitude:-93.2323,
      action:'drop',
      cves:[
        'CVE-2021-0022',
        'CVE-2021-0023'
      ],
      externalRef:[
        'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-0022',
        'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-3156'
      ],
      family:'risk type',
      intelligence:[
        {
          description:"descrizione",
          id:0,
          ioc:'ioc',
          threatLevel:Severity.medium
        }
      ],
      ipDst:'172.21.1.56',
      ipDstLatitude:44.9733,
      ipDstLongitude:-93.2323,
      ipSrc:'172.21.1.55',
      ipSrcLatitude:44.9733,
      killChain:[
        'Command and Control',
        'Initial Access'
      ],
      label:'Brute Force SSH',
      mitre:[
        't1100',
        't1111'
      ],
      msg:'message of rule',
      portDst:22,
      portSrc:80,
      protocol:Protocol.tcp,
      ruleId:0,
      severity:Severity.medium,
      threatId:0,
      ts:'2021-10-10T12:00:00+02:00',
      typeRule:TypeRule.behaviour
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:1,
      ts:'2021-10-10T13:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:2,
      ts:'2021-10-10T14:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:3,
      ts:'2021-10-10T15:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:4,
      ts:'2021-10-10T16:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:5,
      ts:'2021-10-10T17:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:6,
      ts:'2021-10-10T18:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:7,
      ts:'2021-10-10T19:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:8,
      ts:'2021-10-10T20:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:9,
      ts:'2021-10-10T21:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:10,
      ts:'2021-10-10T22:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    }
  ];

  private last6HoursThreats:Threat[] = [
    {
      ipSrcLongitude:-93.2323,
      action:'drop',
      cves:[
        'CVE-2021-0022',
        'CVE-2021-0023'
      ],
      externalRef:[
        'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-0022',
        'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-3156'
      ],
      family:'risk type',
      intelligence:[
        {
          description:"descrizione",
          id:0,
          ioc:'ioc',
          threatLevel:Severity.medium
        }
      ],
      ipDst:'172.21.1.56',
      ipDstLatitude:44.9733,
      ipDstLongitude:-93.2323,
      ipSrc:'172.21.1.55',
      ipSrcLatitude:44.9733,
      killChain:[
        'Command and Control',
        'Initial Access'
      ],
      label:'Brute Force SSH',
      mitre:[
        't1100',
        't1111'
      ],
      msg:'message of rule',
      portDst:22,
      portSrc:80,
      protocol:Protocol.tcp,
      ruleId:0,
      severity:Severity.medium,
      threatId:0,
      ts:'2021-10-10T12:00:00+02:00',
      typeRule:TypeRule.behaviour
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:1,
      ts:'2021-10-10T13:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:2,
      ts:'2021-10-10T14:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:3,
      ts:'2021-10-10T15:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:4,
      ts:'2021-10-10T16:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    },
    {
      label:"brute force ssh",
      severity:Severity.low,
      threatId:5,
      ts:'2021-10-10T17:00:00+02:00',
      ipSrc:"127.1.23.569",
      ipDst:"127.1.23.569",
      typeRule:TypeRule.signature
    }
  ];

  private lastHourThreats:Threat[] = [
    {
      ipSrcLongitude:-93.2323,
      action:'drop',
      cves:[
        'CVE-2021-0022',
        'CVE-2021-0023'
      ],
      externalRef:[
        'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-0022',
        'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-3156'
      ],
      family:'risk type',
      intelligence:[
        {
          description:"descrizione",
          id:0,
          ioc:'ioc',
          threatLevel:Severity.medium
        }
      ]
    }
  ];

  

  private threat:Threat = {
    ipSrcLongitude:-93.2323,
    action:'drop',
    cves:[
      'CVE-2021-0022',
      'CVE-2021-0023'
    ],
    externalRef:[
      'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-0022',
      'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-3156'
    ],
    family:'risk type',
    intelligence:[
      {
        description:"descrizione",
        id:0,
        ioc:'ioc',
        threatLevel:Severity.medium
      }
    ],
    ipDst:'172.21.1.56',
    ipDstLatitude:44.9733,
    ipDstLongitude:-93.2323,
    ipSrc:'172.21.1.55',
    ipSrcLatitude:44.9733,
    killChain:[
      'Command and Control',
      'Initial Access'
    ],
    label:'Brute Force SSH',
    mitre:[
      't1100',
      't1111'
    ],
    msg:'message of rule',
    portDst:22,
    portSrc:80,
    protocol:Protocol.tcp,
    ruleId:0,
    severity:Severity.medium,
    threatId:0,
    ts:'2021-06-04T12:00:00+02:00',
    typeRule:TypeRule.behaviour
  };

  

  private currentThreatSource = new ReplaySubject<Threat>(1);
  currentThreat$ = this.currentThreatSource.asObservable();

  private currentThreatsSource = new ReplaySubject<Threat[]>(1);
  currentThreats$ = this.currentThreatsSource.asObservable();

  constructor(
    private http:HttpClient) 
  { }

  getThreats(filter:number){
    // // this.http.get<Threat[]>(this.baseUrl + 'threats?filter='+filter)
    // this.http.get<Threat[]>(this.baseUrl + 'threats')
    //   .subscribe( 
    //     response =>{
    //       this.setThreats(response);
    //     }
    //   )
    switch(filter){
      case 1:
        this.setThreats(this.last24HoursThreats);
        break;
      case -12:
        this.setThreats(this.last12HoursThreats);
        break;
      case -6:
        this.setThreats(this.last6HoursThreats);
        break;
      case -1:
        this.setThreats(this.lastHourThreats);
        break;
      default:
        this.setThreats(this.last24HoursThreats);
        break;
    }
  }

  private setThreats(threats:Threat[]){
    this.currentThreats = threats;
    this.currentThreatsSource.next(this.currentThreats);
  }

  getThreat(threatId:number){
    // return this.http.get<Threat>(this.baseUrl + 'threats/'+threatId)
    //   .pipe( 
    //     map(response =>{
    //       this.setThreat(response);
    //       console.log(response);
    //     }  )
    //   )
    let threat:Threat|undefined = this.last24HoursThreats.find(threat => threat.threatId == threatId);
    if(threat){
      this.setThreat(threat);
      console.log(threat);
    }
  }

  private setThreat(threat:Threat){
    this.threat = threat;
    this.currentThreatSource.next(this.threat);
  }

  filterThreats(severity:Severity,ipSrc:string, ipDst:string, keyWord:string):Threat[]{
    let filteredThreats:Threat[] = [];
    let matchSeverity = false;
    let matchIpSrc = false
    let matchIpDst = false;
    let containsKeyword = false;

    this.last24HoursThreats.forEach(threat => {
      if(severity){
        if(threat.severity === severity){
          matchSeverity = true;
        }
      }
      if(ipSrc){
        if(threat.ipSrc === ipSrc || ipSrc === ''){
          matchIpSrc = true;
        }
      }
      if(ipDst){
        if(threat.ipDst === ipDst || ipDst === ''){
          matchIpDst = true;
        }
      }
      /*** what should the keyword do? */
      if(matchSeverity&&matchIpSrc&&matchIpDst)
        filteredThreats.push(threat);
    });
    
    return filteredThreats;
  }

  resetFilterThreats(){
    this.setThreats(this.last24HoursThreats);
  }
    
}
