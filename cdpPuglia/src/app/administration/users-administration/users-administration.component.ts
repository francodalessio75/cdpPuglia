import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { ToastrService } from 'ngx-toastr';
import { HasSpinner } from 'src/app/interfaces/hasSpinner';
import { User } from 'src/app/_models/user';
import { SpinnerService } from 'src/app/_services/spinner.service';
import { UsersAdministrationService } from 'src/app/_services/users-admin.service';
import { UserDetailsComponent } from './user-details/user-details.component';

@Component({
  selector: 'app-users-administration',
  templateUrl: './users-administration.component.html',
  styleUrls: ['./users-administration.component.css']
})
export class UsersAdministrationComponent implements OnInit, HasSpinner {
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  loading!:boolean;

  user!:User;
  users!:User[];
  
  constructor(
    private spinnerService:SpinnerService,
    private usersAdministrationService:UsersAdministrationService,
    private toastrService:ToastrService,
    private dialog: MatDialog
  ) 
  {
    this.spinnerService.loading$.subscribe(
      loading => this.loading = loading
    );

    this.usersAdministrationService.currentUsers$.subscribe(
      users => this.users = users
    );
  }

  ngOnInit(): void {
    this.usersAdministrationService.getUsers();
  }
  openUserDetails(){
    // this.usersAdministrationService.setUser(userId);

    const dialogRef = this.dialog.open(UserDetailsComponent, {
      // width: '250px',
      panelClass: 'trend-dialog',
      height: '40%',
      width: '60%',
      disableClose: true,
      hasBackdrop: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
