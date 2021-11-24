import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LanguageData } from 'src/app/_models/languageData';
import { TranslationService } from 'src/app/_services/translation.service';

@Component({
  selector: 'app-success-feedback',
  templateUrl: './success-feedback.component.html',
  styleUrls: ['./success-feedback.component.css']
})
export class SuccessFeedbackComponent implements OnInit {
  languageData!:LanguageData;
  transmissionSuccededTitle!:string;

  constructor(
    public dialog: MatDialogRef<SuccessFeedbackComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,
    private router:Router,
    private translationService:TranslationService) { 
      this.translationService.currentLanguage$.subscribe(
        language => {
          this.languageData = this.translationService.getCurrentLanguageData();
          this.setLanguageData(this.languageData);
        }
      );
    }

  closeDialog(): void {
    this.dialog.close();
    this.router.navigateByUrl('/threats');
  }

  ngOnInit(): void {
    this.languageData = this.translationService.getCurrentLanguageData();
    this.setLanguageData(this.languageData);
  }

  setLanguageData(languageData:LanguageData){
    this.transmissionSuccededTitle = languageData.sections.global.transmissionSuccededTitle;
  }
}
