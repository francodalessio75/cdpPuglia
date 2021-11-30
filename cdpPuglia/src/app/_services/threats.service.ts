import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Protocol } from '../enums/ProtocolEnum';
import { Severity } from '../enums/SeverityEnum';
import { TypeRule } from '../enums/TypeRuleEnum';
import { Threat } from '../_models/threat';
import * as lasHourData from '../lastHour.json';
import * as lasSixHoursData from '../lastSixHours.json';
import * as lasTwelveHoursData from '../lastTwelveHours.json';
import * as lasTwentyFourHoursData from '../lastTwentyFourHours.json';
import * as lasSevenDaysData from '../lastSevenDays.json';
import * as lastThirtyDaysData from '../lastThirtyDays.json';
import * as threatData from '../threat.json';
import * as techniqueData from '../technique.json';
import * as cveData from '../cve.json';
import * as ruleData from '../rule.json';
import { Technique } from '../_models/technique';
import { CVE } from '../_models/cve';
import { Rule } from '../_models/rule';

@Injectable({
  providedIn: 'root',
})
export class ThreatsService {
  private readonly baseUrl = 'http://127.0.0.1:5000/';

  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading.asObservable();

  //TEST DATA COLLECTION
  lastHourJSONData: any = (lasHourData as any).default;
  lastHourData: Threat[] = this.lastHourJSONData.data;

  lastSixHoursJSONData: any = (lasSixHoursData as any).default;
  lastSixHoursData: Threat[] = this.lastSixHoursJSONData.data;

  lastTwelveHoursJSONData: any = (lasTwelveHoursData as any).default;
  lastTwelveHoursData: Threat[] = this.lastTwelveHoursJSONData.data;

  lastTwentyFourHoursJSONData: any = (lasTwentyFourHoursData as any).default;
  lastTwentyFourHoursData: Threat[] = this.lastTwentyFourHoursJSONData.data;

  lastSevenDaysJSONData: any = (lasSevenDaysData as any).default;
  lastSevenDaysData: Threat[] = this.lastSevenDaysJSONData.data;

  lastThirtyDaysJSONData: any = (lastThirtyDaysData as any).default;
  lastThirtyDaysData: Threat[] = this.lastThirtyDaysJSONData.data;

  threatJSONData: any = (threatData as any).default;
  threatData: Threat = this.threatJSONData.data;

  techniqueJSONData: any = (techniqueData as any).default;
  techniqueData: Technique = this.techniqueJSONData;

  cveJSONData: any = (cveData as any).default;
  cveData: CVE = this.cveJSONData as CVE;

  currentThreats: Threat[] = [];
  filteredThreats: Threat[] = [];

  currentTechnique: Technique = this.techniqueData;

  currentTechniques: Technique[] = [this.currentTechnique];

  ruleJSONData: any = (ruleData as any).default;
  ruleData: Rule = this.ruleJSONData as Rule;
  currentRule: Rule = this.ruleData;

  currentCve: CVE = this.cveData;

  currentCves: CVE[] = [this.currentCve];

  currentThreat: Threat = this.threatData;



  private currentThreatSource = new ReplaySubject<Threat>(1);
  currentThreat$ = this.currentThreatSource.asObservable();

  private currentThreatsSource = new ReplaySubject<Threat[]>(1);
  currentThreats$ = this.currentThreatsSource.asObservable();

  private currentRuleSource = new ReplaySubject<Rule>(1);
  currentRule$ = this.currentRuleSource.asObservable();

  // private currentTechniqueSource = new ReplaySubject<Technique>(1);
  // currentTechnique$ = this.currentTechniqueSource.asObservable();

  // private currentCveSource = new ReplaySubject<CVE>(1);
  // currentCve$ = this.currentCveSource.asObservable();

  constructor(private http: HttpClient) {}

  getThreats(filter: number) {
    // this.http.get<{data:Threat[]}>(this.baseUrl + 'threats/?filter='+filter)
    // //this.http.get<Threat[]>(this.baseUrl + 'threats')
    //   .subscribe(
    //     response =>{
    //       this.setAndEmitThreats(true,response.data);
    //     }
    //   )
    switch (filter) {
      case -1:
        this.currentThreats = this.lastHourData;
        this.currentThreatsSource.next(this.currentThreats);
        break;
      case -6:
        this.currentThreats = this.lastSixHoursData;
        this.currentThreatsSource.next(this.currentThreats);
        break;
      case -12:
        this.currentThreats = this.lastTwelveHoursData;
        this.currentThreatsSource.next(this.currentThreats);
        break;
      case 1:
        this.currentThreats = this.lastTwentyFourHoursData;
        this.currentThreatsSource.next(this.currentThreats);
        break;
      case 7:
        this.currentThreats = this.lastSevenDaysData;
        this.currentThreatsSource.next(this.currentThreats);
        break;
      case 30:
        this.currentThreats = this.lastThirtyDaysData;
        this.currentThreatsSource.next(this.currentThreats);
        break;
      default:
        this.currentThreats = this.lastHourData;
        this.currentThreatsSource.next(this.currentThreats);
        break;
    }
  }

  getTrhreatsSimulation(filter: number) {
    this._loading.next(true);
    setTimeout(() => {
      this.getThreats(filter);
      this._loading.next(false);
    }, 3000);
  }

