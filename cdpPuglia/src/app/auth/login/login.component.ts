import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model:any = {};
  loggedIn : boolean = false;
  loginForm! : FormGroup;

  constructor(
    private accountService : AccountService,
    private router:Router,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.intializeForm();
  }

  intializeForm(){
    this.loginForm = new FormGroup({
      username: new FormControl('',Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4)] )
    });
  }

  matchValues(matchTo:string) : ValidatorFn {
    return (control: AbstractControl | any ) => {
      return control?.value === control?.parent?.controls[matchTo].value
      ? null
      : {isMatching:true}
    }
  }

  login(){
    this.model.username = this.loginForm.value.username;
    this.model.password = this.loginForm.value.password;
    console.log(this.model);
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
