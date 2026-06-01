import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AssociatifComponent } from './features/associatif/associatif.component';
import { SalleComponent } from './features/salle/salle.component';
import { EquipeComponent } from './features/equipe/equipe.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'associatif', component: AssociatifComponent },
  { path: 'salle', component: SalleComponent },
  { path: 'equipe', component: EquipeComponent },
  { path: 'reservation', loadComponent: () => import('./features/reservation/reservation.component').then(m => m.ReservationComponent) },
  { path: 'admin', loadComponent: () => import('./features/admin/admin.component').then(m => m.AdminComponent) },
  { path: '**', redirectTo: '' }
];
