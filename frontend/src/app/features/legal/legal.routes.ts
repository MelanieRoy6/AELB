import { Routes } from '@angular/router';

export const LEGAL_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./pages/mentions-legales.component').then(m => m.MentionsLegalesComponent) }
];
