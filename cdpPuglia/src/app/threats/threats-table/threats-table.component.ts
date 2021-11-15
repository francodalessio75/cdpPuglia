import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {  Router } from '@angular/router';
import { Threat } from '../../_models/threat';
import { ThreatsService } from '../../_services/threats.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { TranslationService } from 'src/app/_services/translation.service';

interface CSVModel{
  ts?:string;
  threatId?:string;
  ipSrc?:string;
  ipDst?:string;
  label?:string;
  typeRule?:string;
  severity?:string;
}

@Component({
  selector: 'app-threats-table',
  templateUrl: './threats-table.component.html',
  styleUrls: ['./threats-table.component.css']
})
export class ThreatsTableComponent {
  csvData!:CSVModel[];
  ipSrc='';
  ipDst='';
  nameRule='';
  typeRule='';
  severity='';
  export='';

  displayedColumns=[
    'ts',
    'threatId',
    'ipSrc',
    'ipDst',
    'label',
    'typeRule',
    'severity'
  ];

  @Input() threats!:Threat[];

  dataSource:MatTableDataSource<Threat> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public threatsService:ThreatsService,
    private translationService:TranslationService,
    public router:Router) {
    this.threatsService.currentThreats$.subscribe(threats =>{
      this.dataSource = new MatTableDataSource(threats);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.threats = threats;
      console.log(threats);
    });
    
  }
  ngOnInit(){
    this.translationService.currentLanguage$.subscribe((language)=>{
      this.setLanguageData();
    });
    this.setLanguageData();
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

  getThreats(filter:number){
    this.threatsService.getThreats(filter);
  }

  getThreatContent(threatId:string){
    this.threatsService.setThreat(+threatId);
    this.router.navigateByUrl('/threat-content');
  }

  private setCSVData(){
    this.csvData = [];
    let header:CSVModel = {
      ts:'TIME-STAMP',
      threatId:'ID',
      ipSrc:'IP SORGENTE',
      ipDst:'IP DESTINAZIONE',
      label:'NOME REGOLA',
      typeRule:'TIPO REGOLA',
      severity:'GRAVITA\''
    }
    this.csvData.push(header);
    for( let threat of this.threats ){
      let row:CSVModel = {};
      row.ts = threat.ts;
      row.threatId = threat.threatId+'';
      row.ipSrc = threat.ipSrc;
      row.ipDst = threat.ipDst;
      row.label = threat.label;
      row.typeRule = threat.typeRule;
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

    new ngxCsv(this.csvData,'threatsReport', options);
  }
  private setLanguageData(){
    let languageData = this.translationService.getCurrentLanguageData();
    this.ipSrc = languageData.sections.threats.threatFilters.ipSource;
    this.ipDst = languageData.sections.threats.threatFilters.ipDestination;
    this.nameRule = languageData.sections.threats.threatContent.threatData.ruleName;
    this.typeRule = languageData.sections.threats.threatContent.threatData.typeRule;
    this.severity = languageData.sections.threats.threatContent.threatData.severity;
    this.export = languageData.sections.threats.threatTable.export;  
  }
  
}
