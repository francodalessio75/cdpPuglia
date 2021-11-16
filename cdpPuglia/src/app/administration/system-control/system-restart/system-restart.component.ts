import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { RestartConfirmationComponent } from './restart-confirmation/restart-confirmation.component';
import { RestartSuccessNotificationComponent } from './restart-success-notification/restart-success-notification.component';

@Component({
  selector: 'app-system-restart',
  templateUrl: './system-restart.component.html',
  styleUrls: ['./system-restart.component.css']
})
export class SystemRestartComponent implements OnInit {
  checked=2;

  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading.asObservable();

  _loading$ = this.loading$;

  constructor(
    private dialog:MatDialog,
    private router:Router,
    private toastr:ToastrService
  ) {

   }

  

  ngOnInit(): void {
  }

  setChecked(filter: number){
    this.checked=filter;
  }

  restart():void{
    this.dialog
      .open(RestartConfirmationComponent, {
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
    this.dialog.open(RestartSuccessNotificationComponent,{
      data:'Rivisitare la sezione per verificare lo stato del sistema.'
    })
  }

}
