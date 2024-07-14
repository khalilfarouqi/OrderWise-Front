import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { TarifPageComponent } from './tarif-page/tarif-page.component';
import { ServicePageComponent } from './service-page/service-page.component';
import { ContactUsPageComponent } from './contact-us-page/contact-us-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { OrderListComponent } from './order-list/order-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { SettingComponent } from './setting/setting.component';
import { ProfilComponent } from './profil/profil.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  //{ path: '', component: AppComponent},
  { path: "login", component: LoginComponent},
  { path: "signup", component: SignUpComponent},
  { path: "home", component: HomeComponent},
  { path: "tarif", component: TarifPageComponent},
  { path: "service", component: ServicePageComponent},
  { path: "contact", component: ContactUsPageComponent},
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "notification", component: NotificationListComponent, canActivate: [AuthGuard]},
  { path: "order", component: OrderListComponent, canActivate: [AuthGuard]},
  { path: "product", component: ProductListComponent, canActivate: [AuthGuard]},
  { path: "stock", component: StockListComponent, canActivate: [AuthGuard]},
  { path: "analytics", component: AnalyticsComponent, canActivate: [AuthGuard]},
  { path: "setting", component: SettingComponent, canActivate: [AuthGuard]},
  { path: "profil", component: ProfilComponent, canActivate: [AuthGuard]},
  { path: "product-page/:id", component: ProductPageComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
