import { BLACK_ON_WHITE_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';
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
  dayMonth: string='DD/MMMM';
  public currentMonth:string='';
 
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
        {data:[{
          x: threat.ts,
          y: this.getSeverityValue(threat.severity)
        }],legend:''+threat.label,
        backgroundColor:"black"
        }
      );
      // this.barChartLabels.push(''+threat.ts)
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
barChartLabels!: string[];
//   '2021-06-04T10:10:00',
//   '2021-06-04T10:10:01',
//   '2021-06-04T10:11:03+02:00',
//   '2021-06-04T10:13:03+02:00',
//   '2021-06-04T10:14:03+02:00',
//   '2021-06-04T10:15:03+02:00',
//   '2021-06-04T10:20:03+02:00',
//   '2021-06-04T10:22:03+02:00',
//   '2021-06-04T10:33:03+02:00',
// ];
  //barChartLabels: Label[] = ['2021-06-04T12:00:00+02:00', '2021-06-04T13:00:00+02:00', '2021-06-04T14:00:00+02:00'];
  // Month barChartLabels: Label[] = ['2021-07-04T12:00:00+02:00', '2021-08-04T13:00:00+02:00', '2021-09-04T14:00:00+02:00'];
  // Day barChartLabels: Label[] = ['2021-07-04T12:00:00+02:00', '2021-08-04T13:00:00+02:00', '2021-09-04T14:00:00+02:00'];
  
  
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
legend:{
  position:'right'
},
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
        
        // offset: true,
        stacked: true,
        gridLines: {
          display: false// offsetGridLines (boolean) If true, labels are shifted to be between grid lines.
      },
          ticks:{ 
            // max:'2021-11-08T00:59:47',
            // min:'2021-11-08T00:00:47',
              
            autoSkip: true,
           
            // callback:function(label:any,currentMonth):any{
            //   if(currentMonth!==label){ 
            //     currentMonth===label.split('-')[0];
            //     return 'boh' +currentMonth;
            //   }
            //   else return 'aah';
            // },
          //   autoSkip: true,
          //maxTicksLimit:1,
          // maxRotation: 0,
          // minRotation: 0,
          //   display: true,
            // maxTicksLimit: 7,
      // callback : (label:string) => {
      //   if(this.currentMonth!=label.split(' ')[1]) {
      //     console.log(this.currentMonth);
      //     this.currentMonth=='prova'+label.split(' ')[1];
      //   console.log(label);
      //   console.log(this.currentMonth);
      //   return 'prova';}
      //   else 
      //   return 'a';

        
      // }
    },    
        type: 'time',
        
        distribution: 'series', //mostra solo i dati disponibili
        
        time: {
         
        unit: 'second',
          // min:this.bubbleChartData[0].x,
          // max:this.bubbleChartData[this.bubbleChartData.length-1].x,
          
         
           unitStepSize: 5,
        //   tooltipFormat: 'DD mm ss', //tooltip
          displayFormats: {
            
            //day:'MMM DD',
            // 'month': 'MMM DD',                                
            second: 'hh:mm'
        },
        scaleLabel: {
          display: true,
          labelString: 'Date'
        }
      //   scaleLabel: {
      //     display: true,
      //     labelString: 'value'
      // }     
          // unit: 'month'
          //unit :'hour'
        }
        
      },
      {
        id: 'xAxis2',
        type: '',
        time:{
          // unit: 'second',
          displayFormats: {
            
            //day:'MMM DD',
            // 'month': 'MMM DD',                                
            second: 'MMM DD'
        },
        },ticks:{
          maxTicksLimit:1, 
        },
        gridLines: {
            offsetGridLines: true
        },
        scaleLabel: {
            display: false,
            labelString: 'Day of Year'
        }
    }
     ],
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
