import { Routes } from '@angular/router';

export const ASSOCIATIF_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./pages/associatif.component').then(m => m.AssociatifComponent) }
];
