import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  
  private currentTitleDescription = new ReplaySubject<{title:string, description:string}>(1);
  titleDescription$ = this.currentTitleDescription.asObservable();

  setCurrentTitleDescription( title:string, description:string ){
    this.currentTitleDescription.next({title,description});
  }
}
