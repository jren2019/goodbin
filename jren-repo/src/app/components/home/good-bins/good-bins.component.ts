import { Component } from '@angular/core';
// import { LanguageService } from './services/language.service'; 
import {LanguageService} from "src/app/services/language/language.service"

@Component({
  selector: 'app-good-bins',
  templateUrl: './good-bins.component.html',
  styleUrl: './good-bins.component.scss'
})
export class GoodBinsComponent {
  testimonials = [
    {
      text: 'This service is fantastic! Highly recommend to everyone.',
      author: 'Jane Doe'
    },
    {
      text: 'An amazing experience from start to finish.',
      author: 'John Smith'
    },
    {
      text: 'Professional and reliable. I will definitely use their services again.',
      author: 'Sarah Lee'
    }
  ];
  

  constructor(public languageService: LanguageService) {}

}
