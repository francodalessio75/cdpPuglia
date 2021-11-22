import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Severity } from 'src/app/enums/SeverityEnum';
import { Threat } from 'src/app/_models/threat';
import { ThreatsService } from 'src/app/_services/threats.service';
import { TranslationService } from 'src/app/_services/translation.service';

interface Intelligence{
  id?:number;
  ioc?:string;
  description?:string;
  threathLevel?:Severity;
}

@Component({
  selector: 'app-intelligence-data',
  templateUrl: './intelligence-data.component.html',
  styleUrls: ['./intelligence-data.component.css']
})
export class IntelligenceDataComponent {
  @Input()intelligence:Intelligence[] = [{}];
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
        this.intelligence = threat.intelligence as Intelligence[];
        this.dataSource = new MatTableDataSource(this.intelligence);
      } 
    });
  }
  ngOnInit(){
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
    this.threatLevel = languageData.sections.threats.threatContent.intelligenceData.threatLevel;
    this.description = languageData.sections.threats.threatContent.intelligenceData.description;
  }
}
