import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../_services/header.service';

@Component({
  selector: 'app-threats',
  templateUrl: './threats.component.html',
  styleUrls: ['./threats.component.css']
})
export class ThreatsComponent implements OnInit {
  title='Threats: ';
  description='Sezione di consultazione dei grafici e dei reports delle minacce';
  
  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.setCurrentTitleDescription(this.title, this.description);
  }
  
  ngOnDestroy(){
    this.headerService.setCurrentTitleDescription('','');
  }
}
