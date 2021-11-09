import { Component, OnInit} from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Severity } from 'src/app/enums/SeverityEnum';
import { Threat } from 'src/app/_models/threat';
import { AccountService } from 'src/app/_services/account.service';
import { ThreatsService } from 'src/app/_services/threats.service';
import { TranslationService } from 'src/app/_services/translation.service';

@Component({
  selector: 'app-threats-diagrams',
  templateUrl: './threats-diagrams.component.html',
  styleUrls: ['./threats-diagrams.component.css']
})
export class ThreatsDiagramsComponent implements OnInit{
  threats!: Threat[];

  constructor( 
    private translationService:TranslationService,
    private threatsService: ThreatsService,
    ){
      this.threatsService.currentThreats$.subscribe(threats => {
        this.feedDiagram(threats);
      });
    }
      
  public chartType: string = 'line';
  public chartType1: string = 'bar';
  
  private feedDiagram(threats: Threat[]){
    this.bubbleChartData=[];
    for(let threat of threats){
      this.bubbleChartData.push(
        {data:{
          x: threat.ts,
          y: this.getSeverityValue(threat.severity)
        }
        }
      )
    }
  }

  private getSeverityValue(severity: Severity | undefined): number{
    switch(severity){
      case Severity.low: return 1;
      case Severity.medium: return 2;
      case Severity.high: return 3;
      case Severity.critical: return 4;
      default: return 1;
    }
  }
  
  
  ngOnInit(){
    this.threatsService.getThreats(-1);
      
    }
  barChartType: ChartType = 'bar';  
  barChartLegend = false;  
  monthsLabel: any[]=[];
  
  public bubbleChartData: any[] = [
    {data: [{ x: '2021-06-04T10:10:00', y: 2}]},
    {data: [{ x: '2021-06-04T10:10:00', y: 1}]},
    {data: [{ x: '2021-06-04T10:10:00', y: 1}]},
    {data: [{ x: '2021-06-04T10:10:00', y: 1}]},
    {data: [{ x: '2021-06-04T10:10:00', y: 1}]},
    {data: [{ x: '2021-06-04T10:10:00', y: 1}]},
    {data: [{ x: '2021-06-04T10:10:00', y: 1}]},
    {data: [{ x: '2021-06-04T10:10:00', y: 1}]},
    
  ];
  
  barChartData: any[] = [
    {
      data: [1,2,1, 1, 4],label:'First',
      backgroundColor: ['brown','yellow','blue', 'red', 'green'],
      hoverBackgroundColor: ['green', 'red', 'green', 'red']},
      {
        data: [1,2,1, 1, 4],label:'First',
        backgroundColor: ['','yellow','blue', 'red', 'green'],
        hoverBackgroundColor: ['green', 'red', 'green', 'red']},
      
    
  
  ];
  barChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      callbacks: {
        label: function(tooltipItem) {
          return 'x';
        },
        // label: bubbleChartData => ''+bubbleChartData[1].y ,
        labelColor: tooltipItem => {
          let color = tooltipItem.yLabel == 1 ? 'red' : 'green';
          return { borderColor: color, backgroundColor: color };
        }
      }
    },
    scales: {
      xAxes: [{  
        stacked: true,
        gridLines: {
          // offsetGridLines: true offsetGridLines (boolean) If true, labels are shifted to be between grid lines.
      },
          ticks:{ 
            
      // callback : (label, index) => {
      //   return this.monthsLabel[index] ? this.monthsLabel[index] : '';
      // }
    },    
        type: 'time',
        offset: false,
        distribution: 'series', //mostra solo i dati disponibili
                
        time: {
          // min:this.bubbleChartData[0].x,
          max:this.bubbleChartData[3].x,
          stepSize:10000,
          unit: 'second',
          tooltipFormat: 'DD mm ss', //tooltip
          displayFormats: {                                
            second: 'hh:mm:ss',
        }
          // unit: 'month'
          //unit :'hour'
        }
        
      }],
      yAxes: [{
        ticks: {
          max:4,
          beginAtZero: true,
          stepSize: 1,
          callback: value => {
            /* Severity */
            switch(value){
            case 1:{
              return 'Basso';
            }
            case 2:{
              return 'Medio';
            }
            case 3:{
              return 'Alto';
            }
            case 4:{
              return 'Critico';
            } default: return '';
          }
          }
        }
      }]
    }
  };

}
