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
const DriverHomeComponent=()=>import('./features/driver/components/driver-home/driver-home.component').then(m=>m.DriverHomeComponent);
const AddVehicleComponent=()=>import('./features/driver/components/add-vehicle/add-vehicle.component').then(m=>m.AddVehicleComponent);
const DriverVehicleComponent=()=>import('./features/driver/components/driver-vehicle/driver-vehicle.component').then(m=>m.DriverVehicleComponent);
const SendAssignmentRequestComponent=()=>import('./features/driver/components/send-assignment-request/send-assignment-request.component').then(m=>m.SendAssignmentRequestComponent);
const DriverRequestsSentComponent=()=>import('./features/driver/components/driver-requests-sent/driver-requests-sent.component').then(m=>m.DriverRequestsSentComponent);
const AssignmentRequestSentComponent=()=>import('./features/driver/components/assignment-request-sent/assignment-request-sent.component').then(m=>m.AssignmentRequestSentComponent);
const MaintenanceRequestReceivedComponent=()=>import('./features/driver/components/maintenance-request-received/maintenance-request-received.component').then(m=>m.MaintenanceRequestReceivedComponent);
const DriverRequestsReceivedComponent=()=>import('./features/driver/components/driver-requests-received/driver-requests-received.component').then(m=>m.DriverRequestsReceivedComponent);
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
      {path:'home',loadComponent:DriverHomeComponent},
      {path:'requests-received',loadComponent:DriverRequestsReceivedComponent},
      {path:'add-vehicle', loadComponent: AddVehicleComponent},
      {path:'vehicle',loadComponent:DriverVehicleComponent},
      {path:'send-request',loadComponent:SendAssignmentRequestComponent},
      {path:'requests-sent',loadComponent:DriverRequestsSentComponent},
      {path:'assignment-request',loadComponent:AssignmentRequestSentComponent},
      {path:'maintenance-request',loadComponent:MaintenanceRequestReceivedComponent},
      {path:'profile',loadComponent:DriverProfileComponent},
    ]},
  {path:'**',loadComponent:PageNotFoundComponent},
];
