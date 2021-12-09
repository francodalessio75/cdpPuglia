import { Component, Input, OnInit } from '@angular/core';
import { Translatable } from 'src/app/interfaces/translatable';
import { LanguageData } from 'src/app/_models/languageData';
import { Threat } from 'src/app/_models/threat';
import { AccountService } from 'src/app/_services/account.service';
import { ThreatsService } from 'src/app/_services/threats.service';
import { TranslationService } from 'src/app/_services/translation.service';


@Component({
  selector: 'app-threat-data',
  templateUrl: './threat-data.component.html',
  styleUrls: ['./threat-data.component.css']
})
export class ThreatDataComponent implements OnInit, Translatable {
  @Input() threat!:Threat;

  identifier= '';
  severity= '';
  ruleName= '';
  ruleType= '';
  family= '';
  action= '';
  threatMessage= '';

  languageData!:LanguageData;

  constructor(
    private threatService:ThreatsService,
    private translationService:TranslationService,
    private accountService: AccountService,) {
      
    this.threatService.currentThreat$.subscribe(
      threat => {
        this.threat = threat;
      }
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
    this.identifier = languageData.sections.threats.threatContent.threatData.identifier;
    this.severity = languageData.sections.threats.threatContent.threatData.severity;
    this.ruleName = languageData.sections.threats.threatContent.threatData.ruleName;
    this.ruleType = languageData.sections.threats.threatContent.threatData.ruleType;
    this.family = languageData.sections.threats.threatContent.threatData.family;
    this.action = languageData.sections.threats.threatContent.threatData.action;
    this.threatMessage = languageData.sections.threats.threatContent.threatData.threatMessage;
  }

}

