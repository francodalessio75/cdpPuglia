import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { HeaderService } from 'src/app/_services/header.service';
import { TranslationService } from 'src/app/_services/translation.service';
import * as LanguagesEnum from '../../_services/LanguagesEnum'
import * as LanguageModel from '../../_models/languageData'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{
  model:any = {};

  /* Related to Language */
  language:LanguagesEnum.Language = LanguagesEnum.Language.it;
  pageTitle = 'Pagina di Login: ';
  pageDescription = 'Form di autenticazione per accesso al sistema';
  submitButton = 'invia';
  discardButton = 'annulla';

  loginForm = this.fb.group({
    username: ['',Validators.required],
    password: ['',Validators.required]
  });

  
  constructor(
    private accountService : AccountService,
    private router:Router,
    private fb:FormBuilder,
    private headerService:HeaderService,
    private translationService:TranslationService) { }

  ngOnInit(){
    this.translationService.currentLanguage$.subscribe((language)=>{
      this.setLanguageData();
    });
    this.setLanguageData();
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

  private setLanguageData(){
    let languageData = this.translationService.getCurrentLanguageData();
    this.submitButton = languageData.sections.global.submitButton;
    this.discardButton = languageData.sections.global.discardButton;
    this.pageTitle = languageData.sections.login.pageTitle;
    this.pageDescription = languageData.sections.login.pageDescription;
    this.headerService.setCurrentTitleDescription(this.pageTitle,this.pageDescription);
  }
}
