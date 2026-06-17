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
        </div>
      </footer>

      <app-cookie-banner></app-cookie-banner>
    </div>
  `,
  styles: [`
    .app-layout { min-height: 100vh; display: flex; flex-direction: column; background: #fcfdfd; }
    
    header { 
      background: white; 
      box-shadow: 0 2px 10px rgba(0,0,0,0.05); 
      padding: 15px 0; 
      position: sticky; 
      top: 0; 
      z-index: 1000; 
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
      color: #1d3557; 
      letter-spacing: -1px; 
    }
    
    .nav-links { 
      display: flex; 
      list-style: none; 
      gap: 32px; 
      align-items: center; 
      margin: 0; 
      padding: 0; 
    }
    
    .nav-links a { 
      color: #457b9d; 
      text-decoration: none; 
      font-weight: 600; 
      font-size: 0.95rem;
      transition: color 0.2s ease;
    }
    
    .nav-links a:hover, .nav-links a.active { color: #e63946; }
    
    .nav-cta { padding: 8px 20px !important; font-size: 0.9rem !important; }
    
    .content-area { flex: 1; }
    
    .main-footer { 
      background: white; 
      border-top: 1px solid #f1f5f9; 
      padding: 40px 0; 
      margin-top: 60px; 
    }
    
    .footer-content { 
      max-width: 1200px; 
      margin: 0 auto; 
      padding: 0 24px; 
      text-align: center; 
    }
    
    .footer-content p { color: #64748b; font-size: 0.9rem; margin-bottom: 15px; }
    
    .footer-nav a { 
      color: #94a3b8; 
      text-decoration: none; 
      font-size: 0.85rem; 
      transition: color 0.2s ease;
    }
    
    .footer-nav a:hover { color: #457b9d; }

    @media (max-width: 768px) {
      .nav-links { display: none; } /* Simplify for mobile in this prototype */
    }
  `]
})
export class App {
  protected readonly title = signal('frontend');
}
