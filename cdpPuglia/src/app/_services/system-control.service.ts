import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { FeelerStatus } from '../enums/FeelerStatusEnum';
import { Feeler } from '../_models/feeler';
import { NTP } from '../_models/NTP';

@Injectable({
  providedIn: 'root'
})
export class SystemControlService {
  private readonly baseUrl = 'http://127.0.0.1:5000/';

  currentFeeler : Feeler = {status:FeelerStatus.active};
  currentNTP:NTP = { ntp:'pool.ntp.org', enabled:true}

  constructor(
    private http:HttpClient) 
  { }

  private currentFeelerSource = new ReplaySubject<Feeler>(1);
  currentFeeler$ = this.currentFeelerSource.asObservable();

  private currentNTPSource = new ReplaySubject<NTP>(1);
  currentNTP$ = this.currentNTPSource.asObservable();

  emitFeeler(){
    // this.currentFeeler.status = Math.floor(Math.random() * 2 ) > 0 
    // ? FeelerStatus.active 
    // : FeelerStatus.suspended;
    this.currentFeelerSource.next(this.currentFeeler);
  }

  emitNTP(){
    // this.currentFeeler.status = Math.floor(Math.random() * 2 ) > 0 
    // ? FeelerStatus.active 
    // : FeelerStatus.suspended;
    this.currentNTPSource.next(this.currentNTP);
  }

  stopFeeler(){
    this.currentFeeler.status = FeelerStatus.suspended;
    this.currentFeelerSource.next(this.currentFeeler);
  }

  startFeeler(restartMode:string){
    this.currentFeeler.status = FeelerStatus.active;
    this.currentFeelerSource.next(this.currentFeeler);
  }

  configureNTPServer(NTPServerName:string, enabled:boolean)
  {
    this.currentNTP.ntp = NTPServerName;
    this.currentNTP.enabled = enabled;
    this.currentNTPSource.next(this.currentNTP);
  }
  
}
