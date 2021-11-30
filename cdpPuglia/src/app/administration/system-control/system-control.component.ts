import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { FeelerStatus } from 'src/app/enums/FeelerStatusEnum';
import { Feeler } from 'src/app/_models/feeler';
import { LanguageData } from 'src/app/_models/languageData';
import { HeaderService } from 'src/app/_services/header.service';
import { SpinnerService } from 'src/app/_services/spinner.service';
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
  //System Restart
  systemRestart: string = '';

   // Current Status
   currentStatusTitle: string = '';

  loading!:boolean;

  languageData!:LanguageData;
  pageTitle!:string;
  pageDescription!:string;
  feelerServiceStatus!:string;
  systemRebootTitle!:string;
  configureNTPServerTitle!:string;
  manualTimeSettingTitle!:string;
  systemTitle!:string;
  currentStatus!:string;

  constructor(
    private systemControlService : SystemControlService,
    private translationService:TranslationService,
    private headerService:HeaderService,
    private spinnerService:SpinnerService) {
      this.systemControlService.currentFeeler$.subscribe(
        feeler => this.feeler = feeler
      );
      this.translationService.currentLanguage$.subscribe(
        language => {
          this.languageData = this.translationService.getCurrentLanguageData();
          this.setLanguageData(this.languageData);
        }
      );
      
      this.spinnerService.loading$.subscribe(
        loading => this.loading = loading
      );
   }

  ngOnInit(): void {
    this.systemControlService.getFeeler();
    this.languageData = this.translationService.getCurrentLanguageData();
    this.translationService.currentLanguage$.subscribe((language)=>{
      this.setLanguageData1();
    });
    this.setLanguageData1();
  }

  restart(restartMode:string){
    this.systemControlService.startFeeler(restartMode);
  }

  setLanguageData(languageData:LanguageData){
    this.feelerServiceStatus = languageData.sections.administration.systemControl.feelerStatus.feelerServiceStatusLabel;
    //this.currentStatus = languageData.sections.administration.systemControl.feelerStatus.currentStatus;
    this.pageTitle = languageData.sections.administration.systemControl.pageTitle;
    this.pageDescription = languageData.sections.administration.systemControl.pageDescription;
    this.systemRebootTitle = languageData.sections.administration.systemControl.systemReboot.systemRebootTitle;
    this.configureNTPServerTitle = languageData.sections.administration.systemControl.ntpConfiguration.configureNTPServerTitle;
    this.manualTimeSettingTitle = languageData.sections.administration.systemControl.manualTimeSetting.manualTimeSettingTitle;
    this.headerService.setCurrentTitleDescription(this.pageTitle, this.pageDescription);
  }
  setLanguageData1(){
    this.systemRestart = this.languageData.sections.systemControl.systemRestart.systemRestart;
    this.currentStatusTitle = this.languageData.sections.systemControl.currentStatus.currentStatusTitle;
  }

}
