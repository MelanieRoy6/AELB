import { Routes } from '@angular/router';

export const EVENEMENTS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./pages/evenements.component').then(m => m.EvenementsComponent) }
];
