import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';

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

    <!-- Qui sommes-nous ? -->
    <section class="about-section">
      <div class="about-inner">

        <!-- Intro -->
        <div class="about-intro">
          <span class="about-label">Qui sommes-nous ?</span>
          <h2>Les Amis des Écoles Laïques</h2>
          <p class="about-lead">
            Une association d'éducation populaire ouverte à toutes et tous, dans le respect des convictions individuelles
            et dans une totale indépendance à l'égard des partis politiques et des groupements confessionnels.
          </p>
        </div>

        <!-- Nos objectifs -->
        <div class="objectives-block">
          <h3 class="block-title">Nos objectifs</h3>
          <div class="objectives-grid">

            <div class="objective-card">
              <div class="obj-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="28" height="28" aria-hidden="true">
                  <path d="M12 20h9M12 20H3M12 20V4M4 4h16a1 1 0 0 1 1 1v7H3V5a1 1 0 0 1 1-1z"/>
                </svg>
              </div>
              <h4>Soutenir l'école publique</h4>
              <p>Apporter une aide matérielle et morale au développement et au rayonnement de l'enseignement public au sein du groupe scolaire Jules Verne.</p>
            </div>

            <div class="objective-card">
              <div class="obj-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="28" height="28" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
              </div>
              <h4>Défendre la laïcité</h4>
              <p>Promouvoir et protéger activement les lois et les valeurs laïques, pilier fondamental de notre vivre ensemble.</p>
            </div>

            <div class="objective-card">
              <div class="obj-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="28" height="28" aria-hidden="true">
                  <circle cx="9" cy="7" r="3"/>
                  <circle cx="17" cy="7" r="3"/>
                  <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
                  <path d="M19 11c1.66 0 3 1.34 3 3v2"/>
                </svg>
              </div>
              <h4>Rassembler et fédérer</h4>
              <p>Permettre à toutes les personnes qui se reconnaissent dans l'idéal laïc de se retrouver autour de projets communs.</p>
            </div>

          </div>
          <p class="objectives-note">
            Nous proposons et soutenons des activités éducatives, sportives et culturelles, ainsi que toute initiative propre
            à l'épanouissement physique et moral de la jeunesse.
          </p>
        </div>

        <!-- Bas de section : moyens d'action + réseau -->
        <div class="bottom-row">

          <div class="means-card">
            <div class="means-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
                <rect x="2" y="7" width="20" height="14" rx="2"/>
                <path d="M16 7V5a2 2 0 0 0-4 0v2M8 7V5a2 2 0 0 1 4 0"/>
              </svg>
            </div>
            <div>
              <h4>Moyens d'action</h4>
              <p>Pour atteindre ses objectifs, l'association dispose de la capacité juridique d'acquérir et de vendre les biens mobiliers et immobiliers nécessaires à son fonctionnement.</p>
            </div>
          </div>

          <div class="network-card">
            <div class="network-badge" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20"/>
              </svg>
            </div>
            <div>
              <h4>Notre réseau</h4>
              <p>Affiliée à la <strong>Ligue Française de l'Enseignement et de l'Éducation Permanente</strong> (C.G.O.L.), par l'intermédiaire de la Fédération des Amicales Laïques de Loire-Atlantique.</p>
            </div>
          </div>

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

        <!-- 3 cartes côte à côte -->
        <div class="feed-aside">
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
        </div>

        <!-- Carte Facebook en dernier -->
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

    /* === Qui sommes-nous ? === */
    .about-section {
      padding: 80px 0 72px;
      background: #fff;
    }

    .about-inner {
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 24px;
      display: flex;
      flex-direction: column;
      gap: 52px;
    }

    .about-intro {
      text-align: center;
      max-width: 740px;
      margin: 0 auto;
    }

    .about-label {
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

    .about-intro h2 {
      font-size: 2rem;
      font-weight: 800;
      color: var(--g900, #1e3d2f);
      margin: 0 0 18px;
    }

    .about-lead {
      font-size: 1.05rem;
      color: var(--text-muted, #556b5a);
      line-height: 1.75;
      margin: 0;
    }

    .block-title {
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--g900, #1e3d2f);
      margin: 0 0 24px;
      text-align: center;
    }

    .objectives-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-bottom: 24px;
    }

    .objective-card {
      background: var(--g010, #f6faf7);
      border: 1px solid var(--border, rgba(45,106,79,.15));
      border-radius: 20px;
      padding: 26px 22px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }

    .objective-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-md, 0 10px 32px rgba(30,61,47,.10));
    }

    .obj-icon {
      width: 52px;
      height: 52px;
      background: var(--g050, #edf5ee);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--g800, #2d6a4f);
      flex-shrink: 0;
    }

    .objective-card h4 {
      font-size: 1rem;
      font-weight: 700;
      color: var(--g900, #1e3d2f);
      margin: 0;
    }

    .objective-card p {
      font-size: 0.9rem;
      color: var(--text-muted, #556b5a);
      line-height: 1.65;
      margin: 0;
    }

    .objectives-note {
      font-size: 0.92rem;
      color: var(--text-mid, #3d5c40);
      line-height: 1.7;
      text-align: center;
      max-width: 680px;
      margin: 0 auto;
      font-style: italic;
    }

    .bottom-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .means-card,
    .network-card {
      display: flex;
      gap: 18px;
      align-items: flex-start;
      padding: 26px 24px;
      border-radius: 18px;
    }

    .means-card {
      background: var(--g050, #edf5ee);
      border: 1px solid rgba(45, 106, 79, 0.2);
      border-left: 4px solid var(--g400, #52b788);
    }

    .network-card {
      background: #fff;
      border: 1px solid var(--border, rgba(45,106,79,.15));
      box-shadow: var(--shadow-sm, 0 4px 16px rgba(30,61,47,.08));
    }

    .means-icon,
    .network-badge {
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 12px;
      flex-shrink: 0;
      color: var(--g800, #2d6a4f);
    }

    .means-icon { background: rgba(82, 183, 136, 0.18); }
    .network-badge { background: var(--g050, #edf5ee); }

    .means-card h4,
    .network-card h4 {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--g900, #1e3d2f);
      margin: 0 0 8px;
    }

    .means-card p,
    .network-card p {
      font-size: 0.88rem;
      color: var(--text-muted, #556b5a);
      line-height: 1.65;
      margin: 0;
    }

    .network-card strong {
      color: var(--g800, #2d6a4f);
      font-weight: 700;
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

    /* === Layout feed : colonne verticale === */
    .feed-aside {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      margin-bottom: 36px;
    }

    /* === Carte Facebook (pleine largeur, layout horizontal) === */
    .fb-card {
      background: white;
      border-radius: 24px;
      padding: 36px 40px;
      box-shadow: 0 8px 40px rgba(0, 0, 0, 0.07);
      border: 1px solid rgba(0, 0, 0, 0.04);
      display: grid;
      grid-template-columns: auto 1fr auto;
      grid-template-rows: auto auto;
      column-gap: 36px;
      row-gap: 20px;
      align-items: start;
    }

    .fb-card-top {
      display: flex;
      align-items: center;
      gap: 16px;
      grid-column: 1;
      grid-row: 1 / 3;
      align-self: center;
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

    .fb-card-body {
      grid-column: 2;
      grid-row: 1;
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
      grid-column: 2;
      grid-row: 2;
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
      grid-column: 3;
      grid-row: 1 / 3;
      align-self: center;
      white-space: nowrap;
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
      .objectives-grid { grid-template-columns: 1fr; }
      .bottom-row { grid-template-columns: 1fr; }
      .feed-aside { grid-template-columns: 1fr; }
      /* Carte Facebook : repasse en colonne sur tablette */
      .fb-card {
        grid-template-columns: 1fr;
        grid-template-rows: auto;
      }
      .fb-card-top { grid-column: 1; grid-row: 1; }
      .fb-card-body { grid-column: 1; grid-row: 2; }
      .fb-card-stats { grid-column: 1; grid-row: 3; }
      .fb-cta { grid-column: 1; grid-row: 4; align-self: flex-start; }
      .hero-content h1 { font-size: 2.3rem; }
    }

    @media (max-width: 600px) {
      .hero { min-height: 440px; }
      .hero-content h1 { font-size: 1.9rem; }
      .hero-content p { font-size: 1rem; }
      .about-section { padding: 52px 0 44px; }
      .about-inner { gap: 36px; }
      .about-intro h2 { font-size: 1.6rem; }
      .about-lead { font-size: 0.97rem; }
      .means-card, .network-card { padding: 20px 16px; gap: 14px; }
      .fb-card { padding: 28px 20px; }
      .fb-card-stats { flex-direction: column; gap: 12px; }
    }
  `]
})
export class HomeComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.set({
      title: 'Salle Jean-Noël Prin à Brains – Location & Événements',
      description: 'L\'AELB met à disposition la Salle Jean-Noël Prin à Brains (44830) pour vos événements : mariage, anniversaire, concert, théâtre, apéro, vide-grenier. Jusqu\'à 150 personnes.',
      keywords: 'salle Brains, AELB, location salle Loire-Atlantique, salle des fêtes Brains, événement Brains 44830',
      path: '/'
    });
  }
}
