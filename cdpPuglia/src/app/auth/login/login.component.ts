import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model:any = {};

  loginForm = this.fb.group({
    username: ['',Validators.required],
    password: ['',Validators.required]
  });

  
  constructor(
    private accountService : AccountService,
    private router:Router,
    private fb:FormBuilder) { }


  login(){
    this.model.username = this.loginForm.value.username;
    this.model.password = this.loginForm.value.password;
    this.accountService.getToken$(this.model).subscribe(response => {
      this.accountService.getRole$().subscribe(userData => {
        this.router.navigateByUrl('/threats');
      }, error => {
        console.log(error);
        this.router.navigateByUrl('/threats');
      })
    },
     error => {
       console.log(error);
     });
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
