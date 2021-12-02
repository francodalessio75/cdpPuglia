import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import * as translationsData from './translations.json'
import * as LanguagesEnum from '../enums/LanguagesEnum'
import * as LanguageModel from '../_models/languageData'
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  //Tanslations JSON Data
  translationsData : any = (translationsData as any ).default;
  //Default Language setting
  private language:LanguagesEnum.Language = LanguagesEnum.Language.it;
  //Component Requested Language Data
  private languageData : LanguageModel.LanguageData = this.translationsData.it;

  private currentLanguageSource = new ReplaySubject<LanguagesEnum.Language>(1);
  currentLanguage$ = this.currentLanguageSource.asObservable();

  constructor(private cookieService: CookieService) { }

  setCurrentLanguage( language:LanguagesEnum.Language ){
    this.language = language;
    this.cookieService.set('language',this.language);
    this.currentLanguageSource.next(this.language);
  }

  getCurrentLanguageData():LanguageModel.LanguageData{
    if(this.checkLanguageCookie())
      return this.translationsData[this.cookieService.get('language')];
    else
      return this.translationsData[this.language];
  }

  private checkLanguageCookie():Boolean{
    switch (this.cookieService.get('language')){
      case LanguagesEnum.Language.it:
      case LanguagesEnum.Language.en:
        return true;
        break;
      default:
        return false;
        break;
    }
  }
}
