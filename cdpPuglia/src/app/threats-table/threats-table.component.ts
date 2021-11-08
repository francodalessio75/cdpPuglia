import { Component, OnInit } from '@angular/core';
import { Threat } from '../_models/threat';
import { ThreatsService } from '../_services/threats.service';

@Component({
  selector: 'app-threats-table',
  templateUrl: './threats-table.component.html',
  styleUrls: ['./threats-table.component.css']
})
export class ThreatsTableComponent implements OnInit {
  threats:Threat[] = [];
  columnsToDisplay:string[]=[
    'TimeStamp',
    'Identificativo',
    'IPSorgente',
    'IPDestinatario',
    'NomeRegola',
    'TipoRegola',
    'Gravita'
  ]

  constructor(
    public threatsService:ThreatsService
  ) { }

  ngOnInit(): void {
    this.threatsService.currentThreats$.subscribe(threats =>{
      this.threats = threats;
      console.log(threats);
    });
  }

  getThreats(filter:number){
    this.threatsService.getThreats(filter);
  }
}
