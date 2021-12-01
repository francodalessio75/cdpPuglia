import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
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
  threat!:Threat;

  mitre!: string[];
  
  constructor(private threatsService: ThreatsService, private router:Router) {

    this.threatsService.currentRule$.subscribe( rule => this.rule=rule);
   }

  ngOnInit(): void {
    this.threatsService.getThreat();
    this.threatsService.getRule('');
    this.mitre = this.threatsService.getMitre('');

  }

  backToThreats(){
    this.router.navigateByUrl('threats');
  }

}
