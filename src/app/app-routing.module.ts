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

const routes: Routes = [
  { path: "login", component: LoginComponent},
  { path: "signup", component: SignUpComponent},
  { path: "home", component: HomeComponent},
  { path: "tarif", component: TarifPageComponent},
  { path: "service", component: ServicePageComponent},
  { path: "contact", component: ContactUsPageComponent},
  { path: "dashboard", component: DashboardComponent},
  { path: "notification", component: NotificationListComponent},
  { path: "order", component: OrderListComponent},
  { path: "product", component: ProductListComponent},
  { path: "stock", component: StockListComponent},
  { path: "analytics", component: AnalyticsComponent},
  { path: "setting", component: SettingComponent},
  { path: "profil", component: ProfilComponent},
  { path: "product-page/:id", component: ProductPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
