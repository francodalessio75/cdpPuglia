import { Component, Input, OnInit } from '@angular/core';
import { Translatable } from 'src/app/interfaces/translatable';
import { LanguageData } from 'src/app/_models/languageData';
import { Threat } from 'src/app/_models/threat';
import { ThreatsService } from 'src/app/_services/threats.service';
import { TranslationService } from 'src/app/_services/translation.service';

@Component({
  selector: 'app-external-links',
  templateUrl: './external-links.component.html',
  styleUrls: ['./external-links.component.css']
})
export class ExternalLinksComponent implements Translatable{
  @Input() threat!:Threat;

  languageData!:LanguageData;

  constructor( 
    private threatService:ThreatsService,
    private translationService:TranslationService
) { 
    this.threatService.currentThreat$.subscribe(
      threat => this.threat = threat
    );

    this.translationService.currentLanguage$.subscribe((language)=>{
      this.languageData = this.translationService.getCurrentLanguageData();
      this.setLanguageData(this.languageData);
    });
  }

  openSite(extRef:string){
    window.open(extRef, '_blank');
  }
  
  ngOnInit(){
    this.languageData = this.translationService.getCurrentLanguageData();
    this.setLanguageData(this.languageData);
  }

  setLanguageData(languageData:LanguageData){ 
  }

}
