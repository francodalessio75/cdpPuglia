import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-restart-confirmation',
  templateUrl: './restart-confirmation.component.html',
  styleUrls: ['./restart-confirmation.component.css']
})
export class RestartConfirmationComponent implements OnInit {

  constructor(
    public dialog: MatDialogRef<RestartConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }

    closeDialog(): void {
      this.dialog.close(false);
    }

    confirmed(): void {
      this.dialog.close(true);
    }

  ngOnInit() {
  }

}
