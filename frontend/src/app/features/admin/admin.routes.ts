import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/admin.component').then(m => m.AdminComponent),
    children: [
      { path: 'accueil', loadComponent: () => import('./pages/dashboard-admin.component').then(m => m.DashboardAdminComponent) },
      { path: 'planning', loadComponent: () => import('./pages/planning-admin.component').then(m => m.PlanningAdminComponent) },
      { path: 'demandes', loadComponent: () => import('./pages/demandes-admin.component').then(m => m.DemandesAdminComponent) },
      { path: 'adherents', loadComponent: () => import('./pages/adherents-admin.component').then(m => m.AdherentsAdminComponent) },
      { path: 'medias', loadComponent: () => import('./pages/medias-admin.component').then(m => m.MediasAdminComponent) },
      { path: 'equipe', loadComponent: () => import('./pages/equipe-admin.component').then(m => m.EquipeAdminComponent) },
      { path: '', redirectTo: 'accueil', pathMatch: 'full' }
    ]
  }
];
