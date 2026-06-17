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
      max-width: 600px; 
      padding: 16px 24px; 
      display: flex; 
      align-items: center; 
      justify-content: space-between; 
      gap: 20px;
      border: 1px solid rgba(255,255,255,0.1);
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
    }
    .cookie-content { display: flex; align-items: center; gap: 15px; }
    .cookie-icon { font-size: 1.5rem; }
    .cookie-card p { margin: 0; font-size: 0.9rem; color: #1d3557; font-weight: 500; }
    .btn-sm { padding: 8px 20px; font-size: 0.85rem; }
    
    @media (max-width: 600px) {
      .cookie-card { flex-direction: column; text-align: center; gap: 15px; }
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
