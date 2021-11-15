import { Component, Input, OnInit } from '@angular/core';
import { Threat } from 'src/app/_models/threat';
import { ThreatsService } from 'src/app/_services/threats.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { TechniqueDetailsComponent } from './technique-details/technique-details.component';
import { Technique } from 'src/app/_models/technique';
import { TranslationService } from 'src/app/_services/translation.service';

@Component({
  selector: 'app-mitre-elements',
  templateUrl: './mitre-elements.component.html',
  styleUrls: ['./mitre-elements.component.css']
})
export class MitreElementsComponent{
  @Input() threat! : Threat;
  technique!:Technique;
  elMitreMatrix!:'';

  constructor( 
    private threatService:ThreatsService,
    private translationService:TranslationService,
    private dialog:MatDialog){
      this.threatService.currentThreat$.subscribe(
        threat => this.threat = threat
      );
    }

    ngOnInit(){
      this.translationService.currentLanguage$.subscribe((language)=>{
        this.setLanguageData();
      });
      this.setLanguageData();
    }
  openTechniqueDetails(mitre:string){
    this.technique = this.threatService.getTechnique(mitre);
    const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '90%';
        dialogConfig.height = '80%';

        dialogConfig.data = {
          data:{
            id: this.technique.data.id,
            name: this.technique.data.name,
            url: this.technique.data.url,
            killChainPhase: this.technique.data.killChainPhase,
            description: this.technique.data.description,
            dataSource: this.technique.data.dataSource,
            detection: this.technique.data.detection,
            platform: this.technique.data.platform
          }
        };

        this.dialog.open(TechniqueDetailsComponent, dialogConfig);
  }

  openSite(){
    window.open('https://attack.mitre.org/matrices/enterprise/', '_blank');
  }
  private setLanguageData(){
    let languageData = this.translationService.getCurrentLanguageData();
    // this.elMitreMatrix = languageData.sections.threats.elMitreMatrix;
  }
}
