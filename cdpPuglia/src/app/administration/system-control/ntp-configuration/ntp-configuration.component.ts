import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Language } from 'src/app/enums/LanguagesEnum';
import { Feeler } from 'src/app/_models/feeler';
import { LanguageData } from 'src/app/_models/languageData';
import { NTP } from 'src/app/_models/NTP';
import { SystemControlService } from 'src/app/_services/system-control.service';
import { TranslationService } from 'src/app/_services/translation.service';
import { ConfirmationAlertComponent } from '../confirmation-alert/confirmation-alert.component';
import { SuccessFeedbackComponent } from '../success-feedback/success-feedback.component';


interface EnabledRadio{
  value:boolean,
  message:string
}

@Component({
  selector: 'app-ntp-configuration',
  templateUrl: './ntp-configuration.component.html',
  styleUrls: ['./ntp-configuration.component.css']
})
export class NtpConfigurationComponent {
  @Input() feeler!:Feeler;

  ntp!:NTP;
  ntpEnabled!:boolean;

  languageData!:LanguageData;
  language!:Language;
  confirmationSystemOffRequestMessage!:string;
  transmissionSuccededMessage!:string;
  configureButtonLabel!:string;
  NTPServerLabel!:string;
  enabledButtonlabel!:string;
  yesButtonlabel!:string;
  noButtonlabel!:string;
  rebootNeededMessage!:string;

  displayedColumns:string[] = ['name','status'];

  tableHeaders:string[] = [];

  configModes:EnabledRadio[] = [
    {value:true,message:''},
    {value:false,message:''}
  ];

  dataSource:string[] = ['configMode'];

  constructor(
    private dialog:MatDialog,
    private toastr:ToastrService,
    private translationService:TranslationService,
    private systemControlService:SystemControlService,
    private formBuilder:FormBuilder
  ){
    this.translationService.currentLanguage$.subscribe(
      language => {
        this.language = language;
        this.languageData = this.translationService.getCurrentLanguageData();
        this.setLanguageData(this.languageData);
      }
    );
    this.systemControlService.currentFeeler$.subscribe(
      feeler => this.feeler = feeler
    );
    this.systemControlService.currentNTP$.subscribe(
      ntp => {
        this.ntp = ntp;
        this.ntpEnabled = ntp.enabled!;
      }
    );
  }

  ntpForm = this.formBuilder.group({
    serverName:[,Validators.required],
    enabled:['']
  });

  ngOnInit(){
    this.systemControlService.getNTP();
    this.languageData = this.translationService.getCurrentLanguageData();
    this.setLanguageData(this.languageData);
    this.ntpForm.patchValue({
      serverName:this.ntp.ntp
    });
  }

  configure(){
    this.dialog.open(
      ConfirmationAlertComponent,{
        hasBackdrop:true,
        disableClose:true,
        data:this.confirmationSystemOffRequestMessage
      }
    )
    .afterClosed().subscribe((confirmed:boolean) => {
      if(confirmed){
        this.systemControlService.setNTPNameAndStatus(
          this.ntpForm.value.serverName,
          this.ntpEnabled
        );
        this.dialog.open(SuccessFeedbackComponent,{
          hasBackdrop:true,
          disableClose:true,
          data:this.transmissionSuccededMessage + 
               '\n'+this.rebootNeededMessage
        })
      }else{
        this.toastr.info("Operazione Annulata");
      }
    })
  }

  setLanguageData(languageData:LanguageData){
    this.configureButtonLabel = languageData.sections.global.configureButtonLabel;
    this.NTPServerLabel = languageData.sections.administration.systemControl.ntpConfiguration.NTPServerLabel;
    this.enabledButtonlabel = languageData.sections.global.enabledButtonLabel;
    this.yesButtonlabel = languageData.sections.global.noButtonLabel;
    this.noButtonlabel = languageData.sections.global.yesButtonLabel;
    this.transmissionSuccededMessage = languageData.sections.global.transmissionSuccededMessage;
    this.confirmationSystemOffRequestMessage = languageData.sections.global.confirmationSystemOffRequestMessage;
    this.rebootNeededMessage = languageData.sections.global.rebootNeededMessage;
    this.configModes[0].message = languageData.sections.global.yesButtonLabel;
    this.configModes[1].message = languageData.sections.global.noButtonLabel;
  }

}
