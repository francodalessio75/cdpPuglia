import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Translatable } from 'src/app/interfaces/translatable';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { HeaderService } from 'src/app/_services/header.service';
import { TranslationService } from 'src/app/_services/translation.service';
import * as LanguagesEnum from '../../enums/LanguagesEnum';
import { LanguageData } from '../../_models/languageData';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy, Translatable {
  user: User = {};

  /* Related to Language */
  language: LanguagesEnum.Language = LanguagesEnum.Language.it;
  pageTitle = '';
  pageDescription = '';
  submitButton = '';
  discardButton = '';
  signInButton = '';
  requiredFieldError = '';

  languageData!:LanguageData;

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private accountService: AccountService,
    private router: Router,
    private fb: FormBuilder,
    private headerService: HeaderService,
    private translationService: TranslationService
  ) {
    this.translationService.currentLanguage$.subscribe((language) => {
      this.languageData = this.translationService.getCurrentLanguageData();
      this.setLanguageData(this.languageData);
    });
  }

  ngOnInit() {
    this.languageData = this.translationService.getCurrentLanguageData();
    this.setLanguageData(this.languageData);
  }

  login() {
    this.user.username = this.loginForm.value.username;
    this.user.password = this.loginForm.value.password;
    this.accountService.getToken$(this.user).subscribe(response => {
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

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  ngOnDestroy() {
    this.headerService.setCurrentTitleDescription('', '');
  }

  setLanguageData(languageData:LanguageData) {
    this.submitButton = languageData.sections.global.submitButton;
    this.discardButton = languageData.sections.global.discardButton;
    this.pageTitle = languageData.sections.login.pageTitle;
    this.pageDescription = languageData.sections.login.pageDescription;
    this.headerService.setCurrentTitleDescription(
      this.pageTitle,
      this.pageDescription
    );
    this.signInButton = languageData.sections.login.signInButton;
    this.requiredFieldError = languageData.sections.global.requiredFieldError;
  }
}
