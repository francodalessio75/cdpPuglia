import { Component, Input, OnInit } from '@angular/core';
import { Threat } from 'src/app/_models/threat';
import { AccountService } from 'src/app/_services/account.service';
import { ThreatsService } from 'src/app/_services/threats.service';
import { TranslationService } from 'src/app/_services/translation.service';


@Component({
  selector: 'app-threat-data',
  templateUrl: './threat-data.component.html',
  styleUrls: ['./threat-data.component.css']
})
export class ThreatDataComponent implements OnInit {
  @Input() threat!:Threat;
  threatDatas= '';
  identifier= '';
  severity= '';
  ruleName= '';
  typeRule= '';
  family= '';
  action= '';
  threatMessage= '';

  constructor(
    private threatService:ThreatsService,
    private translationService:TranslationService,
    private accountService: AccountService,) {
      
    this.threatService.currentThreat$.subscribe(
      threat => {
        this.threat = threat;
      }
    );
   }

  ngOnInit(): void {
    this.threatService.getThreat();
    this.translationService.currentLanguage$.subscribe((language)=>{
      this.setLanguageData();
    });
    this.setLanguageData();
  }
  private setLanguageData(){
    let languageData = this.translationService.getCurrentLanguageData();
    this.threatDatas = languageData.sections.threats.threatContent.threatData.threatDatas;
    this.identifier = languageData.sections.threats.threatContent.threatData.identifier;
    this.severity = languageData.sections.threats.threatContent.threatData.severity;
    this.ruleName = languageData.sections.threats.threatContent.threatData.ruleName;
    this.typeRule = languageData.sections.threats.threatContent.threatData.typeRule;
    this.family = languageData.sections.threats.threatContent.threatData.family;
    this.action = languageData.sections.threats.threatContent.threatData.action;
    this.threatMessage = languageData.sections.threats.threatContent.threatData.threatMessage;
  }

}
