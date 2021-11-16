import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-feeler-stop-confirmation',
  templateUrl: './feeler-stop-confirmation.component.html',
  styleUrls: ['./feeler-stop-confirmation.component.css']
})
export class FeelerStopConfirmationComponent implements OnInit {

  constructor(
    public dialog: MatDialogRef<FeelerStopConfirmationComponent>,
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
