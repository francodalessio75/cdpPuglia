import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { HeaderService } from './_services/header.service';
import { TranslationService } from './_services/translation.service';
import * as LanguagesEnum from './enums/LanguagesEnum'
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { ChangeProfileComponent } from './auth/change-profile/change-profile.component';
import { Translatable } from './interfaces/translatable';
import { LanguageData } from './_models/languageData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, Translatable{
  @ViewChild('sidenav') sidenav:any;

  languageData!:LanguageData

  sidenvOpened = true;

  title = 'Threats Report';
  menuItems:string[] = ['dashboard', 'threats', 'sales', 'orders', 'customers', 'products'];
  //related to Language
  languageLabel = '';
  italian = '';
  english = '';
  manageProfile = '';
  changeProfile = '';
  changePassword = '';

  user:User = {};
  pageTitle='';
  pageDescription='';

  constructor(
    public accountService:AccountService, 
    public headerService:HeaderService, 
    public dialog: MatDialog,
    private translationService:TranslationService) {
      this.accountService.currentUser$.subscribe(
        user => this.user = user
      );
      this.translationService.currentLanguage$.subscribe((language)=>{
        this.languageData = this.translationService.getCurrentLanguageData();
        this.setLanguageData(this.languageData);
      });
      this.headerService.titleDescription$.subscribe((titleDescription)=>{
        this.pageTitle = titleDescription.title;
        this.pageDescription = titleDescription.description;
      });
     }

  ngOnInit(){    
    this.languageData = this.translationService.getCurrentLanguageData();
    this.setLanguageData(this.languageData);
    this.setCurrentUser();
  }

  toggle(){
    this.sidenav.toggle();
    this.sidenvOpened = !this.sidenvOpened;
  }

  logout(){
    this.accountService.logout();
  }

  setCurrentUser(){
    const user : User = JSON.parse(localStorage.getItem('user')!);
    this.accountService.setCurrentUser(user);
  }

  openChangePassword(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      // width: '250px',
      panelClass: 'trend-dialog',
      height: '65%',
            width: '40%',
      disableClose: true,
      hasBackdrop: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    
    });
  }

  openChangeProfile(): void {
    const dialogRef = this.dialog.open(ChangeProfileComponent, {
      // width: '250px',
      panelClass: 'trend-dialog',
      height: '60%',
      width: '40%',
      disableClose: true,
      hasBackdrop: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  changeLanguage(lang:string){
    switch(lang){
      case LanguagesEnum.Language.en:
        this.translationService.setCurrentLanguage(LanguagesEnum.Language.en);
        break;
      case LanguagesEnum.Language.it:
        this.translationService.setCurrentLanguage(LanguagesEnum.Language.it);
        break;
      default:
      console.log("No such language exists!");
      break;
    }
  }

  setLanguageData(languageData:LanguageData){
    this.languageLabel = languageData.sections.menu.languageLabel;
    this.italian = languageData.sections.menu.italian;
    this.english = languageData.sections.menu.english;
    this.manageProfile = languageData.sections.menu.manageProfile;
    this.changeProfile = languageData.sections.menu.changeProfile;
    this.changePassword = languageData.sections.menu.changePassword;
  }
}
