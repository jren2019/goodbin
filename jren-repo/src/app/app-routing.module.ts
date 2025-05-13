import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { ThanksComponent } from './components/thanks/thanks.component';
import { AllBinsComponent } from './components/all-bins/all-bins.component';
import { GetAQuotationComponent } from './components/get-aquotation/get-aquotation.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [

  { path: ':language?', component: HomeComponent },
  { path: ':language?/proyectos', component: ArchiveComponent },
  { path: ':language?/thanks', component: ThanksComponent },
  { path: ':language?/bins', component: AllBinsComponent },
  { path: ':language?/get-a-quotation', component: GetAQuotationComponent },
  { path: ':language?/about', component: AboutComponent },
  { path: 'thanks', component: ThanksComponent },
  { path: 'get-a-quotation', component: GetAQuotationComponent },
  { path: 'bins', component: AllBinsComponent },
  { path: 'about', component: AboutComponent },

  { path: '', component: HomeComponent },
  // {path: 'profile'        ,   component: ProfileComponent         , canActivate: [AuthGuard]},
  // {path: 'users'          ,   component: UsersComponent           , canActivate: [AuthGuard]},
  // {path: 'register-user'  ,   component: RegisterUserComponent    , canActivate: [AuthGuard]},

  // {path: '**', pathMatch: 'full', redirectTo: '/'},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
