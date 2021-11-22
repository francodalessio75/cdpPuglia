import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { ConfirmationAlertComponent } from '../confirmation-alert/confirmation-alert.component';
import { SuccessFeedbackComponent } from '../success-feedback/success-feedback.component';

export interface RestartMode{
  value:string,
  message:string
}

@Component({
  selector: 'app-system-restart',
  templateUrl: './system-restart.component.html',
  styleUrls: ['./system-restart.component.css']
})
export class SystemRestartComponent {
  choosenRestartMode!:string;
  
  restartModes:RestartMode[]=[
    {value:'soft', message:'Riavvio Soft (riavvio dei servizi)'},
    {value:'hard', message:'Riavvio Hard (riavvio dell\'appliance)'}
  ];

  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading.asObservable();

  _loading$ = this.loading$;

  constructor(
    private dialog:MatDialog,
    private router:Router,
    private toastr:ToastrService
  ) {

   }

  restart():void{
    this.dialog
      .open(ConfirmationAlertComponent, {
        data: 'Il riavvio del sistema comporta una interruzione di operativita\' . Confermare l\'operazione?'
      })
      .afterClosed()
      .subscribe((confirmed: Boolean) => {
        this._loading.next(true);
        if (confirmed) {
          setTimeout(() => {
            this.spinnerSimulation();
            this._loading.next(false);
          }, 3000);
        } else {
          this.toastr.info("Operazione Annulata");
        }
      });
  }

  spinnerSimulation(){
    this.dialog.open(SuccessFeedbackComponent,{
      data:'Rivisitare la sezione per verificare lo stato del sistema.'
    })
  }

}
