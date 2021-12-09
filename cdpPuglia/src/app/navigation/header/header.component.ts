import { Component, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from 'src/app/auth/change-password/change-password.component';
import { ChangeProfileComponent } from 'src/app/auth/change-profile/change-profile.component';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { TranslationService } from 'src/app/_services/translation.service';
import { EventEmitter } from '@angular/core';
import * as LanguagesEnum from '../../enums/LanguagesEnum';
import { LanguageData } from 'src/app/_models/languageData';
import { HeaderService } from 'src/app/_services/header.service';
import { Translatable } from 'src/app/interfaces/translatable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, Translatable {
  @Output() sidenavToggled : EventEmitter<void> = new EventEmitter();

  @Input() sidenavOpened = true;

  languageData!:LanguageData;

  user:User = {};
  pageTitle='';
  pageDescription='';
  
  menuItems:string[] = ['dashboard', 'sales', 'orders', 'customers', 'products'];
  
  //related to language
  manageProfile = '';
  changeProfile = '';
  changePassword = '';
  languageLabel = '';
  italian = '';
  english = '';

  constructor(
    public accountService:AccountService,
    public dialog: MatDialog,
    private translationService:TranslationService,
    private headerService:HeaderService
  ) {
    this.accountService.currentUser$.subscribe(
      user => this.user = user
    );
    this.translationService.currentLanguage$.subscribe((language)=>{
      this.languageData = this.translationService.getCurrentLanguageData();
      this.setLanguageData(this.languageData);
    });
    this.headerService.titleDescription$.subscribe(
      titleDescription => {
        this.pageTitle = titleDescription.title;
        this.pageDescription = titleDescription.description;
      }
    );
   }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe(
      user => this.user = user
    );
    this.languageData = this.translationService.getCurrentLanguageData();
    this.setLanguageData(this.languageData);
  }

  sidenavToggle(){
    this.sidenavToggled.emit();
  }

  logout(){
    this.accountService.logout();
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
