import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog , MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ChangePasswordComponent } from 'src/app/auth/change-password/change-password.component';
import { ChangeProfileComponent } from 'src/app/auth/change-profile/change-profile.component';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { HeaderService } from 'src/app/_services/header.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sideNavToggle = new EventEmitter<void>();

  user:User = {};
  title='';
  description='';

  constructor(public accountService:AccountService, public headerService:HeaderService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe(
      user => this.user = user
    );
    this.headerService.titleDescription$.subscribe(
      ({title, description }) => {
        this.title = title;
        this.description = description;
      }
    )
  }

  onToggleSideNav(){
    this.sideNavToggle.emit();
  }

  logout(){
    this.accountService.logout();
  }
  openChangePassword(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      // width: '250px',
      panelClass: 'trend-dialog',
      height: '65%',
            width: '40%',
      disableClose: true,
      hasBackdrop: true
       
    
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    
    });
  }
  openChangeProfile(): void {
    const dialogRef = this.dialog.open(ChangeProfileComponent, {
      // width: '250px',
      panelClass: 'trend-dialog',
      height: '60%',
      width: '40%',
      disableClose: true,
      hasBackdrop: true
    
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    
    });
  }
}
