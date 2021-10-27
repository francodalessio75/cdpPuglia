import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';


@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.component.html',
  styleUrls: ['./change-profile.component.css']
})
export class ChangeProfileComponent implements OnInit {
  model: any = {};
  currentUser: User ={};
  constructor(
    private accountService: AccountService,
    private fb: FormBuilder
  ) { }
  changeProfileForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      ],
    ],
  });
  

  ngOnInit(){
    this.accountService.currentUser$.subscribe(user => {this.currentUser=user});

  }
  changeProfile() {
    this.accountService.changeProfile$(
      this.changeProfileForm.controls.email.value)
      .subscribe(response => {
      console.log(response);
    },
     error => {
       console.log(error);
     });
    console.log(this.model);
  }

}
