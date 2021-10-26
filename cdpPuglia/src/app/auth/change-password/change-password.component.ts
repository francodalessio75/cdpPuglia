import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { ErrorStateMatcher } from '@angular/material/core';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);
    return invalidCtrl;
  }
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {

  model: any = {};
  loggedIn: boolean = false;
  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('newPassword')!.value;
    let confirmPass = group.get('repeatPassword')!.value
    return pass === confirmPass ? null : { notSame: true }
  }
  changePasswordForm = this.fb.group({
    oldPassword: ['', Validators.required],
    newPassword: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(32),
        this.newPasswordStrengthValidator(),
        this.matchValues('repeatPassword')
      ],
    ],
    repeatPassword: [
      '',
        [Validators.required, this.matchValues('newPassword')]]
  }
  // , { validators: this.checkPasswords }
  );

  ngOnInit(){
    this.changePasswordForm.controls.newPassword.valueChanges.subscribe(() => {
      this.changePasswordForm.controls.repeatPassword.updateValueAndValidity();
    });
    this.changePasswordForm.controls.repeatPassword.valueChanges.subscribe(() => {
      this.changePasswordForm.controls.newPassword.updateValueAndValidity();
    });
    

  }
  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  newPasswordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;


      if (!value) return null;

      const hasUpperCase = /[A-Z]+/.test(value);

      const hasLowerCase = /[a-z]+/.test(value);

      const hasNumeric = /[0-9]+/.test(value);

      const hasSpecialChar = /[!@#$%^&*]+/.test(value);

      const newPasswordValid =
        hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;

      return !newPasswordValid ? { newPasswordStrength: true } : null;
    };
  }


  matchValues(matchTo:string) : ValidatorFn {
    return (control: AbstractControl | any) => {
      return control?.value === control?.parent?.controls[matchTo].value
      ? null
      : {isMatching:true}
    }
  }

  changePassword() {
    // this.accountService.login(this.model).subscribe(response => {
    //   console.log(response);
    //   this.router.navigateByUrl('/threats')
    //   this.loggedIn = true;
    // },
    //  error => {
    //    console.log(error);
    //    this.toastr.error("Autenticazione Fallita");
    //  });
    console.log(this.model);
  }
  matcher = new MyErrorStateMatcher();
}
