import { Component, OnInit, PLATFORM_ID, Inject, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-evenements',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="evenements-page">
      <section class="evenements-hero">
        <div class="hero-content">
          <h1>Évènements & Actualités</h1>
          <p>Restez informé des dernières nouvelles de l'AELB via notre page Facebook.</p>
        </div>
      </section>

      <div class="container">
        <div class="content-grid">
          <div class="info-side">
            <div class="app-card promo-card">
              <h3>Suivez-nous !</h3>
              <p>Rejoignez notre communauté sur les réseaux sociaux pour ne rien manquer des évènements, spectacles et activités associatives à Brains.</p>
              <a href="https://www.facebook.com/aelbrains/" target="_blank" class="app-button app-button-primary">
                Voir sur Facebook
              </a>
            </div>
            
            <div class="app-card contact-card">
              <h3>Une question ?</h3>
              <p>Vous souhaitez proposer un évènement ou obtenir des informations ?</p>
              <a href="mailto:contact@aelb-brains.fr" class="app-button app-button-secondary">Nous contacter</a>
            </div>

            <div class="app-card help-card" *ngIf="fbLoaded">
              <p class="help-text">Si le flux ne s'affiche pas, cela peut être dû à un bloqueur de publicités ou aux paramètres de confidentialité de votre navigateur.</p>
              <button (click)="refreshFeed()" class="app-button app-button-secondary btn-sm">Actualiser le flux</button>
            </div>
          </div>

          <div class="feed-side">
            <div class="app-card fb-card">
              <div class="fb-container">
                <div *ngIf="!fbLoaded" class="loading-fb">
                  <div class="spinner"></div>
                  <p>Connexion à Facebook...</p>
                </div>

                <!-- Facebook Page Plugin -->
                <div 
                  id="fb-page-container"
                  class="fb-page" 
                  [class.hidden]="!fbLoaded"
                  data-href="https://www.facebook.com/aelbrains/" 
                  data-tabs="timeline,events" 
                  data-width="500" 
                  data-height="800" 
                  data-small-header="false" 
                  data-adapt-container-width="true" 
                  data-hide-cover="false" 
                  data-show-facepile="true">
                  <blockquote cite="https://www.facebook.com/aelbrains/" class="fb-xfbml-parse-ignore">
                    <a href="https://www.facebook.com/aelbrains/">AELB Brains</a>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .evenements-hero {
      background: linear-gradient(rgba(29, 53, 87, 0.7), rgba(29, 53, 87, 0.4)), url('/salle-hero.png');
      background-size: cover;
      background-position: center;
      height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-align: center;
      margin-bottom: 50px;
    }
    .hero-content h1 { font-size: 2.5rem; margin-bottom: 10px; color: white; }
    .hero-content p { font-size: 1.1rem; color: rgba(255,255,255,0.9); }

    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px 60px; }
    .content-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 40px; }

    .promo-card, .contact-card, .help-card { padding: 30px; margin-bottom: 30px; text-align: center; }
    .promo-card h3, .contact-card h3 { margin-bottom: 15px; }
    .promo-card p, .contact-card p, .help-text { color: #64748b; margin-bottom: 25px; }
    .help-text { font-size: 0.85rem; margin-bottom: 15px; line-height: 1.4; }

    .fb-card { padding: 20px; background: white; min-height: 500px; display: flex; justify-content: center; overflow: hidden; }
    .fb-container { width: 100%; display: flex; flex-direction: column; align-items: center; position: relative; }

    .loading-fb { padding: 100px 0; text-align: center; color: #94a3b8; width: 100%; }
    .spinner { 
      width: 40px; height: 40px; border: 4px solid #f1f5f9; border-top: 4px solid #457b9d; 
      border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 15px;
    }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

    .hidden { opacity: 0; visibility: hidden; height: 0; }
    .btn-sm { padding: 8px 16px; font-size: 0.8rem; }

    @media (max-width: 900px) {
      .content-grid { grid-template-columns: 1fr; }
      .info-side { order: 2; }
      .feed-side { order: 1; }
    }
  `]
})
export class EvenementsComponent implements OnInit, AfterViewInit {
  fbLoaded = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initFacebookSDK();
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Small delay to ensure the DOM is ready for XFBML parsing
      setTimeout(() => this.refreshFeed(), 1500);
    }
  }

  initFacebookSDK(): void {
    const windowAny = window as any;

    // 1. Define the init callback
    windowAny.fbAsyncInit = () => {
      windowAny.FB.init({
        xfbml: true,
        version: 'v19.0'
      });
      this.fbLoaded = true;
      this.cdr.detectChanges();
    };

    // 2. Load the script if not already present
    if (document.getElementById('facebook-jssdk')) {
      this.fbLoaded = true;
      this.cdr.detectChanges();
      return;
    }

    const script = document.createElement('script');
    script.id = 'facebook-jssdk';
    script.src = 'https://connect.facebook.net/fr_FR/sdk.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    // 3. Safety timeout to hide loader even if SDK fails (e.g. adblock)
    setTimeout(() => {
      if (!this.fbLoaded) {
        this.fbLoaded = true;
        this.cdr.detectChanges();
        this.refreshFeed();
      }
    }, 4000);
  }

  refreshFeed(): void {
    const windowAny = window as any;
    if (windowAny.FB && windowAny.FB.XFBML) {
      windowAny.FB.XFBML.parse();
      console.log('Facebook XFBML parsed');
    }
  }
}
