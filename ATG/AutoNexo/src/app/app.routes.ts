import { Routes } from '@angular/router';
const PageNotFoundComponent=()=>import('./shared/pages/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent);
const TermsConditionsComponent =()=>import('./shared/pages/terms-conditions/terms-conditions.component').then(m=>m.TermsConditionsComponent);
// AUTHENTICATION
import {AuthenticationPageComponent} from './features/authentication/pages/authentication-page/authentication-page.component';
const LoginComponent =()=>import("./features/authentication/components/login/login.component").then(m=>m.LoginComponent);
const RegisterComponent =()=>import("./features/authentication/components/register/register.component").then(m=>m.RegisterComponent);
const ForgotPasswordComponent =()=>import('./features/authentication/components/forgot-password/forgot-password.component').then(m=>m.ForgotPasswordComponent);

// DRIVER
const DriverPageComponent=()=>import('./features/driver/pages/driver-page/driver-page.component').then(m=>m.DriverPageComponent);
const DriverProfileComponent=()=>import('./features/driver/components/driver-profile/driver-profile.component').then(m=>m.DriverProfileComponent);
export const routes: Routes = [
  { path: 'authentication',component:AuthenticationPageComponent,
    children: [
      { path: 'login', loadComponent: LoginComponent },
      { path: 'register', loadComponent: RegisterComponent },
      { path: 'forgot-password', loadComponent: ForgotPasswordComponent },
    ]},
  {path:'', redirectTo:'/authentication',pathMatch:'full'},
  {path:'terms-and-conditions',loadComponent:TermsConditionsComponent},
  {path:'driver-page',loadComponent:DriverPageComponent,
    children:[
      {path:'profile',loadComponent:DriverProfileComponent},
    ]},
  {path:'**',loadComponent:PageNotFoundComponent},
];
