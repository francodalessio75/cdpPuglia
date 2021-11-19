import { Component, OnInit } from '@angular/core';
import { Timezone } from 'src/app/_models/timezone';
import * as timeZonesData from '../../../timeZones.json';

@Component({
  selector: 'app-system-time',
  templateUrl: './system-time.component.html',
  styleUrls: ['./system-time.component.css']
})
export class SystemTimeComponent implements OnInit {

  timeZoneJSONData : any = (timeZonesData as any ).default;
  timeZones : Timezone[] = this.timeZoneJSONData;

  datePicker!:string;
  
  constructor() { 
    for(let timeZone of this.timeZones){
      console.log(timeZone);
    }
}

  ngOnInit(): void {
  }

}
