import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model:any = {};
  loggedIn : boolean = false;

  loginForm = this.fb.group({
    username: ['',Validators.required],
    password: ['',[
      Validators.required,
      Validators.minLength(4),
      this.passwordStrengthValidator()
      ]
    ]
  });

  passwordStrengthValidator():ValidatorFn{
    return (control:AbstractControl):ValidationErrors | null => {
      const value = control.value;

      if(!value)
        return null;

        const hasUpperCase = /[A-Z]+/.test(value);

        const hasLowerCase = /[a-z]+/.test(value);

        const hasNumeric = /[0-9]+/.test(value);

        const hasSpecialChar = /[!@#$%^&*]+/.test(value);

        const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;

        return !passwordValid ? {passwordStrength:true}: null;
    }
  }

  constructor(
    private accountService : AccountService,
    private router:Router,
    private toastr:ToastrService,
    private fb:FormBuilder) { }

  // ngOnInit(): void {
  //   this.intializeForm();
  // }

  // intializeForm(){
  //   this.loginForm = new FormGroup({
  //     username: new FormControl('',Validators.required),
  //     password: new FormControl('', [Validators.required, Validators.minLength(1),Validators.pattern("([a-z])([A-Z])([\d])([!@#$%^&*])")])
  //   })
  // }

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
    // this.accountService.login(this.model).subscribe(response => {
    //   console.log(response);
    //   this.router.navigateByUrl('/threats')
    //   this.loggedIn = true;
    // },
    //  error => {
    //    console.log(error);
    //    this.toastr.error("Autenticazione Fallita");
    //  });
    this.accountService.login(this.model);
    this.router.navigateByUrl('/threats');
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
