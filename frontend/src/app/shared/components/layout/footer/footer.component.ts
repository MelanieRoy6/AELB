import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
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
  `,
  styles: [`
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

    .footer-content p {
      color: var(--text-muted, #556b5a);
      font-size: 0.9rem;
      margin-bottom: 12px;
    }

    .footer-nav a {
      color: var(--text-mid, #3d5c40);
      text-decoration: none;
      font-size: 0.85rem;
      transition: color 0.2s ease;
      border-bottom: 1px solid transparent;
    }
    .footer-nav a:hover {
      color: var(--g900, #1e3d2f);
      border-bottom-color: var(--g400, #52b788);
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
  `]
})
export class FooterComponent {}
