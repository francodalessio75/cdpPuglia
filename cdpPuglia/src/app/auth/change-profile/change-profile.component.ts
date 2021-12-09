import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Translatable } from 'src/app/interfaces/translatable';
import { LanguageData } from 'src/app/_models/languageData';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { TranslationService } from 'src/app/_services/translation.service';


@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.component.html',
  styleUrls: ['./change-profile.component.css']
})
export class ChangeProfileComponent implements OnInit, Translatable {
  model: any = {};

  /* Related to Language */
  saveButton = '';
  discardButton = '';
  requiredFieldError = '';
  currentUser: User ={username:'', password:''};
  chgProfile= '';

  languageData!:LanguageData;

  constructor(
    private translationService:TranslationService,
    private accountService: AccountService,
    private fb: FormBuilder
  ) { 
    this.translationService.currentLanguage$.subscribe((language)=>{
      this.languageData = this.translationService.getCurrentLanguageData();
      this.setLanguageData(this.languageData);
    });
  }

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
   
    this.languageData = this.translationService.getCurrentLanguageData();
    this.setLanguageData(this.languageData);

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
  
  setLanguageData(languageData:LanguageData){
    this.saveButton = languageData.sections.global.saveButton;
    this.discardButton = languageData.sections.global.discardButton;
    this.requiredFieldError = languageData.sections.global.requiredFieldError;
    this.chgProfile = languageData.sections.menu.changeProfile;
    
  }

}
