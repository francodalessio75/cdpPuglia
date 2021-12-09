import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { FeelerStatus } from '../enums/FeelerStatusEnum';
import { Feeler } from '../_models/feeler';
import { NTP } from '../_models/NTP';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class SystemControlService {
  private readonly baseUrl = 'http://127.0.0.1:5000/';


  currentFeeler : Feeler = {status:FeelerStatus.active};

  currentNTP:NTP = { ntp:'pool.ntp.org', enabled:true, datetime:'210531130000'}

  constructor(
    private http:HttpClient,
    private spinnerService:SpinnerService) 
  {}

  private currentFeelerSource = new ReplaySubject<Feeler>(1);
  currentFeeler$ = this.currentFeelerSource.asObservable();

  private currentNTPSource = new ReplaySubject<NTP>(1);
  currentNTP$ = this.currentNTPSource.asObservable();

  getFeeler(){
    // this.currentFeeler.status = Math.floor(Math.random() * 2 ) > 0 
    // ? FeelerStatus.active 
    // : FeelerStatus.suspended;
    this.currentFeelerSource.next(this.currentFeeler);
  }

  
  stopFeeler(){
    this.spinnerService.setLoading(true);
    setTimeout( () => {
      this.currentFeeler.status = FeelerStatus.suspended;
      this.currentFeelerSource.next(this.currentFeeler);
      this.spinnerService.setLoading(false);
    },5000);
  }
  
  startFeeler(restartMode:string){
    this.spinnerService.setLoading(true);
    setTimeout( () => {
      this.currentFeeler.status = FeelerStatus.active;
      this.currentFeelerSource.next(this.currentFeeler);
      this.spinnerService.setLoading(false);
    },5000);
  }

  getNTP(){
    // this.currentFeeler.status = Math.floor(Math.random() * 2 ) > 0 
    // ? FeelerStatus.active 
    // : FeelerStatus.suspended;
    this.currentNTPSource.next(this.currentNTP);
  }

  setNTPNameAndStatus(NTPServerName:string, enabled:boolean)
  {
    this.spinnerService.setLoading(true);
    setTimeout( () => {
      this.currentNTP.ntp = NTPServerName;
      this.currentNTP.enabled = enabled;
      this.currentNTPSource.next(this.currentNTP);
      this.spinnerService.setLoading(false);
    },5000);
  }

  setNTPTimeAndTimeZone(dateTime:string, timezone:string){
    this.spinnerService.setLoading(true);
    setTimeout( () => {
      this.currentNTP.datetime = dateTime;
      this.currentNTP.timezone = timezone;
      this.currentNTPSource.next(this.currentNTP);
      this.spinnerService.setLoading(false);
    },5000);
  }
}
