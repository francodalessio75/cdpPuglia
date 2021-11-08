import { Component, OnInit} from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { AccountService } from 'src/app/_services/account.service';
import { TranslationService } from 'src/app/_services/translation.service';

@Component({
  selector: 'app-threats-diagrams',
  templateUrl: './threats-diagrams.component.html',
  styleUrls: ['./threats-diagrams.component.css']
})
export class ThreatsDiagramsComponent implements OnInit{

  constructor( 
    private accountService : AccountService,
    private translationService:TranslationService){}
      
  public chartType: string = 'line';
  public chartType1: string = 'bar';
  
  
  // public chartDatasets: Array<any> = [
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' },
  //   { data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset' }
  // ];

  // public chartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  // public chartColors: Array<any> = [
  //   {
  //     backgroundColor: 'rgba(105, 0, 132, .2)',
  //     borderColor: 'rgba(200, 99, 132, .7)',
  //     borderWidth: 2,
  //   },
  //   {
  //     backgroundColor: 'rgba(0, 137, 132, .2)',
  //     borderColor: 'rgba(0, 10, 130, .7)',
  //     borderWidth: 2,
  //   }
  // ];

  // public chartOptions: any = {
  //   responsive: true,
  //   scales: {
  //     xAxes: [{
  //       stacked: true
  //       }],
  //     yAxes: [
  //     {
  //       stacked: true,
  //       stepSize: 1,
  //       type: "time",
  //     time: {
  //       parser: "YYYY/MM/DD",
  //       unit: "day",
  //       displayFormats: {
  //         day: "YYYY/MM/DD"
  //       }
  //     },
  //     ticks: {
  //       stepSize: 1,
  //       reverse: true
  //     }       
  //     }
  //   ]
  // }
    
 
  
  // };
  // addTime(){
  //   this.chartLabels1.push('prova');

  // };
  
  // public chartClicked(e: any): void { }
  // public chartHovered(e: any): void { }

  // public chartDatasets1: Array<any> = [
  //   { data: [1,3,4,1,3,0,2], label: 'My First dataset' }
  // ];

  // public chartLabels1: Array<any> = [];
  // public chartLabels2: string='Range Temporale';

  // public chartColors1: Array<any> = [
  //   {
  //     backgroundColor: [
  //       'rgba(255, 99, 132, 0.2)',
  //       'rgba(54, 162, 235, 0.2)',
  //       'rgba(255, 206, 86, 0.2)',
  //       'rgba(75, 192, 192, 0.2)',
  //       'rgba(153, 102, 255, 0.2)',
  //       'rgba(255, 159, 64, 0.2)'
  //     ],
  //     borderColor: [
  //       'rgba(255,99,132,1)',
  //       'rgba(54, 162, 235, 1)',
  //       'rgba(255, 206, 86, 1)',
  //       'rgba(75, 192, 192, 1)',
  //       'rgba(153, 102, 255, 1)',
  //       'rgba(255, 159, 64, 1)'
  //     ],
  //     borderWidth: 2,
  //     barPercentage:0.3,
     
  //   }
  // ];
  // public chartOptions1: any = {
  //   responsive: true,
  //   scales: {
  //     yAxes: [
  //      {
  //          display: true,
  //          ticks: {
  //            fontSize: 28
  //          }
  //      }
  //    ]
  //  }    
  // };
  ngOnInit(){
    // this.translationService.currentLanguage$.subscribe((language)=>{
    //   this.setLanguageData();
    // });
    // this.setLanguageData();
    // let currentMonth = this.barChartLabels[0].split('-')[1]+' '+this.barChartLabels[0].split('-')[2].substring(0,2);
    // this.monthsLabel[0] = currentMonth;
    // for(let i = 1; i < this.barChartLabels.length; i++){
    //   let month = this.barChartLabels[i].split('-')[0];
    //   if(currentMonth != month){
    //     this.monthsLabel[i] = month;
    //     currentMonth = month;
    //   }
    // }
      
    }
  barChartType: ChartType = 'bar';  
  barChartLegend = false;  
  monthsLabel: any[]=[];
//   barChartLabels: any[] = [
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
        distribution: 'linear', //mostra solo i dati disponibili
                
        time: {
          min:'2021-06-04T10:00:00',
          max:'2021-06-04T11:00:00',
          unitStepSize:100,
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
  
  // private setLanguageData(){
  //   let languageData = this.translationService.getCurrentLanguageData();
  //   this.Basso = languageData.sections.global.saveButton;    
  // }
}
