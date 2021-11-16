import { Component, OnInit, Output } from '@angular/core';
import { Feeler } from 'src/app/_models/feeler';
import { SystemControlService } from 'src/app/_services/system-control.service';

@Component({
  selector: 'app-system-control',
  templateUrl: './system-control.component.html',
  styleUrls: ['./system-control.component.css']
})
export class SystemControlComponent implements OnInit {
  feeler!:Feeler;

  constructor(private systemControlService : SystemControlService) {
    this.systemControlService.currentFeeler$.subscribe(
      feeler => this.feeler = feeler
    );
   }

  ngOnInit(): void {
    this.systemControlService.getFeeler();
  }

}
