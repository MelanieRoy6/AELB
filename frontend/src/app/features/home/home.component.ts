import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  template: `
    <!-- Hero -->
    <section class="hero">
      <div class="hero-content">

        <h1>La Salle Jean-Noël Prin</h1>
        <p>Un espace chaleureux au cœur de Brains,<br>pour tous vos moments de partage.</p>
        <div class="hero-actions">
          <a routerLink="/reservation" class="app-button app-button-accent">Réserver la salle</a>
          <a routerLink="/salle" class="app-button app-button-ghost">Découvrir la salle</a>
        </div>
      </div>
    </section>

    <!-- Actualités Facebook -->
    <section class="news-section">
      <div class="section-inner">

        <div class="section-title">
          <span class="section-label">Actualités</span>
          <h2>Nos dernières nouvelles</h2>
          <p>Restez informés de tout ce qui se passe à l'AELB, directement depuis notre page Facebook</p>
        </div>

        <div class="feed-layout">

          <!-- Carte Facebook -->
          <div class="fb-card">
            <div class="fb-card-top">
              <div class="fb-icon-wrap" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1877F2" width="40" height="40">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <div class="fb-card-meta">
                <span class="fb-page-name">AELB – Brains</span>
                <span class="fb-page-handle">&#64;aelbrains</span>
              </div>
            </div>

            <div class="fb-card-body">
              <p>Retrouvez toutes nos actualités, événements et nouvelles de l'association directement sur notre page Facebook.</p>
            </div>

            <div class="fb-card-stats">
              <span class="fb-stat">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true">
                  <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"/>
                  <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                </svg>
                Suivez nos publications
              </span>
              <span class="fb-stat">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM6 8a2 2 0 11-4 0 2 2 0 014 0zM1.49 15.326a.78.78 0 01-.358-.442 3 3 0 014.308-3.516 6.484 6.484 0 00-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 01-2.07-.655zM16.44 15.98a4.97 4.97 0 002.07-.654.78.78 0 00.357-.442 3 3 0 00-4.308-3.517 6.484 6.484 0 011.907 3.96 2.32 2.32 0 01-.026.654zM18 8a2 2 0 11-4 0 2 2 0 014 0zM5.304 16.19a.844.844 0 01-.277-.71 5 5 0 019.947 0 .843.843 0 01-.277.71A6.975 6.975 0 0110 18a6.974 6.974 0 01-4.696-1.81z"/>
                </svg>
                Rejoignez la communauté
              </span>
            </div>

            <a
              href="https://www.facebook.com/aelbrains/"
              target="_blank"
              rel="noopener"
              class="fb-cta app-button app-button-primary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Voir notre page Facebook
            </a>
          </div>

          <!-- Cartes latérales -->
          <aside class="feed-aside">
            <div class="aside-card">
              <img src="/ICON/FollowUs.svg" alt="" aria-hidden="true" class="aside-icon">
              <h3>Restez connectés !</h3>
              <p>Suivez-nous sur Facebook pour ne manquer aucun événement, spectacle ou nouvelle de l'AELB.</p>
              <a href="https://www.facebook.com/aelbrains/" target="_blank" rel="noopener" class="app-button app-button-primary">
                Notre page Facebook
              </a>
            </div>

            <div class="aside-card">
              <img src="/ICON/HomeSalle.svg" alt="" aria-hidden="true" class="aside-icon">
              <h3>Réservez la salle</h3>
              <p>Organisez votre prochain événement dans un cadre convivial et bien équipé, en plein cœur de Brains.</p>
              <a routerLink="/reservation" class="app-button app-button-accent">Faire une demande</a>
            </div>

            <div class="aside-card">
              <img src="/ICON/Question.svg" alt="" aria-hidden="true" class="aside-icon">
              <h3>Une question ?</h3>
              <p>Notre équipe est disponible pour vous accompagner dans votre projet d'événement.</p>
              <a href="mailto:contact@aelb-brains.fr" class="app-button app-button-secondary">Nous écrire</a>
            </div>
          </aside>

        </div>
      </div>
    </section>
  `,
  styles: [`
    /* === Hero === */
    .hero {
      background:
        linear-gradient(155deg, rgba(30, 61, 47, 0.78) 0%, rgba(45, 106, 79, 0.42) 100%),
        url('/salle-hero-derrière.png') center / cover no-repeat;
      min-height: 540px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 60px 24px;
    }

    .hero-content {
      text-align: center;
      color: white;
      max-width: 680px;
    }

    .hero-content h1 {
      color: white;
      font-size: 3rem;
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 18px;
      text-shadow: 0 2px 12px rgba(0, 0, 0, 0.25);
    }

    .hero-content p {
      font-size: 1.15rem;
      color: rgba(255, 255, 255, 0.92);
      margin-bottom: 38px;
      line-height: 1.65;
    }

    .hero-actions {
      display: flex;
      gap: 14px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .app-button-ghost {
      background: rgba(255, 255, 255, 0.14);
      backdrop-filter: blur(8px);
      border: 2px solid rgba(255, 255, 255, 0.5);
      color: white;
    }

    /* === Section actualités === */
    .news-section {
      padding: 90px 0 100px;
      background: linear-gradient(180deg, var(--g010, #f6faf7) 0%, #fff 60%);
    }

    .section-inner {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }

    .section-title {
      text-align: center;
      margin-bottom: 56px;
    }

    .section-label {
      display: inline-block;
      background: var(--g050, #edf5ee);
      color: var(--g800, #2d6a4f);
      padding: 5px 18px;
      border-radius: 50px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 14px;
    }

    .section-title h2 {
      font-size: 2.1rem;
      font-weight: 800;
      margin-bottom: 12px;
      color: var(--g900, #1e3d2f);
    }

    .section-title p {
      color: var(--text-muted, #556b5a);
      font-size: 1rem;
      max-width: 460px;
      margin: 0 auto;
      line-height: 1.6;
    }

    /* === Layout feed === */
    .feed-layout {
      display: grid;
      grid-template-columns: 1fr 320px;
      gap: 36px;
      align-items: start;
    }

    /* === Carte Facebook === */
    .fb-card {
      background: white;
      border-radius: 24px;
      padding: 40px 36px;
      box-shadow: 0 8px 40px rgba(0, 0, 0, 0.07);
      border: 1px solid rgba(0, 0, 0, 0.04);
      display: flex;
      flex-direction: column;
      gap: 28px;
    }

    .fb-card-top {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .fb-icon-wrap {
      width: 64px;
      height: 64px;
      background: #e7f0fe;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .fb-card-meta {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .fb-page-name {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--g900, #1e3d2f);
    }

    .fb-page-handle {
      font-size: 0.85rem;
      color: var(--text-muted, #556b5a);
    }

    .fb-card-body p {
      color: var(--text-muted, #556b5a);
      font-size: 1rem;
      line-height: 1.65;
      margin: 0;
    }

    .fb-card-stats {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
      padding: 20px 0;
      border-top: 1px solid var(--border, rgba(45,106,79,.10));
      border-bottom: 1px solid var(--border, rgba(45,106,79,.10));
    }

    .fb-stat {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.88rem;
      font-weight: 600;
      color: var(--g700, #40916c);
    }

    .fb-cta {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      align-self: flex-start;
    }

    /* === Cartes latérales === */
    .feed-aside {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .aside-card {
      background: #fff;
      border-radius: 20px;
      padding: 28px 24px;
      box-shadow: var(--shadow-sm, 0 4px 16px rgba(30,61,47,.08));
      border: 1px solid var(--border, rgba(45,106,79,.15));
      text-align: center;
      transition: transform 0.28s ease, box-shadow 0.28s ease;
    }

    .aside-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-md, 0 10px 32px rgba(30,61,47,.10));
    }

    .aside-icon { width: 52px; height: 52px; display: block; margin: 0 auto 16px; }

    .aside-card h3 {
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--g900, #1e3d2f);
      margin-bottom: 8px;
    }

    .aside-card p {
      color: var(--text-muted, #556b5a);
      font-size: 0.88rem;
      line-height: 1.55;
      margin-bottom: 20px;
    }

    /* === Responsive === */
    @media (max-width: 960px) {
      .feed-layout { grid-template-columns: 1fr; }
      .feed-aside { flex-direction: row; flex-wrap: wrap; }
      .aside-card { flex: 1; min-width: 220px; }
      .hero-content h1 { font-size: 2.3rem; }
    }

    @media (max-width: 600px) {
      .hero { min-height: 440px; }
      .hero-content h1 { font-size: 1.9rem; }
      .hero-content p { font-size: 1rem; }
      .feed-aside { flex-direction: column; }
      .fb-card { padding: 28px 20px; }
      .fb-card-stats { flex-direction: column; gap: 12px; }
      .fb-cta { align-self: stretch; }
    }
  `]
})
export class HomeComponent {}
