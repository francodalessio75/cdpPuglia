import { Component, Input, OnInit } from '@angular/core';
import { Threat } from 'src/app/_models/threat';
import { ThreatsService } from 'src/app/_services/threats.service';

@Component({
  selector: 'app-external-links',
  templateUrl: './external-links.component.html',
  styleUrls: ['./external-links.component.css']
})
export class ExternalLinksComponent {

  @Input() threat!:Threat;

  constructor( private threatService:ThreatsService) { 
    this.threatService.currentThreat$.subscribe(
      threat => this.threat = threat
    );
  }

  openSite(extRef:string){
    window.open(extRef, '_blank');
  }

}
