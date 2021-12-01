import { Component, Input, OnInit } from '@angular/core';
import { Rule } from 'src/app/_models/rule';
import { ThreatsService } from 'src/app/_services/threats.service';

@Component({
  selector: 'app-tecnical-details',
  templateUrl: './tecnical-details.component.html',
  styleUrls: ['./tecnical-details.component.css']
})
export class TecnicalDetailsComponent implements OnInit {
  
  @Input() rule!:Rule;

  constructor(private threatsService:ThreatsService ) {
    this.threatsService.currentRule$.subscribe(rule => this.rule=rule)
    console.log(this.rule)
   }

  ngOnInit(): void {

    this.threatsService.getRule('');

  }

}
