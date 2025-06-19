import { Routes } from '@angular/router';
const TermsConditionsComponent =()=>import('./shared/pages/terms-conditions/terms-conditions.component').then(m=>m.TermsConditionsComponent);
export const routes: Routes = [
  {path:'terms-and-conditions',loadComponent:TermsConditionsComponent},
];
