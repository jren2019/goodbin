import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  language: "es" | "en";

  constructor(
    public translateService: TranslateService,
    private location: Location,
    private router: Router,
  ) {}

  initLanguage(){
    this.translateService.addLangs(["en", "es"])
    let language = navigator.language || (navigator as any).userLanguage;
    language = language.split("-").includes("es") ? "es" : "en"
    this.translateService.setDefaultLang(language)

    const currentPath = this.location.path();
    if (!currentPath.startsWith(`/${language}`)) {
      // Redirect to the language-prefixed URL
      this.location.replaceState(`/${language}${currentPath}`);
    }

    this.language = language;

    // // Change the URL without navigate:
    // this.location.go(language+"/thanks")

    // this.language=language
  }

  changeLanguage(language){
    this.translateService.setDefaultLang(language)

    const currentPath = this.location.path().split('/').slice(2).join('/');
    // Redirect to the same path with the new language
    this.router.navigate([`/${language}/${currentPath}`]);
    this.language = language;
  }
}
