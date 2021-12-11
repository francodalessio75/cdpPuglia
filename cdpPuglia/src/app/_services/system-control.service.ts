import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { FeelerStatus } from '../enums/FeelerStatusEnum';
import { Feeler } from '../_models/feeler';
import { NTP } from '../_models/NTP';
import { Timesetting } from '../_models/timeSetting';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class SystemControlService {
  private readonly baseUrl = 'http://127.0.0.1:5000/';


  currentFeeler: Feeler = { status: FeelerStatus.active };

  currentNTP: NTP = { ntp: 'pool.ntp.org', enabled: true }
  currentTIMESETTING: Timesetting = { datetime: '2021-12-10T14:37:13.397Z', timezone: 'America/Argentina/Buenos_Aires' }

  constructor(
    private http: HttpClient,
    private spinnerService: SpinnerService) { }

  private currentFeelerSource = new ReplaySubject<Feeler>(1);
  currentFeeler$ = this.currentFeelerSource.asObservable();

  private currentNTPSource = new ReplaySubject<NTP>(1);
  currentNTP$ = this.currentNTPSource.asObservable();

  private currentTIMESETTINGSource = new ReplaySubject<Timesetting>(1);
  currentTIMESETTING$ = this.currentTIMESETTINGSource.asObservable();

  getFeeler() {
    // this.currentFeeler.status = Math.floor(Math.random() * 2 ) > 0 
    // ? FeelerStatus.active 
    // : FeelerStatus.suspended;
    this.currentFeelerSource.next(this.currentFeeler);

  }



  stopFeeler() {
    this.spinnerService.setLoading(true);
    setTimeout(() => {
      this.currentFeeler.status = FeelerStatus.suspended;
      this.currentFeelerSource.next(this.currentFeeler);
      this.spinnerService.setLoading(false);
    }, 5000);
  }

  startFeeler(restartMode: string) {
    this.spinnerService.setLoading(true);
    setTimeout(() => {
      this.currentFeeler.status = FeelerStatus.active;
      this.currentFeelerSource.next(this.currentFeeler);
      this.spinnerService.setLoading(false);
    }, 5000);
  }

  getNTP() {
    // this.currentFeeler.status = Math.floor(Math.random() * 2 ) > 0 
    // ? FeelerStatus.active 
    // : FeelerStatus.suspended;

    this.currentNTPSource.next(this.currentNTP);
  }

  getTIMESETTING() {

    this.currentTIMESETTINGSource.next(this.currentTIMESETTING);
  }

  setNTPNameAndStatus(NTPServerName: string, enabled: boolean) {
    this.spinnerService.setLoading(true);
    setTimeout(() => {
      this.currentNTP.ntp = NTPServerName;
      this.currentNTP.enabled = enabled;
      this.currentNTPSource.next(this.currentNTP);
      this.spinnerService.setLoading(false);
    }, 5000);
  }

  setDateTimeAndTimeZone(datetimeValue: string, timezoneValue: string) {
    this.spinnerService.setLoading(true);
    setTimeout(() => {
      this.currentTIMESETTING.datetime = datetimeValue;
      this.currentTIMESETTING.timezone = timezoneValue;
      this.currentTIMESETTINGSource.next(this.currentTIMESETTING);
      this.spinnerService.setLoading(false);
    }, 5000);
  }

}




