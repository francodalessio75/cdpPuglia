import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import * as translationsData from './translations.json'
import * as Languages from './LanguagesEnum'

interface LanguageData{
  submitButton:string;
  discardButton:string;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  translationsData : any = (translationsData as any ).default;
  private language:Languages.Language = Languages.Language.en;
  private languageData = this.translationsData.en as LanguageData;

  
  private currentLanguageData = new ReplaySubject<LanguageData>(1);
  currentLanguageData$ = this.currentLanguageData.asObservable();

  constructor() { }

  setCurrentLanguage( language:Languages.Language ){
    //this.currentLanguage.next(this.language);
    this.language = language;
    this.languageData = this.translationsData[language] as LanguageData;
    this.currentLanguageData.next(this.languageData);
    console.log(this.languageData);
  }

}
