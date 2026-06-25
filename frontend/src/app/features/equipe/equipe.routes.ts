import { Routes } from '@angular/router';

export const EQUIPE_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./pages/equipe.component').then(m => m.EquipeComponent) }
];
