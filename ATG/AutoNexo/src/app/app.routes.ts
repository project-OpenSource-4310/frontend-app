import { Routes } from '@angular/router';
import {AuthenticationPageComponent} from './features/authentication/pages/authentication-page/authentication-page.component';
const LoginComponent =()=>import("./features/authentication/components/login/login.component").then(m=>m.LoginComponent);
const PageNotFoundComponent=()=>import('./shared/pages/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent);
export const routes: Routes = [
  { path: 'authentication',component:AuthenticationPageComponent,
    children: [
      { path: 'login', loadComponent: LoginComponent },
    ]},
  {path:'', redirectTo:'/authentication',pathMatch:'full'},
  {path:'**',loadComponent:PageNotFoundComponent},
];