  // private setAndEmitThreats(isAPI:boolean,threats:Threat[]){
  //   isAPI ? this.currentThreats = threats : this.filteredThreats = threats;
  //   this.currentThreatsSource.next(threats);
  // }

  getThreat() {
    this.currentThreatSource.next(this.currentThreat);
    // return this.http.get<Threat>(this.baseUrl + 'threats/'+threatId)
    //   .pipe(
    //     map(response =>{
    //       this.setThreat(response);
    //       console.log(response);
    //     }  )
    //   )
    // let threat:Threat|undefined = this.currentThreats.find(threat => threat.threatId == threatId);
    // if(threat){
    //   this.setThreat(threat.threatId!);
    //   console.log(threat);
    // }
  }

  filterThreats(
    severity: Severity,
    ipSrc: string,
    ipDst: string,
    label: string
  ) {
    let filteredThreats: Threat[] = [];
    let matchSeverity = false;
    let matchIpSrc = false;
    let matchIpDst = false;
    let containsLabel = false;

    this.currentThreats.forEach((threat) => {
      matchSeverity = matchIpSrc = matchIpDst = containsLabel = false;

      if (
        !severity ||
        threat.severity === severity ||
        severity === Severity.undefined
      ) {
        matchSeverity = true;
      }

      if (!ipSrc || threat.ipSrc === ipSrc || ipSrc === '') {
        matchIpSrc = true;
      }

      if (!ipDst || threat.ipDst === ipDst || ipDst === '') {
        matchIpDst = true;
      }

      if (!label || threat.label?.toLowerCase().includes(label.toLowerCase())) {
        containsLabel = true;
      }

      if (matchSeverity && matchIpSrc && matchIpDst && containsLabel)
        filteredThreats.push(threat);
    });

    this.currentThreatsSource.next(filteredThreats);
  }

  resetFilterThreats() {
    this.currentThreatsSource.next(this.currentThreats);
  }

  

  setThreat(threatId: number) {
    let threat: Threat | undefined = this.currentThreats.find((threat) => {
      threat.threatId === threatId;
    });

    if (threat) {
      this.currentThreat = threat;
      this.currentTechniques = [];
      this.currentCves = [];
      for (let mitre in this.currentThreat.mitre) {
        this.currentTechniques.push(this.getTechnique(mitre));
      }
      for (let cve in this.currentThreat.cves) {
        this.currentCves.push(this.getCve(cve));
      }
    }
  }

  // setTechnique(techniqueId:string){
  //   // this.http.get<{data:Technique}>(this.baseUrl + 'mitre/'+'T1001.001')
  //   //   .subscribe(
  //   //     response =>{
  //   //       this.currentTechnique = response.data;
  //   //       this.currentTechniqueSource.next(this.currentTechnique);
  //   //       console.log(response);
  //   //     }
  //   //   )
  //   this.currentTechnique = techniqueData;
  //   //setTimeout(() => {this.currentTechniqueSource.next(this.currentTechnique)}, 1000);
  //   this.currentTechniqueSource.next(this.currentTechnique);
  // }

  getTechnique(mitre: string): Technique {
    let technique: Technique | undefined;
    technique = this.currentTechniques.find((technique) => {
      return technique.data.id === mitre;
    });
    if (technique) return technique;
    else return { data: {} };

    //return this.currentTechnique;
    // this.http.get<{data:Technique}>(this.baseUrl + 'mitre/'+'T1001.001')
    //   .subscribe(
    //     response =>{
    //       this.currentTechnique = response.data;
    //       this.currentTechniqueSource.next(this.currentTechnique);
    //       console.log(response);
    //     }
    //   )
  }

  // setCve(cveId:string){
  //   // this.http.get<{data:Technique}>(this.baseUrl + 'cve/'+'0')
  //   //   .subscribe(
  //   //     response =>{
  //   //       this.currentTechnique = response.data;
  //   //       this.currentTechniqueSource.next(this.currentTechnique);
  //   //       console.log(response);
  //   //     }
  //   //   )
  //   this.currentCve = cveData;
  //   this.currentCveSource.next(this.currentCve);
  // }

  getRule(ruleId: string){
    this.currentRuleSource.next(this.currentRule);
  }

  setRule(){
    this.currentRuleSource.next(this.currentRule);
  }

  getMitre(ruleId:string = ''):string[] {

    if (ruleId === '') {

      return this.currentThreat.mitre!;

    } else {
      return this.currentRule.mitre!;
    }

  }

  getCve(cveCode: string): Technique {
    let cve: CVE | undefined;
    cve = this.currentCves.find((cve) => {
      return cve.data.cveId === cveCode;
    });
    if (cve) return cve;
    else return { data: {} };
    // this.http.get<{data:Technique}>(this.baseUrl + 'cve/'+'0')
    //   .subscribe(
    //     response =>{
    //       this.currentTechnique = response.data;
    //       this.currentTechniqueSource.next(this.currentTechnique);
    //       console.log(response);
    //     }
    //   )
  }

  showSpinner() {
    this._loading.next(true);
  }

  hideSpinner() {
    this._loading.next(false);
  }
}
