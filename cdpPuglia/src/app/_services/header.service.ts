import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  title ='';
  description = '';
  titleDescription$ =new Observable<{title:string, description:string}>();
  constructor() { }

  setTitleAndDescription(title:string, description:string){
    this.title=title;
    this.description=description;
    this.titleDescription$.emit()
  }

}
