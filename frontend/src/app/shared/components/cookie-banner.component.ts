import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cookie-banner-container" *ngIf="!accepted">
      <div class="cookie-card app-card">
        <div class="cookie-content">
          <div class="cookie-icon">🍪</div>
          <p>Nous utilisons des cookies pour améliorer votre expérience sur le site de l'AELB.</p>
        </div>
        <div class="cookie-actions">
          <button class="app-button app-button-accent btn-sm" (click)="accept()">D'accord !</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cookie-banner-container {
      position: fixed;
      bottom: 24px;
      left: 24px;
      right: 24px;
      display: flex;
      justify-content: center;
      z-index: 9999;
    }
    .cookie-card {
      max-width: 580px;
      padding: 16px 22px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      background: rgba(255, 255, 255, 0.97);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(45, 106, 79, 0.18);
      box-shadow: 0 8px 32px rgba(30, 61, 47, 0.14);
    }
    .cookie-content { display: flex; align-items: center; gap: 14px; }
    .cookie-icon { font-size: 1.5rem; flex-shrink: 0; }
    /* Texte : #1e3d2f sur blanc = 13:1 AAA */
    .cookie-card p { margin: 0; font-size: 0.88rem; color: var(--g900, #1e3d2f); font-weight: 500; line-height: 1.45; }
    .btn-sm { padding: 8px 18px; font-size: 0.84rem; white-space: nowrap; }

    @media (max-width: 600px) {
      .cookie-card { flex-direction: column; text-align: center; gap: 14px; }
      .cookie-content { flex-direction: column; }
    }
  `]
})
export class CookieBannerComponent implements OnInit {
  accepted = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.accepted = localStorage.getItem('cookie-accepted') === 'true';
    } else {
      this.accepted = true; // Don't show on server
    }
  }

  accept() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cookie-accepted', 'true');
    }
    this.accepted = true;
  }
}
