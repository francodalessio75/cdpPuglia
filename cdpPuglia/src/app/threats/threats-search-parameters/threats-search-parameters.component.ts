import { Component, OnInit } from '@angular/core';
import { ThreatsService } from 'src/app/_services/threats.service';
import { TranslationService } from 'src/app/_services/translation.service';

@Component({
  selector: 'app-threats-search-parameters',
  templateUrl: './threats-search-parameters.component.html',
  styleUrls: ['./threats-search-parameters.component.css']
})
export class ThreatsSearchParametersComponent implements OnInit {
  checked=1;
  search='';
  lastHour= '';
  last6Hours= '';
  last12Hours= '';
  last24Hours= '';
  last7Days= '';
  last30Days= '';
  
  constructor(
    private threatsService: ThreatsService,
    private translationService:TranslationService
) { }

  ngOnInit(): void {
    this.translationService.currentLanguage$.subscribe((language)=>{
      this.setLanguageData();
    });
    this.setLanguageData();
  }

  getThreats(){
    this.threatsService.getThreats(this.checked);
  }

  setChecked(filter: number){
    this.checked=filter;
  }
  private setLanguageData(){
    let languageData = this.translationService.getCurrentLanguageData();
    this.search = languageData.sections.threats.threatSearchParameters.search;
    this.lastHour = languageData.sections.threats.threatSearchParameters.lastHour;
    this.last6Hours = languageData.sections.threats.threatSearchParameters.last6Hours;
    this.last12Hours = languageData.sections.threats.threatSearchParameters.last12Hours;
    this.last24Hours = languageData.sections.threats.threatSearchParameters.last24Hours;
    this.last7Days = languageData.sections.threats.threatSearchParameters.last7Days;
    this.last30Days = languageData.sections.threats.threatSearchParameters.last30Days;
  }

}
