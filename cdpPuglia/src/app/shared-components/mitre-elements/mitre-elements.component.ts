import { Component, Input } from '@angular/core';
import { ThreatsService } from 'src/app/_services/threats.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { TechniqueDetailsComponent } from './technique-details/technique-details.component';
import { Technique } from 'src/app/_models/technique';
import { TranslationService } from 'src/app/_services/translation.service';
import { Translatable } from 'src/app/interfaces/translatable';
import { LanguageData } from 'src/app/_models/languageData';
import { Mitre } from 'src/app/_models/mitre';

@Component({
  selector: 'app-mitre-elements',
  templateUrl: './mitre-elements.component.html',
  styleUrls: ['./mitre-elements.component.css']
})
export class MitreElementsComponent implements Translatable{
 
  technique!:Technique;
  viewMitreMatrix='';

  @Input() mitres!: Mitre[];

  mitredIds!:string[];

  languageData!:LanguageData;

  constructor( 
    private threatService:ThreatsService,
    private translationService:TranslationService,
    private dialog:MatDialog){
      this.threatService.currentThreat$.subscribe(
        threat =>{
           this.mitres = threat.mitres!
           this.mitres.forEach(
              mitre => this.mitredIds.push(mitre.id!)
           );
           console.log(this.mitredIds);
        }
      );

      this.translationService.currentLanguage$.subscribe((language)=>{
        this.languageData = this.translationService.getCurrentLanguageData();
        this.setLanguageData(this.languageData);
      });
    }

    ngOnInit(){
      this.languageData = this.translationService.getCurrentLanguageData();
      this.setLanguageData(this.languageData);
    } 

  openTechniqueDetails(mitre:Mitre){
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
        console.log(dialogConfig);
        this.dialog.open(TechniqueDetailsComponent, dialogConfig);
        
  }

  openSite(){
    window.open('https://attack.mitre.org/matrices/enterprise/', '_blank');
  }

  setLanguageData(languageData:LanguageData){
    this.viewMitreMatrix = languageData.sections.threats.threatContent.mitreElements.viewMitreMatrix;
  }
}
