import { Component } from '@angular/core';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
  selector: 'app-areas-serviced',
  templateUrl: './areas-serviced.component.html',
  styleUrl: './areas-serviced.component.scss'
})
export class AreasServicedComponent {

  constructor(public languageService: LanguageService) { }

}
