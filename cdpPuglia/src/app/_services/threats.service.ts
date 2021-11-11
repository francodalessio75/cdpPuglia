import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
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
import { Technique } from '../_models/technique';
import { CVE } from '../_models/cve';


@Injectable({
  providedIn: 'root'
})
export class ThreatsService {
  private readonly baseUrl = 'http://127.0.0.1:5000/';

  //TEST DATA COLLECTION
  lastHourJSONData : any = (lasHourData as any ).default;
  lastHourData : Threat[] = this.lastHourJSONData.data;

  lastSixHoursJSONData : any = (lasSixHoursData as any ).default;
  lastSixHoursData : Threat[] = this.lastSixHoursJSONData.data;

  lastTwelveHoursJSONData : any = (lasTwelveHoursData as any ).default;
  lastTwelveHoursData : Threat[] = this.lastTwelveHoursJSONData.data;

  lastTwentyFourHoursJSONData : any = (lasTwentyFourHoursData as any ).default;
  lastTwentyFourHoursData : Threat[] = this.lastTwentyFourHoursJSONData.data;

  lastSevenDaysJSONData : any = (lasSevenDaysData as any ).default;
  lastSevenDaysData : Threat[] = this.lastSevenDaysJSONData.data;

  lastThirtyDaysJSONData : any = (lastThirtyDaysData as any ).default;
  lastThirtyDaysData : Threat[] = this.lastThirtyDaysJSONData.data;

  threatJSONData : any = (threatData as any ).default;
  threatData : Threat = this.threatJSONData.data;

  techniqueJSONData : any = (techniqueData as any ).default;
  techniqueData : Technique = this.techniqueJSONData.data;

  cveJSONData : any = (cveData as any ).default;
  cveData : CVE = this.cveJSONData as CVE;
  
  currentThreats:Threat[]=[];
  filteredThreats:Threat[]=[];

  currentThreat:Threat = this.threatData;
  currentTechnique:Technique = this.techniqueData;
  currentCve:CVE = this.cveData;

  private currentThreatSource = new ReplaySubject<Threat>(1);
  currentThreat$ = this.currentThreatSource.asObservable();

  private currentThreatsSource = new ReplaySubject<Threat[]>(1);
  currentThreats$ = this.currentThreatsSource.asObservable();

  private currentTechniqueSource = new ReplaySubject<Technique>(1);
  currentTechnique$ = this.currentTechniqueSource.asObservable();

  private currentCveSource = new ReplaySubject<CVE>(1);
  currentCve$ = this.currentCveSource.asObservable();

  constructor(
    private http:HttpClient) 
  { }

  getThreats(filter:number){
    // this.http.get<{data:Threat[]}>(this.baseUrl + 'threats/?filter='+filter)
    // //this.http.get<Threat[]>(this.baseUrl + 'threats')
    //   .subscribe( 
    //     response =>{
    //       this.setAndEmitThreats(true,response.data);
    //     }
    //   )
    switch(filter){
      case -1:
        this.setAndEmitThreats(true,this.lastHourData);
        break;
      case -6:
        this.setAndEmitThreats(true,this.lastSixHoursData);
        break;
      case -12:
        this.setAndEmitThreats(true,this.lastTwelveHoursData);
        break;
      case 1:
        this.setAndEmitThreats(true,this.lastTwentyFourHoursData);
        break;
      case 7:
          this.setAndEmitThreats(true,this.lastSevenDaysData);
          break;
      case 30:
          this.setAndEmitThreats(true,this.lastThirtyDaysData);
          break;
      default:
        this.setAndEmitThreats(true,this.lastHourData);
        break;
    }
  }

  private setAndEmitThreats(isAPI:boolean,threats:Threat[]){
    isAPI ? this.currentThreats = threats : this.filteredThreats = threats;
    this.currentThreatsSource.next(threats);
  }

  getThreat(){
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
    this.emitThreat(this.currentThreat);
  }

  filterThreats(severity:Severity,ipSrc:string, ipDst:string, label:string){
    let filteredThreats:Threat[] = [];
    let matchSeverity = false;
    let matchIpSrc = false
    let matchIpDst = false;
    let containsLabel = false;

    this.currentThreats.forEach(threat => {
    
      matchSeverity=matchIpSrc=matchIpDst=containsLabel=false;

      if(!severity || threat.severity === severity || severity === Severity.undefined){
        matchSeverity = true;
      }
      
      if(!ipSrc ||threat.ipSrc === ipSrc || ipSrc === ''){
        matchIpSrc = true;
      }
      
      if(!ipDst ||threat.ipDst === ipDst || ipDst === ''){
        matchIpDst = true;
      }
      
      if(!label || threat.label?.toLowerCase().includes(label.toLowerCase())){
        containsLabel = true;
        
      }
      
      if(matchSeverity&&matchIpSrc&&matchIpDst&&containsLabel)
        filteredThreats.push(threat);
    });

    this.setAndEmitThreats(false,filteredThreats);
  }

  resetFilterThreats(){
    this.setAndEmitThreats(false,this.currentThreats);
  }

  emitThreat(threat:Threat){
    this.currentThreatSource.next(this.currentThreat);
  }

  setThreat(threatId:number){
    let threat:Threat | undefined = this.currentThreats.find( threat => {
      threat.threatId === threatId
    });

    if(threat){
      this.currentThreat = threat;
    }
  }

  setTechnique(techniqueId:string){
    // this.http.get<{data:Technique}>(this.baseUrl + 'mitre/'+'T1001.001')
    //   .subscribe(
    //     response =>{
    //       this.currentTechnique = response.data;
    //       this.currentTechniqueSource.next(this.currentTechnique);
    //       console.log(response);
    //     }
    //   )
    this.currentTechnique = techniqueData;
    this.currentTechniqueSource.next(this.currentTechnique);
  }

  getTechnique():Technique{
    return this.currentTechnique;
  }

  setCve(cveId:string){
    // this.http.get<{data:Technique}>(this.baseUrl + 'cve/'+'0')
    //   .subscribe(
    //     response =>{
    //       this.currentTechnique = response.data;
    //       this.currentTechniqueSource.next(this.currentTechnique);
    //       console.log(response);
    //     }
    //   )
    this.currentCve = cveData;
    this.currentCveSource.next(this.currentCve);
  }

  getCve():Technique{
    return this.currentCve;
  }
    
}
