import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restart-success-notification',
  templateUrl: './restart-success-notification.component.html',
  styleUrls: ['./restart-success-notification.component.css']
})
export class RestartSuccessNotificationComponent implements OnInit {

  constructor(
    public dialog: MatDialogRef<RestartSuccessNotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,
    private router:Router) { }

    closeDialog(): void {
      this.dialog.close();
      this.router.navigateByUrl('/threats');
    }

  ngOnInit(): void {
  }

}
