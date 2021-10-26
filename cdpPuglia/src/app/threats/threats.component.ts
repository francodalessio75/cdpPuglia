import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderService } from '../_services/header.service';

@Component({
  selector: 'app-threats',
  templateUrl: './threats.component.html',
  styleUrls: ['./threats.component.css']
})
export class ThreatsComponent implements OnInit, OnDestroy {
  title = 'Pagina consultazione minacce:';
  description = 'Sezione per consultare grafici ed applicare filtri di ricerca ai reports';

  constructor(private headerService:HeaderService) { }

  ngOnInit(): void {
    this.headerService.setCurrentTitleDescription(this.title, this.description);
  }

  ngOnDestroy(){
    this.headerService.setCurrentTitleDescription('','');
  }
}
