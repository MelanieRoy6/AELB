import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header>
      <nav class="main-nav">
        <div class="logo">AELB</div>
        <ul class="nav-links">
          <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Accueil</a></li>
          <li><a routerLink="/evenements" routerLinkActive="active">Évènements</a></li>
          <li><a routerLink="/associatif" routerLinkActive="active">Vie Associative</a></li>
          <li><a routerLink="/salle" routerLinkActive="active">La Salle</a></li>
          <li><a routerLink="/equipe" routerLinkActive="active">L'Équipe</a></li>
          <li><a routerLink="/reservation" class="app-button app-button-accent nav-cta">Réserver</a></li>
        </ul>
      </nav>
    </header>
  `,
  styles: [`
    header {
      background: #fff;
      border-bottom: 1px solid rgba(45, 106, 79, 0.12);
      padding: 14px 0;
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 2px 12px rgba(30, 61, 47, 0.06);
    }

    .main-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--g900, #1e3d2f);
      letter-spacing: -0.5px;
      text-decoration: none;
    }

    .nav-links {
      display: flex;
      list-style: none;
      gap: 30px;
      align-items: center;
      margin: 0;
      padding: 0;
    }

    .nav-links a {
      color: var(--g800, #2d6a4f);
      text-decoration: none;
      font-weight: 600;
      font-size: 0.95rem;
      transition: color 0.2s ease;
      position: relative;
      padding-bottom: 2px;
    }

    .nav-links a.active { color: var(--g900, #1e3d2f); }
    .nav-links a.active::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--g400, #52b788);
      border-radius: 2px;
    }

    .nav-links a:hover { color: var(--g900, #1e3d2f); }

    .nav-cta { padding: 9px 20px !important; font-size: 0.88rem !important; color: white !important; }

    @media (max-width: 768px) {
      .nav-links { gap: 16px; }
      .nav-links li:not(:last-child) { display: none; }
    }
  `]
})
export class HeaderComponent {}
