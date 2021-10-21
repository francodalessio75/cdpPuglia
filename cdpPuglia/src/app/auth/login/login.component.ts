import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model:any = {};
  loggedIn : boolean = false;
  faCoffee = faCoffee;

  constructor(
    private accountService : AccountService,
    private router:Router,
    private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  login(){
    this.accountService.login(this.model).subscribe(response => {
      console.log(response);
      this.router.navigateByUrl('/threats')
      this.loggedIn = true;
    },
     error => {
       console.log(error);
       this.toastr.error("Autenticazione Fallita");
     });
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
