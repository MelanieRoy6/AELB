import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CookieBannerComponent } from './shared/components/cookie-banner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CookieBannerComponent],
  template: `
    <div class="app-layout">
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

      <main class="content-area">
        <router-outlet></router-outlet>
      </main>

      <footer class="main-footer">
        <div class="footer-content">
          <p>&copy; 2026 Amicale de l'École Laïque de Brains. Tous droits réservés.</p>
          <nav class="footer-nav">
            <a routerLink="/mentions-legales">Mentions Légales</a>
          </nav>
          <div class="footer-credit">
            <span>Développé par</span>
            <a href="https://www.linkedin.com/in/m%C3%A9lanie-roy/" target="_blank" rel="noopener" class="credit-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              &#64;ROY Mélanie
            </a>
          </div>
        </div>
      </footer>

      <app-cookie-banner></app-cookie-banner>
    </div>
  `,
  styles: [`
    .app-layout {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: var(--g010, #f6faf7);
    }

    /* ── Header / Nav ─────────────────────────────────────────── */
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

    /* Logo : contraste #1e3d2f sur blanc = 13:1 AAA */
    .logo {
      font-size: 1.5rem;
      font-weight: 800;
      color: #1e3d2f;
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

    /* Liens nav : #2d6a4f sur blanc = 7:1 AAA */
    .nav-links a {
      color: #2d6a4f;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.95rem;
      transition: color 0.2s ease;
      position: relative;
      padding-bottom: 2px;
    }

    /* Actif : soulignement discret zen */
    .nav-links a.active {
      color: #1e3d2f;
    }
    .nav-links a.active::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 0;
      height: 2px;
      background: #52b788;
      border-radius: 2px;
    }

    .nav-links a:hover { color: #1e3d2f; }

    .nav-cta { padding: 9px 20px !important; font-size: 0.88rem !important; color: white !important; }

    .content-area { flex: 1; }

    /* ── Footer ──────────────────────────────────────────────── */
    .main-footer {
      background: #fff;
      border-top: 1px solid rgba(45, 106, 79, 0.12);
      padding: 40px 0;
      margin-top: 60px;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
      text-align: center;
    }

    /* Texte footer : #556b5a sur blanc = 5.8:1 AA */
    .footer-content p {
      color: #556b5a;
      font-size: 0.9rem;
      margin-bottom: 12px;
    }

    /* Lien footer : #3d5c40 sur blanc = 7.6:1 AAA */
    .footer-nav a {
      color: #3d5c40;
      text-decoration: none;
      font-size: 0.85rem;
      transition: color 0.2s ease;
      border-bottom: 1px solid transparent;
    }
    .footer-nav a:hover {
      color: #1e3d2f;
      border-bottom-color: #52b788;
    }

    .footer-credit {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      margin-top: 14px;
      font-size: 0.8rem;
      color: #8fa898;
    }

    .credit-link {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      color: #0a66c2;
      font-weight: 600;
      text-decoration: none;
      transition: opacity 0.2s;
    }

    .credit-link:hover { opacity: 0.75; }

    @media (max-width: 768px) {
      .nav-links { gap: 16px; }
      .nav-links li:not(:last-child) { display: none; }
    }
  `]
})
export class App {
  protected readonly title = signal('frontend');
}
