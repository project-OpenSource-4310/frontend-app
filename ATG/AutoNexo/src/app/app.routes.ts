import { Routes } from '@angular/router';
import {EntryPointComponent} from './core/authentication/pages/entry-point/entry-point.component';
const LoginComponent =() => import('./core/authentication/pages/login/login.component').then(m => m.LoginComponent);
const RegisterComponent =() => import('./core/authentication/pages/register/register.component').then(m => m.RegisterComponent);
const ForgotPasswordComponent = () => import('./core/authentication/pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent);
const RoleSelectionComponent = () => import('./core/role-selection/role-selection.component').then(m => m.RoleSelectionComponent);
const TermsConditionsComponent = () => import('./core/authentication/pages/terms-conditions/terms-conditions.component').then(m => m.TermsConditionsComponent);
const PageNotFoundComponent = () => import('./core/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent);
const MechanicHomeComponent=()=>import('./features/mechanic/pages/mechanic-home/mechanic-home.component').then(m => m.MechanicHomeComponent);
const MechanicInventoryComponent=()=>import('./features/mechanic/pages/mechanic-inventory/mechanic-inventory.component').then(m => m.MechanicInventoryComponent);
const MechanicProfileComponent=()=>import('./features/mechanic/pages/mechanic-profile/mechanic-profile.component').then(m => m.MechanicProfileComponent);
const MechanicRequestsComponent=()=>import('./features/mechanic/pages/mechanic-requests/mechanic-requests.component').then(m => m.MechanicRequestsComponent);
const MechanicSendedComponent=()=>import('./features/mechanic/pages/mechanic-sended/mechanic-sended.component').then(m => m.MechanicSendedComponent);
const MechanicVehicleComponent=()=>import('./features/mechanic/components/mechanic-vehicle/mechanic-vehicle.component').then(m => m.MechanicVehicleComponent);
const AddReparationComponent=()=>import('./features/mechanic/components/add-reparation/add-reparation.component').then(m => m.AddReparationComponent);
const ModifyRepairComponent=()=>import('./features/mechanic/components/modify-repair/modify-repair.component').then(m => m.ModifyRepairComponent);

export const routes: Routes = [
  {path:'entry-point',component:EntryPointComponent},
  {path:'', redirectTo:'/entry-point',pathMatch:'full'},
  {path:'register',loadComponent:RegisterComponent},
  {path:'login',loadComponent:LoginComponent},
  {path:'forgot-password',loadComponent:ForgotPasswordComponent},
  {path:'role-selection',loadComponent:RoleSelectionComponent},
  {path:'terms-conditions',loadComponent:TermsConditionsComponent},
  {path:'mechanic-home',loadComponent:MechanicHomeComponent},
  {path:'mechanic-vehicle',loadComponent:MechanicVehicleComponent },
  {path:'mechanic-inventory',loadComponent:MechanicInventoryComponent},
  {path:'mechanic-profile',loadComponent:MechanicProfileComponent},
  {path:'mechanic-requests',loadComponent:MechanicRequestsComponent},
  {path:'mechanic-sended',loadComponent:MechanicSendedComponent},
  {path:'add-reparation',loadComponent:AddReparationComponent},
  {path: 'modify-repair', loadComponent: ModifyRepairComponent},
  {path:'**',loadComponent:PageNotFoundComponent},
];
