import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Severity } from 'src/app/enums/SeverityEnum';
import { ThreatsService } from 'src/app/_services/threats.service';

@Component({
  selector: 'app-threats-filters',
  templateUrl: './threats-filters.component.html',
  styleUrls: ['./threats-filters.component.css']
})
export class ThreatsFiltersComponent implements OnInit {
  selectedOption='undefined';
  filterForm: FormGroup = this.fb.group({
    severity: [''],
    ipSrc: [''],
    ipDst: [''],
    label: ['']
  });

  constructor( 
    private fb:FormBuilder,
    private threatsService:ThreatsService) { }

  ngOnInit(): void {
  }

  filter(){
    this.threatsService.filterThreats(
      this.filterForm.value.severity,
      this.filterForm.value.ipSrc,
      this.filterForm.value.ipDst,
      this.filterForm.value.label,
    );
  }

  resetFilters(){
    this.filterForm.reset();
    // this.filterForm.value.severity = 'undefined';
    // this.filterForm.value.ipSrc = '';
    // this.filterForm.value.ipDst = '';
    // this.filterForm.value.label = '';
    this.selectedOption='undefined';

    this.filter();
  }
}
