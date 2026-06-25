import { Routes } from '@angular/router';

export const SALLE_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./pages/salle.component').then(m => m.SalleComponent) }
];
