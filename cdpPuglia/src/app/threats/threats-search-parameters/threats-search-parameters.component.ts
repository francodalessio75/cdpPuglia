import { Component, OnInit } from '@angular/core';
import { LanguageData } from 'src/app/_models/languageData';
import { ThreatsService } from 'src/app/_services/threats.service';
import { TranslationService } from 'src/app/_services/translation.service';

export interface Range{
  value:string,
  message:string
}

@Component({
  selector: 'app-threats-search-parameters',
  templateUrl: './threats-search-parameters.component.html',
  styleUrls: ['./threats-search-parameters.component.css']
})
export class ThreatsSearchParametersComponent implements OnInit {
  choosenRange:string = '1';

  languageData!:LanguageData;

  ranges:Range[]=[
    {value:'1', message: ''},
    {value:'7', message:''},
    {value:'30', message:''},
    {value:'-1', message: ''},
    {value:'-6', message:''},
    {value:'-12', message:''}
  ];

  ranges_2:Range[]=[
    
  ];
  
  search='';

  constructor(
    private threatsService: ThreatsService,
    private translationService:TranslationService
  ) {
    this.translationService.currentLanguage$.subscribe((language)=>{
      this.languageData = this.translationService.getCurrentLanguageData();
      this.setLanguageData(this.languageData);
  });
 }

  ngOnInit(): void {
    this.languageData = this.translationService.getCurrentLanguageData();
    this.setLanguageData(this.languageData);
  }

  getThreats(){
    this.threatsService.getThreats(+this.choosenRange);
  }

  private setLanguageData(languageData:LanguageData){
    this.search = languageData.sections.global.searchButton;
    this.ranges[0].message = languageData.sections.threats.threatSearchParameters.last24Hours;
    this.ranges[1].message = languageData.sections.threats.threatSearchParameters.last7Days;
    this.ranges[2].message = languageData.sections.threats.threatSearchParameters.last30Days;
    this.ranges[3].message = languageData.sections.threats.threatSearchParameters.lastHour;
    this.ranges[4].message = languageData.sections.threats.threatSearchParameters.last6Hours;
    this.ranges[5].message = languageData.sections.threats.threatSearchParameters.last12Hours;
  }

}
