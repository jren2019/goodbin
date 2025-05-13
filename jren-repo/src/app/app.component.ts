import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import {LanguageService} from "src/app/services/language/language.service"
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'andresjosehr-portfolio';
  
  constructor(
    private titleService: Title,
    private metaService: Meta,
    private translateService: TranslateService,
    private location: Location,
    private languageService: LanguageService
    ){
    }
  ngOnInit(): void{
    
    this.languageService.initLanguage()


    this.titleService.setTitle( "Good Bin Removals - Auckland" );

    this.metaService.addTags([
      {name: 'keywords', content: 'Good Bin Removals, Auckland, Rubbish Removals'},
      {name: 'description', content: 'Good Bins is a family-owned rubbis bin hire company in Auckland. It was founded in 2016 as a funiture removals company, changing overtime cover good bins bin hire, delivering rubbish and hardfill bins across Auckland.'},
    ]);
    
    
    AOS.init(); 

  }
}
