import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Translatable } from 'src/app/interfaces/translatable';
import { Feeler } from 'src/app/_models/feeler';
import { LanguageData } from 'src/app/_models/languageData';
import { SystemControlService } from 'src/app/_services/system-control.service';
import { TranslationService } from 'src/app/_services/translation.service';
import { ConfirmationAlertComponent } from '../confirmation-alert/confirmation-alert.component';
import { SuccessFeedbackComponent } from '../success-feedback/success-feedback.component';

interface RestartMode{
  value:string,
  message:string
}

@Component({
  selector: 'app-system-restart',
  templateUrl: './system-restart.component.html',
  styleUrls: ['./system-restart.component.css']
})
export class SystemRestartComponent implements Translatable{
  @Input() feeler!:Feeler;

  choosenRebootMode:string='soft';

  languageData!:LanguageData;
  confirmationSystemOffRequestMessage!:string;
  transmissionSuccededMessage!:string;
  rebootButtonLabel!:string;

  displayedColumns: string[] = ['restartMode'];

  tableHeaders:string[] = [];
  
  rebootModes:RestartMode[]=[
    {value:'soft', message:''},
    {value:'hard', message:''}
  ];

  dataSource:string[] = ['rebootRadioButtons']

  constructor(
    private dialog:MatDialog,
    private toastr:ToastrService,
    private translationService:TranslationService,
    private systemControlService:SystemControlService
  ) {
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

   
   ngOnInit(){
    this.languageData = this.translationService.getCurrentLanguageData();
    this.setLanguageData(this.languageData);
   }
  

  restart():void{
    this.dialog
      .open(ConfirmationAlertComponent, {
        hasBackdrop:true,
        disableClose:true,
        data: this.confirmationSystemOffRequestMessage
      })
      .afterClosed()
      .subscribe((confirmed: Boolean) => {
        if (confirmed) {
          this.systemControlService.startFeeler(this.choosenRebootMode);
          this.dialog.open(SuccessFeedbackComponent,{
            hasBackdrop:true,
            disableClose:true,
            data:this.transmissionSuccededMessage
          })
        } else {
          this.toastr.info("Operazione Annulata");
        }
      }
    );
  }

  setLanguageData(languageData:LanguageData){
    this.tableHeaders[0] = languageData.sections.administration.systemControl.systemReboot.rebootModeTitle;

    this.rebootButtonLabel = languageData.sections.administration.systemControl.systemReboot.rebootButtonLabel;

    this.rebootModes[0].message = languageData.sections.administration.systemControl.systemReboot.softRebootMessage;
    this.rebootModes[1].message = languageData.sections.administration.systemControl.systemReboot.hardRebootMessage;
    
    this.confirmationSystemOffRequestMessage = languageData.sections.global.confirmationSystemOffRequestMessage;
    this.transmissionSuccededMessage = languageData.sections.global.transmissionSuccededMessage;
  }
}
