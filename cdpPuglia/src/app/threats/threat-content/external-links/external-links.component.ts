import { Component, Input, OnInit } from '@angular/core';
import { Threat } from 'src/app/_models/threat';
import { ThreatsService } from 'src/app/_services/threats.service';
import { TranslationService } from 'src/app/_services/translation.service';

@Component({
  selector: 'app-external-links',
  templateUrl: './external-links.component.html',
  styleUrls: ['./external-links.component.css']
})
export class ExternalLinksComponent {

  @Input() threat!:Threat;

  constructor( 
    private threatService:ThreatsService,
    private translationService:TranslationService
) { 
    this.threatService.currentThreat$.subscribe(
      threat => this.threat = threat
    );
  }

  openSite(extRef:string){
    window.open(extRef, '_blank');
  }
  ngOnInit(){
    this.translationService.currentLanguage$.subscribe((language)=>{
      this.setLanguageData();
    });
    this.setLanguageData();
  }
  private setLanguageData(){
    let languageData = this.translationService.getCurrentLanguageData();
}}
