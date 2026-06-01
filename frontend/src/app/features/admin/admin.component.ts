import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="admin-layout">
      <aside class="sidebar">
        <h3>Admin AELB</h3>
        <nav>
          <a routerLink="planning" routerLinkActive="active">Planning Salle</a>
          <a routerLink="demandes" routerLinkActive="active">Demandes Résa</a>
          <a routerLink="evenements" routerLinkActive="active">Événements</a>
          <a routerLink="adherents" routerLinkActive="active">Adhérents</a>
          <a routerLink="medias" routerLinkActive="active">Médiathèque</a>
          <a routerLink="equipe" routerLinkActive="active">Équipe</a>
          <button (click)="logout()" class="logout-btn">Déconnexion</button>
        </nav>
      </aside>
      <main class="admin-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .admin-layout { display: flex; height: 100vh; }
    .sidebar { width: 250px; background: #1d3557; color: white; padding: 20px; display: flex; flex-direction: column; }
    .sidebar h3 { text-align: center; margin-bottom: 30px; border-bottom: 1px solid #457b9d; padding-bottom: 15px; }
    .sidebar nav { display: flex; flex-direction: column; gap: 5px; }
    .sidebar a { color: #f1faee; text-decoration: none; padding: 12px 15px; border-radius: 6px; transition: 0.3s; }
    .sidebar a:hover, .sidebar a.active { background: #457b9d; }
    .admin-content { flex: 1; padding: 30px; overflow-y: auto; background: #f8f9fa; }
    .logout-btn { margin-top: auto; background: #e63946; color: white; border: none; padding: 10px; border-radius: 6px; cursor: pointer; font-weight: bold; }
  `]
})
export class AdminComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
