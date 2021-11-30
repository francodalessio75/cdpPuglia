import { Component, Input, OnInit } from '@angular/core';
import { Rule } from 'src/app/_models/rule';
import { ThreatsService } from 'src/app/_services/threats.service';

@Component({
  selector: 'app-rule-data',
  templateUrl: './rule-data.component.html',
  styleUrls: ['./rule-data.component.css']
})
export class RuleDataComponent implements OnInit {

  @Input() rule!:Rule;

  constructor(private threatsService:ThreatsService ) {
    this.threatsService.currentRule$.subscribe(rule => this.rule=rule)
    console.log(this.rule)
   }

  ngOnInit(): void {

    this.threatsService.getRule('');
  }

} 
