import { Component, OnInit } from '@angular/core';
import { Threat } from 'src/app/_models/threat';
import { ThreatsService } from 'src/app/_services/threats.service';
import { TranslationService } from 'src/app/_services/translation.service';


@Component({
  selector: 'app-threat-connections',
  templateUrl: './threat-connections.component.html',
  styleUrls: ['./threat-connections.component.css']
})
export class ThreatConnectionsComponent implements OnInit {
  threat!:Threat;
  ipSrcSrcPort = '';
  protocol = '';
  ipDstDstPort = '';

  constructor( 
    private theatsService:ThreatsService,
    private translationService:TranslationService) {
    this.theatsService.currentThreat$.subscribe(
      threat => this.threat = threat
    );
   }

  ngOnInit(): void {
    this.translationService.currentLanguage$.subscribe((language)=>{
      this.setLanguageData();
    });
    this.setLanguageData();
  }

  private setLanguageData(){
    let languageData = this.translationService.getCurrentLanguageData();
    this.ipSrcSrcPort = languageData.sections.threats.threatContent.threatConnections.ipSrcSrcPort;
    this.ipDstDstPort = languageData.sections.threats.threatContent.threatConnections.ipDstDstPort;
    this.protocol = languageData.sections.threats.threatContent.threatConnections.protocol;
    // this.elMitreMatrix = languageData.sections.threats.elMitreMatrix;
  }
}
