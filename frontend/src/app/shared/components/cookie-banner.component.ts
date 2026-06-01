import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cookie-banner" *ngIf="!accepted">
      <p>Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre politique de confidentialité.</p>
      <button (click)="accept()">Accepter</button>
    </div>
  `,
  styles: [`
    .cookie-banner { position: fixed; bottom: 0; width: 100%; background: #1d3557; color: white; padding: 15px; display: flex; justify-content: space-around; align-items: center; z-index: 2000; }
    button { background: #e63946; color: white; border: none; padding: 8px 20px; border-radius: 4px; cursor: pointer; }
  `]
})
export class CookieBannerComponent implements OnInit {
  accepted = false;

  ngOnInit() {
    this.accepted = localStorage.getItem('cookie-accepted') === 'true';
  }

  accept() {
    localStorage.setItem('cookie-accepted', 'true');
    this.accepted = true;
  }
}
