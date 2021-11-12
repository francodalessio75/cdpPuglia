import { Component, OnInit } from '@angular/core';
import { ThreatsService } from 'src/app/_services/threats.service';

@Component({
  selector: 'app-threats-search-parameters',
  templateUrl: './threats-search-parameters.component.html',
  styleUrls: ['./threats-search-parameters.component.css']
})
export class ThreatsSearchParametersComponent implements OnInit {
  checked=1;
  
  constructor(
    private threatsService: ThreatsService) { }

  ngOnInit(): void {
  }

  getThreats(){
    this.threatsService.getThreats(this.checked);
  }

  setChecked(filter: number){
    this.checked=filter;
  }

}
