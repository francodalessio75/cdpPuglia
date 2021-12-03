import { Component, OnInit } from '@angular/core';
import { Translatable } from 'src/app/interfaces/translatable';
import { LanguageData } from 'src/app/_models/languageData';
import { Threat } from 'src/app/_models/threat';
import { ThreatsService } from 'src/app/_services/threats.service';
import { TranslationService } from 'src/app/_services/translation.service';


@Component({
  selector: 'app-threat-connections',
  templateUrl: './threat-connections.component.html',
  styleUrls: ['./threat-connections.component.css']
})
export class ThreatConnectionsComponent implements OnInit, Translatable {
  threat!:Threat;
  ipSrcSrcPort = '';
  protocol = '';
  ipDstDstPort = '';

  languageData!:LanguageData;

  constructor( 
    private theatsService:ThreatsService,
    private translationService:TranslationService) {
    this.theatsService.currentThreat$.subscribe(
      threat => this.threat = threat
    );

    this.translationService.currentLanguage$.subscribe((language)=>{
      this.languageData = this.translationService.getCurrentLanguageData();
      this.setLanguageData(this.languageData);
    });
  }
   

  ngOnInit(): void {
    this.languageData = this.translationService.getCurrentLanguageData();
    this.setLanguageData(this.languageData);
  }

  setLanguageData(languageData:LanguageData){
    this.ipSrcSrcPort = languageData.sections.threats.threatContent.threatConnections.ipSrcSrcPort;
    this.ipDstDstPort = languageData.sections.threats.threatContent.threatConnections.ipDstDstPort;
    this.protocol = languageData.sections.threats.threatContent.threatConnections.protocol;
  }
}
