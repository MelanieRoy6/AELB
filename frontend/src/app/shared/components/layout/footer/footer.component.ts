import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="main-footer">
      <div class="footer-content">
        <p class="footer-centenary">
          Fondée en 1925 — 100 ans au service de Brains
          </p>
        <p>&copy; 2026 Amicale de l'École Laïque de Brains. Tous droits réservés.</p>
        <nav class="footer-nav">
          <a routerLink="/mentions-legales">Mentions Légales</a>
        </nav>
        <div class="footer-credit">
          <span>Développé par</span>
          <a
            href="https://www.linkedin.com/in/m%C3%A9lanie-roy/"
            target="_blank"
            rel="noopener"
            class="credit-link"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="14"
              height="14"
              aria-hidden="true"
            >
              <path
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
              />
            </svg>
            &#64;ROY Mélanie
          </a>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
    .main-footer {
      background: linear-gradient(135deg, #1e3d2f 0%, #2d6a4f 100%);
      border-top: 1px solid rgba(0, 0, 0, 0.18);
      padding: 40px 0;
      margin-top: 2px;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
      text-align: center;
    }

    .footer-centenary {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      color: #fce08a;
      font-size: 0.85rem;
      font-weight: 700;
      letter-spacing: 1.5px;
      margin-bottom: 16px;
      text-shadow: 0 1px 8px rgba(252, 224, 138, 0.4);
    }

    .footer-content p {
      color: rgba(255, 255, 255, 0.65);
      font-size: 0.9rem;
      margin-bottom: 12px;
    }

    .footer-nav a {
      color: rgba(255, 255, 255, 0.82);
      text-decoration: none;
      font-size: 0.85rem;
      transition: color 0.2s ease;
      border-bottom: 1px solid transparent;
    }
    .footer-nav a:hover {
      color: #fff;
      border-bottom-color: var(--g400, #52b788);
    }

    .footer-credit {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      margin-top: 14px;
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.45);
    }

    .credit-link {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      color: rgba(255, 255, 255, 0.75);
      font-weight: 600;
      text-decoration: none;
      transition: color 0.2s;
    }
    .credit-link:hover { color: #fff; }
  `,
  ],
})
export class FooterComponent {}
