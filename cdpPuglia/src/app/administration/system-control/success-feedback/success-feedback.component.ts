import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-feedback',
  templateUrl: './success-feedback.component.html',
  styleUrls: ['./success-feedback.component.css']
})
export class SuccessFeedbackComponent implements OnInit {

  constructor(
    public dialog: MatDialogRef<SuccessFeedbackComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,
    private router:Router) { }

    closeDialog(): void {
      this.dialog.close();
      this.router.navigateByUrl('/threats');
    }

  ngOnInit(): void {
  }

}
