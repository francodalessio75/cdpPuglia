import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { Mitre } from 'src/app/_models/mitre';
import { Rule } from 'src/app/_models/rule';
import { Threat } from 'src/app/_models/threat';
import { ThreatsService } from 'src/app/_services/threats.service';

@Component({
  selector: 'app-rule-details',
  templateUrl: './rule-details.component.html',
  styleUrls: ['./rule-details.component.css']
})
export class RuleDetailsComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  
  rule!:Rule;
  ruleDataTitle:string= 'Dati regola';
  technicalDetailsTitle:string= 'Dettagli Tecnici';
  mitreElementsTitle:string= 'Elementi matrice MITRE';
  cveTitle:string= 'CVE';

  elMitreMatrix='';
  threat!:Threat;//?

  mitres!: Mitre[];
  
  constructor(private threatsService: ThreatsService, private router:Router) {

    this.threatsService.currentRule$.subscribe( 
      rule => {
        this.rule=rule;
        this.mitres = this.threatsService.getMitres(this.rule.overview.label);
      });
   }

  ngOnInit(): void {
    this.threatsService.getThreat();//?
    this.threatsService.getRule('');
  }

  backToThreats(){
    this.router.navigateByUrl('threats');
  }

}
