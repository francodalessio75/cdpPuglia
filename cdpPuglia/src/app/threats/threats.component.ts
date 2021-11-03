import { Component, OnDestroy, OnInit } from '@angular/core';
import { Threat } from '../_models/threat';
import { HeaderService } from '../_services/header.service';
import { ThreatsService } from '../_services/threats.service';

@Component({
  selector: 'app-threats',
  templateUrl: './threats.component.html',
  styleUrls: ['./threats.component.css']
})
export class ThreatsComponent implements OnInit, OnDestroy {
  title = 'Pagina consultazione minacce:';
  description = 'Sezione per consultare grafici ed applicare filtri di ricerca ai reports';

  threat:Threat = {}
  threats:Threat[] = [];

  constructor(
    private headerService:HeaderService,
    private threatsService:ThreatsService) {
    }

  ngOnInit(): void {
    this.headerService.setCurrentTitleDescription(this.title, this.description);
    this.threatsService.currentThreat$.subscribe(threat => this.threat = threat);
    this.threatsService.currentThreats$.subscribe(threats =>{
      this.threats = threats;
      //console.log(threats);
    });
    this.threatsService.getThreats(1);
  }

  ngOnDestroy(){
    this.headerService.setCurrentTitleDescription('','');
  }

  getThreats(filter:number){
    this.threatsService.getThreats(filter);
  }

  getThreat(threatId:number){
    this.threatsService.getThreat(threatId);
  }
}
