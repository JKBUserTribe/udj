import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { MatTableModule } from '@angular/material';
import { MatSortModule } from '@angular/material/sort';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { AntiAuthGuard } from './services/anti-auth-guard.service';
import { RoleGuardService as RoleGuard } from './services/role-guard.service';
import { ProductService } from './services/product.service';

const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent, canActivate:[AntiAuthGuard]},
  {path:'login', component: LoginComponent, canActivate:[AntiAuthGuard]},
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'products', component: ProductsComponent},
  {path:'products/detail/:id', component: ProductDetailComponent},
  {path:'admin', component: AdminComponent, canActivate:[RoleGuard], data: {expectedRole: 'admin'}},
  {path:'admin/products', component: AdminProductsComponent, canActivate:[RoleGuard], data: {expectedRole: 'admin'}},
  {path:'**', redirectTo: ''}
]

export function tokenGetter() {
  return localStorage.getItem('id_token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    ProductsComponent,
    ProductDetailComponent,
    AdminComponent,
    AdminProductsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    FlashMessagesModule.forRoot(),
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3001'],
        blacklistedRoutes: ['localhost:3001/auth/']
      }
    })
  ],
  providers: [
    ValidateService,
    AuthService,
    AuthGuard,
    AntiAuthGuard,
    RoleGuard,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
