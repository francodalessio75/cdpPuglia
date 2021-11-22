import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { FeelerStatus } from '../enums/FeelerStatusEnum';
import { Feeler } from '../_models/feeler';

@Injectable({
  providedIn: 'root'
})
export class SystemControlService {
  private readonly baseUrl = 'http://127.0.0.1:5000/';

  currentFeeler : Feeler = {};

  constructor(
    private http:HttpClient) 
  { }

  private currentFeelerSource = new ReplaySubject<Feeler>(1);
  currentFeeler$ = this.currentFeelerSource.asObservable();

  getFeeler(){
    this.currentFeeler.status = Math.floor(Math.random() * 2 ) > 0 
    ? FeelerStatus.active 
    : FeelerStatus.suspended;

    this.currentFeelerSource.next(this.currentFeeler);
  }

  stopFeeler(){
    this.currentFeeler.status = FeelerStatus.suspended;
    this.currentFeelerSource.next(this.currentFeeler);
  }
  
}
