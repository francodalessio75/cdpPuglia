import { Component, Input, OnInit } from '@angular/core';
import { Threat } from 'src/app/_models/threat';
import { ThreatsService } from 'src/app/_services/threats.service';


@Component({
  selector: 'app-threat-data',
  templateUrl: './threat-data.component.html',
  styleUrls: ['./threat-data.component.css']
})
export class ThreatDataComponent implements OnInit {
  @Input() threat!:Threat;


  constructor(private threatService:ThreatsService) {
    this.threatService.currentThreat$.subscribe(
      threat => {
        this.threat = threat;
      }
    );
   }

  ngOnInit(): void {
    this.threatService.getThreat();
  }

}
