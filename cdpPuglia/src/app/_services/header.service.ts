import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  title ='';
  description = '';
  constructor() { }
  
  private currentTitleDescription = new ReplaySubject<{title:string, description:string}>(1);
  titleDescription$ = this.currentTitleDescription.asObservable();

  setCurrentTitleDescription( title:string, description:string ){
    this.currentTitleDescription.next({title,description});
  }


}
