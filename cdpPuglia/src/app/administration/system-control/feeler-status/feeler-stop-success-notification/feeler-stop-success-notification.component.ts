import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feeler-stop-success-notification',
  templateUrl: './feeler-stop-success-notification.component.html',
  styleUrls: ['./feeler-stop-success-notification.component.css']
})
export class FeelerStopSuccessNotificationComponent implements OnInit {

  constructor(
    public dialog: MatDialogRef<FeelerStopSuccessNotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,
    private router:Router) { }

    closeDialog(): void {
      this.dialog.close();
      this.router.navigateByUrl('/threats');
    }

  ngOnInit(): void {
  }

}
