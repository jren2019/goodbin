import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { AboutComponent } from './about/about.component';
import { BannerComponent } from './banner/banner.component';
import { ContactComponent } from './contact/contact.component';
import { JobsComponent } from './jobs/jobs.component';
import { MoreProyectsComponent } from './more-proyects/more-proyects.component';
import { ProyectsComponent } from './proyects/proyects.component';
import { NgbModule, NgbNav, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { QuotationFormComponent } from "./quotation-form/quotation-form.component";
import { AreasServicedComponent } from './areas-serviced/areas-serviced.component';
import { GoodBinsComponent } from './good-bins/good-bins.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}



@NgModule({
    declarations: [
        HomeComponent,
        BannerComponent,
        AboutComponent,
        JobsComponent,
        ProyectsComponent,
        MoreProyectsComponent,
        ContactComponent,
        QuotationFormComponent,
        AreasServicedComponent,
        GoodBinsComponent,
    ],
    imports: [
        CommonModule,
        NgbNavModule,
        CarouselModule,
        FormsModule,
        RouterModule,

        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
    ]
})
export class HomeModule { }
