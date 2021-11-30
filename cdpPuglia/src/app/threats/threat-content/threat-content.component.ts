import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Threat } from 'src/app/_models/threat';
import { ThreatsService } from 'src/app/_services/threats.service';
import { TranslationService } from 'src/app/_services/translation.service';



@Component({
  selector: 'app-threat-content',
  templateUrl: './threat-content.component.html',
  styleUrls: ['./threat-content.component.css']
})
export class ThreatContentComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  threat!:Threat;
  threatDatas= '';
  connections='';
  localization='';
  elMitreMatrix='';
  externalLinks='';
  intelligenceData='';


  close='';

  constructor( 
    private threatService:ThreatsService,
    private translationService:TranslationService,
    private router:Router ) {
    this.threatService.currentThreat$.subscribe(threat => {
      this.threat = threat;
    });
  }

  ngOnInit(): void {
    this.threatService.getThreat();
    this.translationService.currentLanguage$.subscribe((language)=>{
      this.setLanguageData();
    });
    this.setLanguageData();
  }

  backToThreats(){
    this.router.navigateByUrl('threats');
  }
  private setLanguageData(){
    let languageData = this.translationService.getCurrentLanguageData();
    this.close = languageData.sections.global.close;
    this.threatDatas = languageData.sections.threats.threatContent.threatData.threatDatas;
    this.connections = languageData.sections.threats.threatContent.threatConnections.connections;
    this.localization = languageData.sections.threats.threatContent.threatMap.localization;
    this.elMitreMatrix = languageData.sections.threats.threatContent.mitreElements.elMitreMatrix;
    this.externalLinks = languageData.sections.threats.threatContent.externalLinks.externalLinks;
    this.intelligenceData = languageData.sections.threats.threatContent.intelligenceData.intelligenceData;

  }

}
