import { Component, Inject, Input, OnInit } from '@angular/core';
import { Technique } from 'src/app/_models/technique';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-technique-details',
  templateUrl: './technique-details.component.html',
  styleUrls: ['./technique-details.component.css']
})
export class TechniqueDetailsComponent {
  technique!:Technique;

  constructor(
    private dialogRef: MatDialogRef<TechniqueDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) data : Technique
    ) {
      this.technique = data;
    }

  close() {
    this.dialogRef.close();
  }

  openSite(siteUrl:string|undefined){
    if(siteUrl)
      window.open(siteUrl, '_blank');
  }
}
