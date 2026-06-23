import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AssociatifComponent } from './features/associatif/associatif.component';
import { SalleComponent } from './features/salle/salle.component';
import { EquipeComponent } from './features/equipe/equipe.component';
import { EvenementsComponent } from './features/evenements/evenements.component';
import { LoginComponent } from './features/login/login.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'evenements', component: EvenementsComponent },
  { path: 'associatif', component: AssociatifComponent },
  { path: 'salle', component: SalleComponent },
  { path: 'equipe', component: EquipeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'mentions-legales', loadComponent: () => import('./features/legal/mentions-legales.component').then(m => m.MentionsLegalesComponent) },
  { path: 'reservation', loadComponent: () => import('./features/reservation/reservation.component').then(m => m.ReservationComponent) },
  { 
    path: 'admin', 
    loadComponent: () => import('./features/admin/admin.component').then(m => m.AdminComponent),
    canActivate: [authGuard],
    children: [
      { path: 'accueil', loadComponent: () => import('./features/admin/dashboard-admin.component').then(m => m.DashboardAdminComponent) },
      { path: 'planning', loadComponent: () => import('./features/admin/planning-admin.component').then(m => m.PlanningAdminComponent) },
      { path: 'demandes', loadComponent: () => import('./features/admin/demandes-admin.component').then(m => m.DemandesAdminComponent) },
      { path: 'adherents', loadComponent: () => import('./features/admin/adherents-admin.component').then(m => m.AdherentsAdminComponent) },
      { path: 'medias', loadComponent: () => import('./features/admin/medias-admin.component').then(m => m.MediasAdminComponent) },
      { path: 'equipe', loadComponent: () => import('./features/admin/equipe-admin.component').then(m => m.EquipeAdminComponent) },
      { path: '', redirectTo: 'accueil', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' }
];
