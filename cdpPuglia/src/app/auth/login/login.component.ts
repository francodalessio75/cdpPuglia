import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { HeaderService } from 'src/app/_services/header.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{
  model:any = {};

  title = 'Pagina di Login: ';
  description = 'Form di autenticazione per accesso al sistema';

  loginForm = this.fb.group({
    username: ['',Validators.required],
    password: ['',Validators.required]
  });

  
  constructor(
    private accountService : AccountService,
    private router:Router,
    private fb:FormBuilder,
    private headerService:HeaderService) { }

    ngOnInit(){
      this.headerService.setCurrentTitleDescription(this.title, this.description);
    }


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

  ngOnDestroy(){
    this.headerService.setCurrentTitleDescription('','');
  }
}
