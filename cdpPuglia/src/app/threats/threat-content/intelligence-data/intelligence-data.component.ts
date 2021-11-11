import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Severity } from 'src/app/enums/SeverityEnum';
import { Threat } from 'src/app/_models/threat';
import { ThreatsService } from 'src/app/_services/threats.service';

interface Intelligence{
  id?:number;
  ioc?:string;
  description?:string;
  threathLevel?:Severity;
}

@Component({
  selector: 'app-intelligence-data',
  templateUrl: './intelligence-data.component.html',
  styleUrls: ['./intelligence-data.component.css']
})
export class IntelligenceDataComponent {
  @Input()intelligence:Intelligence[] = [{}];

  displayedColumns=[
    'id',
    'ioc',
    'descritpion',
    'threathLevel'
  ];

  dataSource:MatTableDataSource<Intelligence> = new MatTableDataSource();

  constructor(
    private threatService:ThreatsService,
    private router:Router) {
    this.threatService.currentThreat$.subscribe(threat =>{
      if(threat.intelligence){
        this.intelligence = threat.intelligence as Intelligence[];
        this.dataSource = new MatTableDataSource(this.intelligence);
      } 
    });
  }

  backToThreats(){
    this.router.navigateByUrl('threats');
  }
}
