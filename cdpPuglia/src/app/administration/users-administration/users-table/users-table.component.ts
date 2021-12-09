import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Translatable } from 'src/app/interfaces/translatable';
import { LanguageData } from 'src/app/_models/languageData';
import { User } from 'src/app/_models/user';
import { TranslationService } from 'src/app/_services/translation.service';
import { UsersAdministrationService } from 'src/app/_services/users-admin.service';
import { UserDetailsComponent } from '../user-details/user-details.component';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit, Translatable {
  @Input() users!:User[];

  languageData!: LanguageData;

  displayedColumns = [
    'username',
    'email',
    'role',
    'active',
    'created',
    'actions'
  ]

  dataSource: MatTableDataSource<User> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( 
    private translationService : TranslationService,
    private usersAdministrationService:UsersAdministrationService,
    private dialog: MatDialog,
    private toastrService:ToastrService )
  { 

    this.translationService.currentLanguage$.subscribe((language) => {
      this.languageData = this.translationService.getCurrentLanguageData();
      this.setLanguageData(this.languageData);
    });

    this.usersAdministrationService.currentUsers$.subscribe(
      users => {
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.users = users;
        console.log(users);
      }
    );

    this.usersAdministrationService.userDeleted$.subscribe(
      deleted => {
        if(deleted){
          this.toastrService.success('USER SUCCESFULLY DELETED');
        }else{
          this.toastrService.error('USER DELETING HAS FAILED')
        }
      }
    );
  }
  
  ngOnInit() {
    this.usersAdministrationService.getUsers();
    this.languageData = this.translationService.getCurrentLanguageData();
    this.setLanguageData(this.languageData);
  }

  deleteUser(userId:string){
    this.usersAdministrationService.deleteUser(userId);
  }


  openUserDetails(userId:string){
    this.usersAdministrationService.setUser(userId);

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

  resetPassword(id:string){}

  setLanguageData(languageData: LanguageData): void {
    return
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
