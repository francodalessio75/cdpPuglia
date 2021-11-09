import { Component, OnInit } from '@angular/core';
import { Threat } from 'src/app/_models/threat';
import { ThreatsService } from 'src/app/_services/threats.service';

@Component({
  selector: 'app-threat-content',
  templateUrl: './threat-content.component.html',
  styleUrls: ['./threat-content.component.css']
})
export class ThreatContentComponent implements OnInit {
  threat!:Threat;

  constructor( private threatService:ThreatsService ) {
    this.threatService.currentThreat$.subscribe(threat => {
      this.threat = threat;
    });
  }

  ngOnInit(): void {
  }

}
