import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { LanguageData } from 'src/app/_models/languageData';
import { TranslationService } from 'src/app/_services/translation.service';

@Component({
  selector: 'app-confirmation-alert',
  templateUrl: './confirmation-alert.component.html',
  styleUrls: ['./confirmation-alert.component.css']
})
export class ConfirmationAlertComponent implements OnInit{
  languageData!:LanguageData;
  confirmationRequestTitle!:string;
  yesButtonLabel!:string;
  noButtonLabel!:string;

  constructor(
    public dialog: MatDialogRef<ConfirmationAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,
    private translationService:TranslationService) {
      this.translationService.currentLanguage$.subscribe(
        language => {
          this.languageData = this.translationService.getCurrentLanguageData();
          this.setLanguageData(this.languageData);
        }
      );
     }

     ngOnInit(){
       this.languageData = this.translationService.getCurrentLanguageData();
       this.setLanguageData(this.languageData);
     }

    closeDialog(): void {
      this.dialog.close(false);
    }

    confirmed(): void {
      this.dialog.close(true);
    }

    setLanguageData(languageData:LanguageData){
      this.confirmationRequestTitle = languageData.sections.global.confirmationRequestTitle;
      this.yesButtonLabel = languageData.sections.global.yesButtonLabel;
      this.noButtonLabel = languageData.sections.global.noButtonLabel;
    }
}
