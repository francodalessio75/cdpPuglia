import { Component, Input, OnInit } from '@angular/core';
import { Threat } from 'src/app/_models/threat';
import { ThreatsService } from 'src/app/_services/threats.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { TechniqueDetailsComponent } from './technique-details/technique-details.component';
import { Technique } from 'src/app/_models/technique';

@Component({
  selector: 'app-mitre-elements',
  templateUrl: './mitre-elements.component.html',
  styleUrls: ['./mitre-elements.component.css']
})
export class MitreElementsComponent {
  @Input() threat!:Threat;
  technique!:Technique;

  constructor( 
    private threatService:ThreatsService,
    private dialog:MatDialog){
      this.threatService.currentTechnique$.subscribe(
        technique => {
          this.technique = technique;
          this.openDialog();
        });
  }

  openTechniqueDetails(mitre:string){
    this.threatService.setTechnique(mitre);
  }

  openDialog(){
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
}
