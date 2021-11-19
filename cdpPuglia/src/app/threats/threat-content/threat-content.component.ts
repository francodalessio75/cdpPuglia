import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Threat } from 'src/app/_models/threat';
import { ThreatsService } from 'src/app/_services/threats.service';
import { TranslationService } from 'src/app/_services/translation.service';
import { IntelligenceDataComponent } from './intelligence-data/intelligence-data.component';


@Component({
  selector: 'app-threat-content',
  templateUrl: './threat-content.component.html',
  styleUrls: ['./threat-content.component.css']
})
export class ThreatContentComponent implements OnInit {
  threat!:Threat;
  close='';

  constructor( 
    private threatService:ThreatsService,
    private translationService:TranslationService,
    private router:Router ) {
    this.threatService.currentThreat$.subscribe(threat => {
      this.threat = threat;
    });
  }

  ngOnInit(): void {
    this.threatService.getThreat();
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
    this.close = languageData.sections.global.close;}

}
