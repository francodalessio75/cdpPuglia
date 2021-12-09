import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Language } from 'src/app/enums/LanguagesEnum';
import { Translatable } from 'src/app/interfaces/translatable';
import { Feeler } from 'src/app/_models/feeler';
import { LanguageData } from 'src/app/_models/languageData';
import { NTP } from 'src/app/_models/NTP';
import { Timezone } from 'src/app/_models/timezone';
import { SystemControlService } from 'src/app/_services/system-control.service';
import { TranslationService } from 'src/app/_services/translation.service';
import { ConfirmationAlertComponent } from '../confirmation-alert/confirmation-alert.component';
import { SuccessFeedbackComponent } from '../success-feedback/success-feedback.component';
import * as timezones from './timeZones.json';

@Component({
  selector: 'app-manualtime-setting',
  templateUrl: './manualtime-setting.component.html',
  styleUrls: ['./manualtime-setting.component.css']
})
export class ManualtimeSettingComponent implements Translatable {
  @Input() feeler!:Feeler;

  ntp!:NTP;

  languageData!:LanguageData;
  language!:Language;
  confirmationSystemOffRequestMessage!:string;
  transmissionSuccededMessage!:string;
  configureButtonLabel!:string;
  rebootNeededMessage!:string;
  timezoneLabel!:string;
  dateLabel!:string;
  timeLabel!:string;

  timezonesData : any = (timezones as any ).default;
  timezones : Timezone[] = this.timezonesData;


  displayedColumns:string[] = ['timezone','date', 'time'];

  tableHeaders:string[] = [];

  dataSource:string[] = ['timeSettings'];
  
  constructor(
    private dialog : MatDialog,
    private toastr:ToastrService,
    private translationService:TranslationService,
    private systemControlService:SystemControlService,
    private formBuilder:FormBuilder
  ) {
    this.translationService.currentLanguage$.subscribe(
      language => {
        this.language = language;
        this.translationService.getCurrentLanguageData();
        this.setLanguageData(this.languageData);
      }
    );
    this.systemControlService.currentFeeler$.subscribe(
      feeler => this.feeler = feeler
    );
    this.systemControlService.currentNTP$.subscribe(
      ntp => this.ntp = ntp
    );
  }

  timeForm = this.formBuilder.group({
    timezone:['',Validators.required],
    datetime:['',Validators.required],
    time:['',Validators.required]
  });

  ngOnInit(){
    this.systemControlService.getNTP();
    this.languageData = this.translationService.getCurrentLanguageData();
    this.setLanguageData(this.languageData);
    this.timeForm.patchValue({
      timezone:this.ntp.timezone,
      datetime:this.ntp.datetime?.substring(0,14),
      time:this.ntp.datetime?.substring(5,14)
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
        this.systemControlService.setNTPTimeAndTimeZone('','');
        this.dialog.open(SuccessFeedbackComponent,{
          hasBackdrop:true,
          disableClose:true,
          data:this.transmissionSuccededMessage + 
               '\n'+this.rebootNeededMessage
        })
      }
      else
      {
        this.toastr.info("Operazione Annulata");
      }
    })
  }

  setLanguageData(languageData:LanguageData){
    this.configureButtonLabel = languageData.sections.global.configureButtonLabel;
    this.confirmationSystemOffRequestMessage = languageData.sections.global.confirmationSystemOffRequestMessage;
    this.transmissionSuccededMessage = languageData.sections.global.transmissionSuccededMessage;
    this.rebootNeededMessage = languageData.sections.global.rebootNeededMessage;
    this.timezoneLabel = languageData.sections.global.timezoneLabel;
    this.dateLabel = languageData.sections.global.dateLabel;
    this.timeLabel = languageData.sections.global.timeLabel;
  }
}
