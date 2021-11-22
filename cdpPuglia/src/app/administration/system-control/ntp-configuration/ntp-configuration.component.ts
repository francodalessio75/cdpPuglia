import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-ntp-configuration',
  templateUrl: './ntp-configuration.component.html',
  styleUrls: ['./ntp-configuration.component.css']
})
export class NtpConfigurationComponent {
  choosenConfigMode!:string;
  
  configModes:string[]=[
    'Si\'',
    'NO'
  ];

  constructor() { }

}
