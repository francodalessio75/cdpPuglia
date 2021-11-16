import { Component, Input, OnInit } from '@angular/core';
import { Feeler } from 'src/app/_models/feeler';
import { SystemControlService } from 'src/app/_services/system-control.service';
import { MatDialog } from '@angular/material/dialog';
import { FeelerStopConfirmationComponent } from './feeler-stop-confirmation/feeler-stop-confirmation.component';
import { FeelerStopSuccessNotificationComponent } from './feeler-stop-success-notification/feeler-stop-success-notification.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-feeler-status',
  templateUrl: './feeler-status.component.html',
  styleUrls: ['./feeler-status.component.css']
})
export class FeelerStatusComponent implements OnInit {
  @Input() feeler!:Feeler

  constructor(
    private systemControlService : SystemControlService,
    private dialog:MatDialog,
    private toastr:ToastrService) {
   }

   ngOnInit(): void {
  }

  stopFeeler(){
     this.dialog
      .open( FeelerStopConfirmationComponent,{
        data: 'L\'arresto del sistema comporta una interruzione di operativita\' . Confermare l\'operazione?'
      })
      .afterClosed()
      .subscribe((confirmed:Boolean) => {
        if(confirmed){
          this.systemControlService.stopFeeler();
          this.dialog.open(FeelerStopSuccessNotificationComponent,{
            data:'Rivisitare la sezione per verificare lo stato del sistema.'
        })
      }else {
        this.toastr.info("Operazione Annulata");
      }
    });
  }
}
