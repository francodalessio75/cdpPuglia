import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Severity } from 'src/app/enums/SeverityEnum';
import { Translatable } from 'src/app/interfaces/translatable';
import { LanguageData } from 'src/app/_models/languageData';
import { ThreatsService } from 'src/app/_services/threats.service';
import { TranslationService } from 'src/app/_services/translation.service';

@Component({
  selector: 'app-threats-filters',
  templateUrl: './threats-filters.component.html',
  styleUrls: ['./threats-filters.component.css']
})
export class ThreatsFiltersComponent implements OnInit, Translatable {
  selectedOption='undefined';
  filterAll='';
  clearAll='';
  severity= '';
  all= '';
  critical= '';
  high= '';
  medium= '';
  low= '';
  ipSource='';
  ipDestination='';
  keyWord='';

  languageData!:LanguageData;

  filterForm: FormGroup = this.fb.group({
    severity: [''],
    ipSrc: [''],
    ipDst: [''],
    label: ['']
  });

  constructor( 
    private fb:FormBuilder,
    private threatsService:ThreatsService,
    private translationService:TranslationService
) {
  this.translationService.currentLanguage$.subscribe((language)=>{
    this.languageData = this.languageData = this.translationService.getCurrentLanguageData();
    this.setLanguageData(this.languageData);
  });
 }

  ngOnInit(): void {
    this.languageData = this.languageData = this.translationService.getCurrentLanguageData();
    this.setLanguageData(this.languageData);
  }

  filter(){
    this.threatsService.filterThreats(
      this.filterForm.value.severity,
      this.filterForm.value.ipSrc,
      this.filterForm.value.ipDst,
      this.filterForm.value.label,
    );
  }

  resetFilters(){
    this.filterForm.reset();
    this.selectedOption='undefined';
    this.filter();
  }
  
  setLanguageData(languageData:LanguageData){
    this.severity = languageData.sections.threats.threatFilters.severity.severity;
    this.all = languageData.sections.threats.threatFilters.severity.all;
    this.critical = languageData.sections.threats.threatFilters.severity.critical;
    this.high = languageData.sections.threats.threatFilters.severity.high;
    this.medium = languageData.sections.threats.threatFilters.severity.medium;
    this.low = languageData.sections.threats.threatFilters.severity.low;
    this.filterAll = languageData.sections.threats.threatFilters.filterAll;
    this.clearAll = languageData.sections.threats.threatFilters.clearAll;
    this.ipSource = languageData.sections.threats.threatFilters.ipSource;
    this.ipDestination = languageData.sections.threats.threatFilters.ipDestination;
    this.keyWord = languageData.sections.threats.threatFilters.keyWord;
    
  }
}
