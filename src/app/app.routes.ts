import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AllBinsComponent } from './all-bins/all-bins.component';
import { AreasServicedComponent } from './areas-serviced/areas-serviced.component';
import { ShopComponent } from './shop/shop.component';
import { WinzQuoteSuccessComponent } from './winz-quote-success/winz-quote-success.component';
import { FaqComponent } from './faq/faq.component';
import { BinDetailComponent } from './bin-detail/bin-detail.component';
import { BLOG_ROUTES } from './blog/blog.routes';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { OrderDetailComponent } from './profile/order-detail/order-detail.component';
import { OrderCreationComponent } from './order/order-creation.component';
import { authGuard } from './core/guards/auth.guard';
import { GetQuoteComponent } from './get-quote/get-quote.component';

export const routes: Routes = [
  { path: 'get-free-quote', component: GetQuoteComponent },
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: AllBinsComponent },
  { path: 'bin/:id', component: BinDetailComponent },
  { path: 'how-it-works', component: AreasServicedComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'faq', component: FaqComponent },
  ...BLOG_ROUTES,
  { path: 'winz-quote-submitted-successfully', component: WinzQuoteSuccessComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard]
  },
  {
    path: 'profile/order/:id',
    component: OrderDetailComponent,
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '' }
];
