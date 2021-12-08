import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserRole } from 'src/app/enums/UserRoleEnum';
import { User } from 'src/app/_models/user';
import { SpinnerService } from 'src/app/_services/spinner.service';
import { UsersAdministrationService } from 'src/app/_services/users-admin.service';
import { UsersTableComponent } from '../users-table/users-table.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user!:User;
  userRole!:UserRole;

  roles:UserRole[]= [
    UserRole.viewer,
    UserRole.admin,
    UserRole.superadmin
  ]

  constructor( 
    private userAdministrationService:UsersAdministrationService,
    private fb:FormBuilder,
    public dialogRef: MatDialogRef<UsersTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastrService:ToastrService) {

    this.userAdministrationService.currentUser$
      .subscribe( user => {
        this.user = user;
        this.userRole = user.role as UserRole;
      } 
    );

    this.userAdministrationService.userUpdated$.subscribe(
      updated => {
        if(updated){
          this.toastrService.success('USER SAVED SUCCESFULLY');
        }else{
          this.toastrService.error('USER SAVING HAS FAILED');
        }
      }
    );
  }

  userForm = this.fb.group({
    username:'',
    role:'',
    email:['', [Validators.required, Validators.email]],
    active:'',
    created:''
  });

  updateUser(){
    let modifiedUser:User = {};
    modifiedUser = this.user;
    modifiedUser.role = this.userForm.controls["role"].value;
    modifiedUser.email = this.userForm.controls["email"].value;
    this.userAdministrationService.updateUser(modifiedUser);
  }

  ngOnInit(): void {
    this.userAdministrationService.getUser();
    this.userForm.patchValue({
      username:this.user.username,
      role:this.userRole,
      email:this.user.email,
      active:this.user.status,
      created:this.user.created?.toString().substring(0,14),
    });
  }

}
