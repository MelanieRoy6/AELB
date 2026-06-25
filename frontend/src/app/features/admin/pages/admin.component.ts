import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="mobile-topbar">
      <button class="hamburger" (click)="toggleSidebar()" [attr.aria-expanded]="sidebarOpen" aria-label="Menu">
        @if (!sidebarOpen) {
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            width="22" height="22"><line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        } @else {
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            width="22" height="22"><line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/></svg>
        }
      </button>
      <span class="mobile-title">Admin AELB</span>
    </div>

    @if (sidebarOpen) {
      <div class="sidebar-overlay" (click)="closeSidebar()"></div>
    }

    <div class="admin-layout">
      <aside class="sidebar" [class.open]="sidebarOpen">

        <div class="sidebar-header">
          <div class="sidebar-logo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
              width="22" height="22" aria-hidden="true">
              <path d="M12 20h9M12 20H3M12 20V4M4 4h16a1 1 0 0 1 1 1v7H3V5a1 1 0 0 1 1-1z"/>
            </svg>
          </div>
          <div>
            <span class="sidebar-title">Admin</span>
            <span class="sidebar-sub">AELB – Brains</span>
          </div>
        </div>

        <nav>
          <a routerLink="accueil" routerLinkActive="active" (click)="closeSidebar()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
              width="18" height="18" aria-hidden="true">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Accueil
          </a>

          <a routerLink="planning" routerLinkActive="active" (click)="closeSidebar()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
              width="18" height="18" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Planning Salle
          </a>

          <a routerLink="demandes" routerLinkActive="active" (click)="closeSidebar()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
              width="18" height="18" aria-hidden="true">
              <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
              <rect x="9" y="3" width="6" height="4" rx="2"/>
              <line x1="9" y1="12" x2="15" y2="12"/>
              <line x1="9" y1="16" x2="13" y2="16"/>
            </svg>
            Demandes Résa
          </a>

          <a routerLink="adherents" routerLinkActive="active" (click)="closeSidebar()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
              width="18" height="18" aria-hidden="true">
              <circle cx="9" cy="7" r="3"/>
              <circle cx="17" cy="7" r="3"/>
              <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
              <path d="M19 11c1.66 0 3 1.34 3 3v2"/>
            </svg>
            Adhérents
          </a>

          <a routerLink="medias" routerLinkActive="active" (click)="closeSidebar()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
              width="18" height="18" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            Médiathèque
          </a>

          <a routerLink="equipe" routerLinkActive="active" (click)="closeSidebar()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
              width="18" height="18" aria-hidden="true">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
            Équipe
          </a>
        </nav>

        <button (click)="logout()" class="logout-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
            width="18" height="18" aria-hidden="true">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Déconnexion
        </button>

      </aside>

      <main class="admin-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .mobile-topbar {
      display: none; align-items: center; gap: 14px; padding: 14px 16px;
      background: #edf5ee; border-bottom: 1px solid rgba(45, 106, 79, 0.15);
      position: sticky; top: 0; z-index: 200;
    }
    .mobile-title { font-size: 1rem; font-weight: 800; color: #1e3d2f; }
    .hamburger {
      background: none; border: none; cursor: pointer; color: #2d6a4f;
      padding: 4px; display: flex; border-radius: 8px; transition: background 0.15s;
    }
    .hamburger:hover { background: rgba(45,106,79,0.1); }
    .sidebar-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 299; }
    .admin-layout { display: flex; height: 100vh; background: #f6faf7; }
    .sidebar {
      width: 250px; background: #edf5ee; border-right: 1px solid rgba(45, 106, 79, 0.15);
      padding: 0; display: flex; flex-direction: column; flex-shrink: 0;
    }
    .sidebar-header {
      display: flex; align-items: center; gap: 12px; padding: 24px 20px 20px;
      border-bottom: 1px solid rgba(45, 106, 79, 0.15); margin-bottom: 12px;
    }
    .sidebar-logo {
      width: 40px; height: 40px; background: #2d6a4f; border-radius: 10px;
      display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0;
    }
    .sidebar-title { display: block; font-size: 0.95rem; font-weight: 800; color: #1e3d2f; line-height: 1.2; }
    .sidebar-sub { display: block; font-size: 0.75rem; color: #52b788; font-weight: 500; }
    nav { display: flex; flex-direction: column; gap: 2px; padding: 0 12px; flex: 1; }
    nav a {
      display: flex; align-items: center; gap: 10px; color: #2d6a4f; text-decoration: none;
      padding: 11px 14px; border-radius: 10px; font-size: 0.9rem; font-weight: 600;
      transition: background 0.18s ease, color 0.18s ease;
    }
    nav a svg { flex-shrink: 0; opacity: 0.8; }
    nav a:hover { background: rgba(45, 106, 79, 0.1); color: #1e3d2f; }
    nav a.active { background: #2d6a4f; color: white; }
    nav a.active svg { opacity: 1; }
    .logout-btn {
      display: flex; align-items: center; gap: 10px; margin: 12px; padding: 11px 14px;
      background: rgba(220, 53, 69, 0.08); color: #c0392b;
      border: 1px solid rgba(220, 53, 69, 0.2); border-radius: 10px;
      font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: background 0.18s ease;
    }
    .logout-btn:hover { background: rgba(220, 53, 69, 0.15); }
    .admin-content { flex: 1; padding: 32px; overflow-y: auto; background: #f6faf7; }

    @media (max-width: 768px) {
      .mobile-topbar { display: flex; }
      .sidebar-overlay { display: block; }
      .admin-layout { height: calc(100vh - 53px); }
      .admin-content { padding: 20px 16px; }
      .sidebar {
        position: fixed; top: 0; left: 0; height: 100vh; z-index: 300;
        transform: translateX(-100%);
        transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: none; width: 260px;
      }
      .sidebar.open { transform: translateX(0); box-shadow: 4px 0 24px rgba(0,0,0,0.15); }
    }
  `]
})
export class AdminComponent {
  sidebarOpen = false;

  constructor(private authService: AuthService, private router: Router) {}

  toggleSidebar(): void { this.sidebarOpen = !this.sidebarOpen; }
  closeSidebar(): void  { this.sidebarOpen = false; }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
