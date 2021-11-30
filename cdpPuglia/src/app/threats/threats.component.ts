import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Threat } from '../_models/threat';
import { HeaderService } from '../_services/header.service';
import { ThreatsService } from '../_services/threats.service';
import { TranslationService } from '../_services/translation.service';
import {MatAccordion} from '@angular/material/expansion';
import { SpinnerService } from '../_services/spinner.service';

@Component({
  selector: 'app-threats',
  templateUrl: './threats.component.html',
  styleUrls: ['./threats.component.css']
})
export class ThreatsComponent implements OnInit, OnDestroy {
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  title = '';
  description = '';

  threat!:Threat;
  threats!:Threat[];
  
  threatsC='';
  searchParameters='';
  resultsFilters='';
  threatsList='';
  threatTitle = '';
  threatDescription = '';

  loading:boolean = false;

  constructor(
    private headerService:HeaderService,
    private threatsService:ThreatsService,
    private translationService:TranslationService) {
      this.threatsService.currentThreat$.subscribe(threat => this.threat = threat);
      this.threatsService.currentThreats$.subscribe(threats => this.threats = threats);
    }

  ngOnInit(): void {
    this.threatsService.getThreats(1);
    this.translationService.currentLanguage$.subscribe((language)=>{
      this.setLanguageData();
    });
    this.setLanguageData();
  }

  ngOnDestroy(){
    this.headerService.setCurrentTitleDescription('','');
  }
  private setLanguageData(){
    let languageData = this.translationService.getCurrentLanguageData();
    this.threatsC = languageData.sections.threats.threatContent.threatC;
    this.searchParameters = languageData.sections.threats.threatContent.searchParameters;
    this.resultsFilters = languageData.sections.threats.threatContent.resultsFilters;
    this.threatsList = languageData.sections.threats.threatContent.threatsList;
    this.threatTitle = languageData.sections.footer.threatTitle;
    this.threatDescription = languageData.sections.footer.threatDescription;
    this.headerService.setCurrentTitleDescription(this.threatTitle, this.threatDescription);
  }
}
