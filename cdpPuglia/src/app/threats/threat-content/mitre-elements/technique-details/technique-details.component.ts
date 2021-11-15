import { Component, Inject, Input, OnInit } from '@angular/core';
import { Technique } from 'src/app/_models/technique';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { TranslationService } from 'src/app/_services/translation.service';

@Component({
  selector: 'app-technique-details',
  templateUrl: './technique-details.component.html',
  styleUrls: ['./technique-details.component.css']
})
export class TechniqueDetailsComponent {
  technique!:Technique;
  closeB='';
  technicalDetail='';
  techniqueT='';
  name='';
  description='';
  platform='';

  constructor(
    private dialogRef: MatDialogRef<TechniqueDetailsComponent>,
    private translationService:TranslationService,
    @Inject(MAT_DIALOG_DATA) data : Technique
    ) {
      this.technique = data;
    }

    ngOnInit(){
      this.translationService.currentLanguage$.subscribe((language)=>{
        this.setLanguageData();
      });
      this.setLanguageData();  
    }

  close() {
    this.dialogRef.close();
  }

  openSite(siteUrl:string|undefined){
    if(siteUrl)
      window.open(siteUrl, '_blank');
  }
  private setLanguageData(){
    let languageData = this.translationService.getCurrentLanguageData();
    this.closeB = languageData.sections.global.close;
    this.technicalDetail = languageData.sections.threats.threatContent.mitreElements.techniqueDetails.technicalDetail;
    this.name = languageData.sections.threats.threatContent.mitreElements.techniqueDetails.name;
    this.techniqueT = languageData.sections.threats.threatContent.mitreElements.techniqueDetails.technique;
    this.description = languageData.sections.threats.threatContent.mitreElements.techniqueDetails.description;
    this.platform = languageData.sections.threats.threatContent.mitreElements.techniqueDetails.platform;
  
  }
}
