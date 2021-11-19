import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { TranslationService } from 'src/app/_services/translation.service';


@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.component.html',
  styleUrls: ['./change-profile.component.css']
})
export class ChangeProfileComponent implements OnInit {
  model: any = {};

  /* Related to Language */
  saveButton = '';
  discardButton = '';
  requiredFieldError = '';
  currentUser: User ={username:'', password:''};
  chgProfile= '';

  constructor(
    private translationService:TranslationService,
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
    this.translationService.currentLanguage$.subscribe((language)=>{
      this.setLanguageData();
    });
    this.setLanguageData();

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
  private setLanguageData(){
    let languageData = this.translationService.getCurrentLanguageData();
    this.saveButton = languageData.sections.global.saveButton;
    this.discardButton = languageData.sections.global.discardButton;
    this.requiredFieldError = languageData.sections.global.requiredFieldError;
    this.chgProfile = languageData.sections.menu.changeProfile;
    
  }

}
