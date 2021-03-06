import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Threat } from '../../_models/threat';
import { ThreatsService } from '../../_services/threats.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { TranslationService } from 'src/app/_services/translation.service';
import { Translatable } from 'src/app/interfaces/translatable';
import { LanguageData } from 'src/app/_models/languageData';

interface CSVModel {
  ts?: string;
  threatId?: string;
  ipSrc?: string;
  ipDst?: string;
  label?: string;
  ruleType?: string;
  severity?: string;
}

@Component({
  selector: 'app-threats-table',
  templateUrl: './threats-table.component.html',
  styleUrls: ['./threats-table.component.css'],
})
export class ThreatsTableComponent implements Translatable {
  csvData!: CSVModel[];
  ipSrc = '';
  ipDst = '';
  ruleName = '';
  ruleType = '';
  severity = '';
  export = '';

  displayedColumns = [
    'ts',
    'threatId',
    'ipSrc',
    'ipDst',
    'label',
    'ruleType',
    'severity',
  ];

  @Input() threats!: Threat[];

  dataSource: MatTableDataSource<Threat> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  languageData!:LanguageData;

  constructor(
    public threatsService: ThreatsService,
    private translationService: TranslationService,
    public router: Router
  ) 
  {

    this.threatsService.currentThreats$.subscribe((threats) => {
      this.dataSource = new MatTableDataSource(threats);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.threats = threats;
      console.log(threats);
    });

    this.translationService.currentLanguage$.subscribe((language) => {
      this.languageData = this.translationService.getCurrentLanguageData();
      this.setLanguageData(this.languageData);
    });

  }

  ngOnInit() {
    this.languageData = this.translationService.getCurrentLanguageData();
    this.setLanguageData(this.languageData);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getThreats(filter: number) {
    this.threatsService.getThreats(filter);
  }

  getRuleDetails(ruleId: string) {
    // console.log(ruleId);
    this.threatsService.getRule(ruleId);
    this.router.navigateByUrl('/rule-details');
  }


  getThreatContent(threatId: string) {
    this.threatsService.setThreat(+threatId);
    this.router.navigateByUrl('/threat-content');
  }

  private setCSVData() {
    this.csvData = [];
    let header: CSVModel = {
      ts: 'TIME-STAMP',
      threatId: 'ID',
      ipSrc: 'IP SORGENTE',
      ipDst: 'IP DESTINAZIONE',
      label: 'NOME REGOLA',
      ruleType: 'TIPO REGOLA',
      severity: "GRAVITA'",
    };
    this.csvData.push(header);
    for (let threat of this.threats) {
      let row: CSVModel = {};
      row.ts = threat.ts;
      row.threatId = threat.threatId + '';
      row.ipSrc = threat.ipSrc;
      row.ipDst = threat.ipDst;
      row.label = threat.label;
      row.ruleType = threat.ruleType;
      row.severity = threat.severity;
      this.csvData.push(row);
    }
  }

  downloadCSV(filename: string) {
    this.setCSVData();

    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Filtered Threats Report',
      useBom: true,
      noDownload: false,
    };

    new ngxCsv(this.csvData, 'threatsReport', options);
  }
  
  setLanguageData(languageData:LanguageData) {
    this.ipSrc = languageData.sections.threats.threatFilters.ipSource;
    this.ipDst = languageData.sections.threats.threatFilters.ipDestination;
    this.ruleName =
      languageData.sections.threats.threatContent.threatData.ruleName;
    this.ruleType =
      languageData.sections.threats.threatContent.threatData.ruleType;
    this.severity =
      languageData.sections.threats.threatContent.threatData.severity;
    this.export = languageData.sections.threats.threatTable.export;
  }
}
