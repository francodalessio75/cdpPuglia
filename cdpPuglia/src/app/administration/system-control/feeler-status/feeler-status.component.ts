import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Feeler } from 'src/app/_models/feeler';
import { SystemControlService } from 'src/app/_services/system-control.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationAlertComponent } from '../confirmation-alert/confirmation-alert.component';
import { SuccessFeedbackComponent } from '../success-feedback/success-feedback.component';
import { LanguageData } from 'src/app/_models/languageData';
import { TranslationService } from 'src/app/_services/translation.service';
import { FeelerStatus } from 'src/app/enums/FeelerStatusEnum';


@Component({
  selector: 'app-feeler-status',
  templateUrl: './feeler-status.component.html',
  styleUrls: ['./feeler-status.component.css']
})
export class FeelerStatusComponent implements OnInit, AfterViewInit {
  @Input() feeler!:Feeler

  displayedColumns: string[] = [];

  languageData!:LanguageData;
  
  dataSource:{status:string, action:string}[] = [
    
  ];
  constructor(
    private systemControlService : SystemControlService,
    private dialog:MatDialog,
    private toastr:ToastrService,
    private translationService:TranslationService) {
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
     this.systemControlService.getFeeler();
  }

  ngAfterViewInit(){
    this.setLanguageData(this.languageData);
  }

  stopFeeler(){
     this.dialog
      .open( ConfirmationAlertComponent,{
        data: 'L\'arresto del sistema comporta una interruzione di operativita\' . Confermare l\'operazione?'
      })
      .afterClosed()
      .subscribe((confirmed:Boolean) => {
        if(confirmed){
          this.systemControlService.stopFeeler();
          this.dialog.open(SuccessFeedbackComponent,{
            data:'Rivisitare la sezione per verificare lo stato del sistema.'
        })
      }else {
        this.toastr.info("Operazione Annulata");
      }
    });
  }

  setLanguageData(languageData:LanguageData){
    this.displayedColumns[0] = languageData.sections.administration.systemControl.feelerStatus.currentStatusLabel;
    this.displayedColumns[1] = languageData.sections.global.actionsLabel;
    //let action = this.feeler.status === FeelerStatus.active ? languageData.sections.administration.systemControl.
    //this.dataSource[0] = {status:this.feeler.status, action:};
  }
}

