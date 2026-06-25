import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./features/home/home.routes').then(m => m.HOME_ROUTES) },
  { path: 'evenements', loadChildren: () => import('./features/evenements/evenements.routes').then(m => m.EVENEMENTS_ROUTES) },
  { path: 'associatif', loadChildren: () => import('./features/associatif/associatif.routes').then(m => m.ASSOCIATIF_ROUTES) },
  { path: 'salle', loadChildren: () => import('./features/salle/salle.routes').then(m => m.SALLE_ROUTES) },
  { path: 'equipe', loadChildren: () => import('./features/equipe/equipe.routes').then(m => m.EQUIPE_ROUTES) },
  { path: 'login', loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES) },
  { path: 'mentions-legales', loadChildren: () => import('./features/legal/legal.routes').then(m => m.LEGAL_ROUTES) },
  { path: 'reservation', loadChildren: () => import('./features/reservation/reservation.routes').then(m => m.RESERVATION_ROUTES) },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '' }
];
