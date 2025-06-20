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

// MECHANIC
const MechanicPageComponent =()=>import('./features/mechanic/pages/mechanic-page/mechanic-page.component').then(m=>m.MechanicPageComponent);
const MechanicHomeComponent=()=>import('./features/mechanic/components/mechanic-home/mechanic-home.component').then(m=>m.MechanicHomeComponent);
const MechanicRequestsReceivedComponent=()=>import('./features/mechanic/components/mechanic-requests-received/mechanic-requests-received.component').then(m=>m.MechanicRequestsReceivedComponent);
const MechanicRequestsSentComponent=()=>import('./features/mechanic/components/mechanic-requests-sent/mechanic-requests-sent.component').then(m=>m.MechanicRequestsSentComponent);
const MechanicVehicleComponent=()=>import('./features/mechanic/components/mechanic-vehicle/mechanic-vehicle.component').then(m=>m.MechanicVehicleComponent);
const AssignmentRequestReceivedComponent=()=>import('./features/mechanic/components/assignment-request-received/assignment-request-received.component').then(m=>m.AssignmentRequestReceivedComponent);
const MaintenanceRequestSentComponent=()=>import('./features/mechanic/components/maintenance-request-sent/maintenance-request-sent.component').then(m=>m.MaintenanceRequestSentComponent);
const SendMaintenanceRequestComponent=()=>import('./features/mechanic/components/send-maintenance-request/send-maintenance-request.component').then(m=>m.SendMaintenanceRequestComponent);
const MechanicProfileComponent=()=>import('./features/mechanic/components/mechanic-profile/mechanic-profile.component').then(m=>m.MechanicProfileComponent);
const AddInventoryComponent=()=>import('./features/mechanic/components/add-inventory/add-inventory.component').then(m=>m.AddInventoryComponent);
const InventoryComponent=()=>import('./features/mechanic/components/inventory/inventory.component').then(m=>m.InventoryComponent);

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
  {path:'mechanic-page',loadComponent:MechanicPageComponent,
    children:[
      {path:'home',loadComponent:MechanicHomeComponent},
      {path:'requests-received',loadComponent:MechanicRequestsReceivedComponent},
      {path:'assignment-request',loadComponent:AssignmentRequestReceivedComponent},
      {path:'send-request',loadComponent:SendMaintenanceRequestComponent},
      {path:'requests-sent',loadComponent:MechanicRequestsSentComponent},
      {path:'maintenance-request',loadComponent:MaintenanceRequestSentComponent},
      {path:'vehicle',loadComponent:MechanicVehicleComponent},
      {path:'profile',loadComponent:MechanicProfileComponent},
      {path:'add-inventory', loadComponent: AddInventoryComponent},
      {path:'inventory',loadComponent:InventoryComponent},
    ]},
  {path:'**',loadComponent:PageNotFoundComponent},
];
