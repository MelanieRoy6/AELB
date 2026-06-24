import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header>
      <nav class="main-nav">
        <a class="logo" (click)="onLogoClick($event)" [routerLink]="isHome() ? null : '/'">
          <div class="logo-circle">
            <img src="/LOGO/logo_website%28sans%20contour%29.png" alt="Logo AELB" class="logo-img" />
          </div>
        </a>

        <!-- Lightbox logo -->
        @if (logoOpen) {
          <div class="logo-lightbox" (click)="logoOpen = false" role="dialog" aria-modal="true" aria-label="Logo AELB agrandi">
            <img src="/LOGO/logo_website%28sans%20contour%29.png" alt="Logo AELB" class="logo-lightbox-img" (click)="$event.stopPropagation()" />
            <button class="logo-lightbox-close" (click)="logoOpen = false" aria-label="Fermer">✕</button>
          </div>
        }

        <!-- Nav desktop -->
        <ul class="nav-links">
          <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Accueil</a></li>
          <li><a routerLink="/evenements" routerLinkActive="active">Évènements</a></li>
          <li><a routerLink="/associatif" routerLinkActive="active">Vie Associative</a></li>
          <li><a routerLink="/salle" routerLinkActive="active">La Salle</a></li>
          <li><a routerLink="/equipe" routerLinkActive="active">L'Équipe</a></li>
          <li><a routerLink="/reservation" class="app-button app-button-accent nav-cta">Réserver</a></li>
        </ul>

        <!-- Bouton burger (mobile uniquement) -->
        <button
          class="burger"
          [class.open]="menuOpen"
          (click)="toggleMenu()"
          [attr.aria-expanded]="menuOpen"
          aria-label="Menu de navigation">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <!-- Menu mobile : injecté dans le DOM uniquement quand ouvert -->
      @if (menuOpen) {
        <div class="mobile-menu">
          <ul>
            <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="closeMenu()">Accueil</a></li>
            <li><a routerLink="/evenements" routerLinkActive="active" (click)="closeMenu()">Évènements</a></li>
            <li><a routerLink="/associatif" routerLinkActive="active" (click)="closeMenu()">Vie Associative</a></li>
            <li><a routerLink="/salle" routerLinkActive="active" (click)="closeMenu()">La Salle</a></li>
            <li><a routerLink="/equipe" routerLinkActive="active" (click)="closeMenu()">L'Équipe</a></li>
            <li class="mobile-cta-item">
              <a routerLink="/reservation" class="app-button app-button-accent mobile-cta" (click)="closeMenu()">Réserver la salle</a>
            </li>
          </ul>
        </div>

        <!-- Overlay cliquable pour fermer -->
        <div class="overlay" (click)="closeMenu()" aria-hidden="true"></div>
      }
    </header>
  `,
  styles: [`
    header {
      background: linear-gradient(135deg, #1e3d2f 0%, #2d6a4f 100%);
      border-bottom: 1px solid rgba(0, 0, 0, 0.18);
      padding: 10px 0;
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.22);
    }

    .main-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 0 48px;
      box-sizing: border-box;
    }

    .logo {
      display: flex;
      align-items: center;
      text-decoration: none;
      flex-shrink: 0;
    }

    .logo-circle {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.18);
      flex-shrink: 0;
    }

    .logo-img {
      width: 72px;
      height: 72px;
      object-fit: contain;
      image-rendering: -webkit-optimize-contrast;
      image-rendering: crisp-edges;
      will-change: transform;
      transform: translateZ(0);
    }

    /* ── Nav desktop ── */
    .nav-links {
      display: flex;
      list-style: none;
      gap: 30px;
      align-items: center;
      margin: 0;
      padding: 0;
    }

    .nav-links a {
      color: rgba(255, 255, 255, 0.82);
      text-decoration: none;
      font-weight: 600;
      font-size: 0.95rem;
      transition: color 0.2s ease;
      position: relative;
      padding-bottom: 2px;
    }

    .nav-links a.active { color: #fff; }
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

    .nav-links a:hover { color: #fff; }
    .nav-cta { padding: 9px 20px !important; font-size: 0.88rem !important; color: white !important; }

    /* ── Bouton burger ── */
    .burger {
      display: none;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
      width: 40px;
      height: 40px;
      padding: 8px;
      background: none;
      border: none;
      cursor: pointer;
      border-radius: 8px;
      transition: background 0.2s ease;
    }

    .burger:hover { background: rgba(255, 255, 255, 0.12); }
    .burger:focus-visible { outline: 3px solid rgba(255, 255, 255, 0.5); outline-offset: 2px; }

    .burger span {
      display: block;
      width: 100%;
      height: 2px;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 2px;
      transition: transform 0.28s ease, opacity 0.28s ease;
      transform-origin: center;
    }

    /* Animation burger → croix */
    .burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .burger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
    .burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

    /* ── Menu mobile ── */
    .mobile-menu {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: linear-gradient(135deg, #1e3d2f 0%, #2d6a4f 100%);
      border-bottom: 1px solid rgba(0, 0, 0, 0.18);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
      padding: 16px 0 24px;
      z-index: 999;
      animation: slideDown 0.22s ease forwards;
    }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-10px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .mobile-menu ul {
      list-style: none;
      margin: 0;
      padding: 0 24px;
    }

    .mobile-menu li {
      border-bottom: 1px solid rgba(255, 255, 255, 0.10);
    }

    .mobile-menu li:last-child { border-bottom: none; }

    .mobile-menu a {
      display: block;
      padding: 14px 4px;
      color: rgba(255, 255, 255, 0.82);
      text-decoration: none;
      font-weight: 600;
      font-size: 1rem;
      transition: color 0.2s ease, padding-left 0.2s ease;
    }

    .mobile-menu a:hover { color: #fff; padding-left: 8px; }
    .mobile-menu a.active { color: #fff; }

    .mobile-cta-item {
      border-bottom: none !important;
      padding-top: 16px;
    }

    .mobile-cta {
      display: block !important;
      text-align: center;
      padding: 13px 24px !important;
      font-size: 1rem !important;
      color: white !important;
    }

    /* ── Overlay ── */
    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.35);
      z-index: 998;
      animation: fadeIn 0.22s ease forwards;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    /* ── Lightbox logo ── */
    .logo-lightbox {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.75);
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.2s ease forwards;
      cursor: zoom-out;
    }

    .logo-lightbox-img {
      max-width: 80vw;
      max-height: 80vh;
      width: auto;
      height: auto;
      object-fit: contain;
      border-radius: 16px;
      cursor: default;
      animation: zoomIn 0.22s ease forwards;
    }

    @keyframes zoomIn {
      from { opacity: 0; transform: scale(0.88); }
      to   { opacity: 1; transform: scale(1); }
    }

    .logo-lightbox-close {
      position: absolute;
      top: 20px;
      right: 24px;
      background: rgba(255, 255, 255, 0.15);
      border: none;
      color: #fff;
      font-size: 1.2rem;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.18s;
    }
    .logo-lightbox-close:hover { background: rgba(255, 255, 255, 0.28); }

    /* ── Responsive ── */
    @media (max-width: 768px) {
      .nav-links { display: none; }
      .burger { display: flex; }
    }
  `]
})
export class HeaderComponent {
  menuOpen = false;
  logoOpen = false;

  constructor(private router: Router) {}

  isHome(): boolean {
    return this.router.url === '/';
  }

  onLogoClick(event: Event): void {
    if (this.isHome()) {
      event.preventDefault();
      this.logoOpen = true;
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
