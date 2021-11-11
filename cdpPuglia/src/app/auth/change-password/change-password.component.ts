import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HeaderComponent } from 'src/app/navigation/header/header.component';
import { User } from 'src/app/_models/user';
import { TranslationService } from 'src/app/_services/translation.service';


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

  /* Related to Language */
  saveButton = '';
  discardButton = '';
  requiredFieldError = '';

  currentUser: User ={username:'',password:''};

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
        this.newPasswordStrengthValidator()
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
    
    this.dialogRef.beforeClosed().subscribe(() => this.dialogRef.close());
    this.accountService.currentUser$.subscribe(user => {this.currentUser=user});
    this.translationService.currentLanguage$.subscribe((language)=>{
      this.setLanguageData();
    });
    this.setLanguageData();
  }
  constructor(
    private translationService:TranslationService,
    private accountService: AccountService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<HeaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
  }

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
  onNoClick(): void {
    this.dialogRef.close();
  }

  matchValues(matchTo:string) : ValidatorFn {
    return (control: AbstractControl | any) => {
      return control?.value === control?.parent?.controls[matchTo].value
      ? null
      : {isMatching:true}
    }
  }

  changePassword() {
    this.accountService.changePassword$(
      this.changePasswordForm.controls.oldPassword.value,
      this.changePasswordForm.controls.newPassword.value, 
      this.changePasswordForm.controls.repeatPassword.value)
      .subscribe(response => {
      console.log(response);
    },
     error => {
       console.log(error);
     });
    console.log(this.model);
  }
  matcher = new MyErrorStateMatcher();
  private setLanguageData(){
    let languageData = this.translationService.getCurrentLanguageData();
    this.saveButton = languageData.sections.global.saveButton;
    this.discardButton = languageData.sections.global.discardButton;
    this.requiredFieldError = languageData.sections.global.requiredFieldError;
    
  }
}
