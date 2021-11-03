import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import * as translationsData from './translations.json'
import * as LanguagesEnum from './LanguagesEnum'
import * as LanguageModel from '../_models/languageData'
@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  //Tanslations JSON Data
  translationsData : any = (translationsData as any ).default;
  //Default Language setting
  private language:LanguagesEnum.Language = LanguagesEnum.Language.it;
  //Component Requested Language Data
  private languageData : LanguageModel.LanguageData= this.translationsData.it;

  private currentLanguage = new ReplaySubject<LanguagesEnum.Language>(1);
  currentLanguage$ = this.currentLanguage.asObservable();

  constructor() { }

  setCurrentLanguage( language:LanguagesEnum.Language ){
    this.language = language;
    this.currentLanguage.next(this.language);
  }

  getCurrentLanguageData():LanguageModel.LanguageData{
    return this.translationsData[this.language];
  }

}
