import { Component, OnInit } from '@angular/core';
import { Threat } from 'src/app/_models/threat';
import { ThreatsService } from 'src/app/_services/threats.service';


@Component({
  selector: 'app-threat-connections',
  templateUrl: './threat-connections.component.html',
  styleUrls: ['./threat-connections.component.css']
})
export class ThreatConnectionsComponent implements OnInit {
  threat!:Threat;

  constructor( private theatsService:ThreatsService) {
    this.theatsService.currentThreat$.subscribe(
      threat => this.threat = threat
    );
   }

  ngOnInit(): void {
  }

}
