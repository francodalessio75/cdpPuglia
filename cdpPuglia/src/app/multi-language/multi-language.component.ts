import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../_services/translation.service';
import * as Languages from '../_services/LanguagesEnum'


@Component({
  selector: 'app-multi-language',
  templateUrl: './multi-language.component.html',
  styleUrls: ['./multi-language.component.css']
})
export class MultiLanguageComponent implements OnInit{
  submitButtonLabel='submit';
  languageData:JSON = {} as JSON;


  constructor( private translationService:TranslationService) { }

  ngOnInit(){
    this.translationService.setCurrentLanguage(Languages.Language.it);
    this.translationService.currentLanguageData$.subscribe((translationData)=>{
      this.submitButtonLabel = translationData.submitButton;
    })
  }
 
  changeLanguage(lang:string){
    switch(lang){
      case Languages.Language.en:
        this.translationService.setCurrentLanguage(Languages.Language.en);
        break;
      case Languages.Language.it:
        this.translationService.setCurrentLanguage(Languages.Language.it);
        break;
      default:
      console.log("No such language exists!");
      break;
    }

  }
}
