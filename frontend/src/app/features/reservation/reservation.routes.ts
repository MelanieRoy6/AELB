import { Routes } from '@angular/router';

export const RESERVATION_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./pages/reservation.component').then(m => m.ReservationComponent) }
];
