import { Component, OnInit } from '@angular/core';
import { Threat } from 'src/app/_models/threat';
import { ThreatsService } from 'src/app/_services/threats.service';

@Component({
  selector: 'app-mitre-elements',
  templateUrl: './mitre-elements.component.html',
  styleUrls: ['./mitre-elements.component.css']
})
export class MitreElementsComponent implements OnInit {
  threat!:Threat;

  constructor( private thtreatService:ThreatsService) { 
    this.thtreatService.currentThreat$.subscribe(
      threat => this.threat = threat
    );
  }

  ngOnInit(): void {
    this.thtreatService.getThreat();
  }

}
