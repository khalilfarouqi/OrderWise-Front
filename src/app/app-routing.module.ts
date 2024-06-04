import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { TarifPageComponent } from './tarif-page/tarif-page.component';
import { ServicePageComponent } from './service-page/service-page.component';
import { ContactUsPageComponent } from './contact-us-page/contact-us-page.component';

const routes: Routes = [
  { path: "login", component: LoginComponent},
  { path: "signup", component: SignUpComponent},
  { path: "home", component: HomeComponent},
  { path: "tarif", component: TarifPageComponent},
  { path: "service", component: ServicePageComponent},
  { path: "contact", component: ContactUsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
