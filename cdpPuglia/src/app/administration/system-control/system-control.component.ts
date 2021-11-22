import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Feeler } from 'src/app/_models/feeler';
import { LanguageData } from 'src/app/_models/languageData';
import { HeaderService } from 'src/app/_services/header.service';
import { SystemControlService } from 'src/app/_services/system-control.service';
import { TranslationService } from 'src/app/_services/translation.service';

@Component({
  selector: 'app-system-control',
  templateUrl: './system-control.component.html',
  styleUrls: ['./system-control.component.css']
})
export class SystemControlComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  
  feeler!:Feeler;

  languageData!:LanguageData;
  pageTitle!:string;
  pageDescription!:string;
  feelerServiceStatus!:string;
  currentStatus!:string;

  constructor(
    private systemControlService : SystemControlService,
    private translationService:TranslationService,
    private headerService:HeaderService) {
      this.systemControlService.currentFeeler$.subscribe(
        feeler => this.feeler = feeler
      );
      this.translationService.currentLanguage$.subscribe(
        language => { 
          this.languageData = this.translationService.getCurrentLanguageData();
        }
      );
   }

  ngOnInit(): void {
    this.systemControlService.getFeeler();
    this.languageData = this.translationService.getCurrentLanguageData();
    this.setLanguageData(this.languageData);
  }

  setLanguageData(languageData:LanguageData){
    this.feelerServiceStatus = languageData.sections.administration.systemControl.feelerStatus.feelerServiceStatus;
    //this.currentStatus = languageData.sections.administration.systemControl.feelerStatus.currentStatus;
    this.pageTitle = languageData.sections.administration.systemControl.pageTitle;
    this.pageDescription = languageData.sections.administration.systemControl.pageDescription;
    this.headerService.setCurrentTitleDescription(this.pageTitle, this.pageDescription);
  }

}
