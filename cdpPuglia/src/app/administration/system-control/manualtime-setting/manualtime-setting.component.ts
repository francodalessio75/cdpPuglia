import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Language } from 'src/app/enums/LanguagesEnum';
import { Translatable } from 'src/app/interfaces/translatable';
import { Feeler } from 'src/app/_models/feeler';
import { LanguageData } from 'src/app/_models/languageData';
import { Timesetting } from 'src/app/_models/timeSetting';
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
  @Input() feeler!: Feeler;

  timesetting!: Timesetting;

  languageData!: LanguageData;
  language!: Language;
  confirmationSystemOffRequestMessage!: string;
  transmissionSuccededMessage!: string;
  configureButtonLabel!: string;
  rebootNeededMessage!: string;
  timezoneLabel!: string;
  dateLabel!: string;
  timeLabel!: string;

  timezonesData: any = (timezones as any).default;
  timezones: Timezone[] = this.timezonesData;
  timezone!: string;

  formattedDateValue!: any;
  formattedTimeValue!: string;
  dateIsoValue!: string;

  displayedColumns: string[] = ['timezone', 'date', 'time'];

  tableHeaders: string[] = [];

  dataSource: string[] = ['timeSettings'];
  dataFormat!: string;

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private translationService: TranslationService,
    private systemControlService: SystemControlService,
    private formBuilder: FormBuilder
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
    this.systemControlService.currentTIMESETTING$.subscribe(
      timesetting => {
        this.timesetting = timesetting
        this.formatFormValues(this.timesetting?.datetime);
        this.timeForm.setValue({
          timezoneControl: this.timesetting.timezone,
          dateControl: this.formattedDateValue,
          timeControl: this.formattedTimeValue
        });
      }
    );
  }

  timeForm = this.formBuilder.group({
    timezoneControl: ['', Validators.required],
    dateControl: ['', Validators.required],
    timeControl: ['', Validators.required]
  });

  ngOnInit() {
    this.systemControlService.getTIMESETTING();
    this.languageData = this.translationService.getCurrentLanguageData();
    this.setLanguageData(this.languageData);
  }

  formatFormValues(datetimeValue: string | undefined) {
    const dateAndTime = datetimeValue!.split('T')
    this.formattedDateValue = dateAndTime[0];
    this.formattedTimeValue = dateAndTime[1].substring(0, 8);
  }


  dateToIso8601() {
    let convertDate = this.timeForm.controls.dateControl.value;
    convertDate = convertDate.split("-").reverse().join(".");
    const convertTime = this.timeForm.controls.timeControl.value.substring(1, 8);
    this.dateIsoValue = `${convertDate} ${convertTime}`
  }


  configure() {
    this.dialog.open(
      ConfirmationAlertComponent, {
      hasBackdrop: true,
      disableClose: true,
      data: this.confirmationSystemOffRequestMessage
    }
    )
      .afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
         this.dateToIso8601();
         this.systemControlService.setDateTimeAndTimeZone(this.dateIsoValue,this.timeForm.controls.timezoneControl.value);
          this.dialog.open(SuccessFeedbackComponent, {
            hasBackdrop: true,
            disableClose: true,
            data: this.transmissionSuccededMessage +
              '\n' + this.rebootNeededMessage
          })
        }
        else {
          this.toastr.info("Operazione Annulata");
        }
      })
  }

  setLanguageData(languageData: LanguageData) {
    this.configureButtonLabel = languageData.sections.global.configureButtonLabel;
    this.confirmationSystemOffRequestMessage = languageData.sections.global.confirmationSystemOffRequestMessage;
    this.transmissionSuccededMessage = languageData.sections.global.transmissionSuccededMessage;
    this.rebootNeededMessage = languageData.sections.global.rebootNeededMessage;
    this.timezoneLabel = languageData.sections.global.timezoneLabel;
    this.dateLabel = languageData.sections.global.dateLabel;
    this.timeLabel = languageData.sections.global.timeLabel;
  }
}
