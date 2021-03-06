import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Severity } from 'src/app/enums/SeverityEnum';
import { Translatable } from 'src/app/interfaces/translatable';
import { Intelligence } from 'src/app/_models/intelligence';
import { LanguageData } from 'src/app/_models/languageData';
import { Threat } from 'src/app/_models/threat';
import { ThreatsService } from 'src/app/_services/threats.service';
import { TranslationService } from 'src/app/_services/translation.service';


@Component({
  selector: 'app-intelligence-data',
  templateUrl: './intelligence-data.component.html',
  styleUrls: ['./intelligence-data.component.css']
})
export class IntelligenceDataComponent implements Translatable {
  @Input() threat!:Threat;
  intelligences:Intelligence[] = [{}];

  languageData!:LanguageData;

  intelligenceData='';
  description='';
  threatLevel='';

  displayedColumns=[
    'id',
    'ioc',
    'descritpion',
    'threathLevel'
  ];

  dataSource:MatTableDataSource<Intelligence> = new MatTableDataSource();

  constructor(
    private threatService:ThreatsService,
    private translationService:TranslationService,
    private router:Router) {
      this.threatService.currentThreat$.subscribe(threat =>{
        if(threat.intelligence){
          this.intelligences = threat.intelligence as Intelligence[];
          this.dataSource = new MatTableDataSource(this.intelligences);
        } 
      });
      this.translationService.currentLanguage$.subscribe(
        language => {
          this.languageData = this.translationService.getCurrentLanguageData();
          this.setLanguageData(this.languageData);
        }
      );
  }
  ngOnInit(){
    this.intelligences = this.threat.intelligence as Intelligence[];
    this.languageData = this.translationService.getCurrentLanguageData();
    this.setLanguageData( this.languageData);
  }

  backToThreats(){
    this.router.navigateByUrl('threats');
  }

  setLanguageData(languageData:LanguageData){
    this.intelligenceData = languageData.sections.threats.threatContent.intelligenceData.intelligenceData;
    this.threatLevel = languageData.sections.threats.threatContent.intelligenceData.threatLevel;
    this.description = languageData.sections.threats.threatContent.intelligenceData.description;
  }
}
