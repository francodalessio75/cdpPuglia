import { LanguageData } from "../_models/languageData";

export interface Translatable{
    languageData:LanguageData;

    setLanguageData(languageData:LanguageData):void;
}