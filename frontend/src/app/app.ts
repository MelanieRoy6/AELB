import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/layout/header/header.component';
import { FooterComponent } from './shared/components/layout/footer/footer.component';
import { CookieBannerComponent } from './shared/components/cookie-banner/cookie-banner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CookieBannerComponent],
  template: `
    <div class="app-layout">
      <app-header></app-header>
      <main class="content-area">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
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
    .content-area { flex: 1; }
  `]
})
export class App {}
