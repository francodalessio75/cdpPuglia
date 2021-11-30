import { Component, Input, OnInit } from '@angular/core';
import { Feeler } from 'src/app/_models/feeler';
import { SystemControlService } from 'src/app/_services/system-control.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationAlertComponent } from '../confirmation-alert/confirmation-alert.component';
import { SuccessFeedbackComponent } from '../success-feedback/success-feedback.component';
import { LanguageData } from 'src/app/_models/languageData';
import { TranslationService } from 'src/app/_services/translation.service';
import { FeelerStatus } from 'src/app/enums/FeelerStatusEnum';
import { SpinnerService } from 'src/app/_services/spinner.service';

export interface TableRow{
  status:string;
  action:string;
}

@Component({
  selector: 'app-feeler-status',
  templateUrl: './feeler-status.component.html',
  styleUrls: ['./feeler-status.component.css']
})
export class FeelerStatusComponent implements OnInit {
  @Input() feeler!:Feeler

  languageData!:LanguageData;
  confirmationSystemOffRequestMessage!:string;
  transmissionSuccededMessage!:string;
  
  displayedColumns: string[] = ['status','action'];

  tableHeaders:string[] = [];
  
  dataSource:TableRow[] = [];

  constructor(
    private systemControlService : SystemControlService,
    private dialog:MatDialog,
    private toastr:ToastrService,
    private translationService:TranslationService,
    private spinnerService:SpinnerService) {
      this.translationService.currentLanguage$.subscribe(
        language => {
          this.languageData = this.translationService.getCurrentLanguageData();
          this.setLanguageData(this.languageData);
        }
      );
      this.systemControlService.currentFeeler$.subscribe(
        feeler => this.feeler = feeler
      );
   }

   ngOnInit(): void {
     this.languageData = this.translationService.getCurrentLanguageData();
     this.setLanguageData(this.languageData);
     this.systemControlService.getFeeler();
  }


  stopFeeler(){
    this.dialog
      .open( ConfirmationAlertComponent,{
        hasBackdrop:true,
        disableClose:true,
        data: this.confirmationSystemOffRequestMessage
      })
      .afterClosed()
      .subscribe((confirmed:Boolean) => {
        if(confirmed){
          this.systemControlService.stopFeeler();
          this.dialog.open(SuccessFeedbackComponent,{
            hasBackdrop:true,
            disableClose:true,
            data:this.transmissionSuccededMessage
          }) 
        }else {
          this.toastr.info("Operazione Annulata");
        }  
      }
    );
  }

  setLanguageData(languageData:LanguageData){
    this.tableHeaders = [];
    this.tableHeaders.push(languageData.sections.administration.systemControl.feelerStatus.currentStatusLabel);
    this.tableHeaders.push(languageData.sections.global.actionsLabel);
    this.dataSource = [];
    let action = languageData.sections.global.stopLabel;
    this.dataSource.push({status:this.feeler.status+'', action:action});
    this.confirmationSystemOffRequestMessage = languageData.sections.global.confirmationSystemOffRequestMessage;
    this.transmissionSuccededMessage = languageData.sections.global.transmissionSuccededMessage;
  }
}

