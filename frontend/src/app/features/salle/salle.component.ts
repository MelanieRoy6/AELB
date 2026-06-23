import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-salle',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="salle-page">
      <section class="salle-hero">
        <div class="hero-content">
          <h1>La Salle Jean-Noël Prin</h1>
          <p>Un espace de vie et de culture au cœur de la commune de Brains.</p>
        </div>
      </section>

      <div class="salle-container">
        <section class="main-info">
          <div class="info-grid">
            <div class="info-text app-card">
              <h2>Un équipement polyvalent</h2>
              <p>La salle Jean-Noël Prin est l'équipement phare de l'AELB. Elle accueille aussi bien des spectacles de théâtre que des réceptions privées ou des réunions d'entreprises.</p>
              <ul class="features-list">
                <li>
                  <span class="icon"><img src="/ICON/PeopleCapacity.svg" alt="" aria-hidden="true" class="icon-img"></span>
                  <div>
                    <strong>Capacité</strong>
                    <p>Jusqu'à 150 personnes assises</p>
                  </div>
                </li>
                <li>
                  <span class="icon"><img src="/ICON/Equipment.svg" alt="" aria-hidden="true" class="icon-img"></span>
                  <div>
                    <strong>Équipements</strong>
                    <p>Scène, sonorisation, éclairage, cuisine équipée</p>
                  </div>
                </li>
                <li>
                  <span class="icon"><img src="/ICON/Accesibility.svg" alt="" aria-hidden="true" class="icon-img"></span>
                  <div>
                    <strong>Accessibilité</strong>
                    <p>Entièrement accessible PMR</p>
                  </div>
                </li>
              </ul>
              <a routerLink="/reservation" class="app-button app-button-primary cta-full">Faire une demande de réservation</a>
            </div>

            <div class="info-map app-card">
              <h3>Plan d'accès</h3>
              <div class="map-wrapper">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2711.9613148152433!2d-1.72352822322501!3d47.17124991810967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4805f2713e790a13%3A0x66c897c8d88e0186!2s7%20Rue%20Jules%20Verne%2C%2044830%20Brains!5e0!3m2!1sfr!2sfr!4v1711200000000!5m2!1sfr!2sfr"
                  width="100%"
                  height="300"
                  style="border:0;"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
              <div class="address-footer">
                <span class="pin">📍</span>
                <p>7 rue Jules Verne, 44830 Brains</p>
              </div>
            </div>
          </div>
        </section>

        <!-- ══ Présentation détaillée ══ -->
        <section class="detail-section">

          <!-- Intro -->
          <div class="detail-intro">
            <p class="detail-lead">
              Vous recherchez le lieu idéal pour vos événements, repas de famille ou banquets ?
              Située au cœur de nos espaces, la Salle Jean-Noël Prin offre une capacité d'accueil de
              <strong>130 personnes assises</strong> dans un cadre fonctionnel et chaleureux.
            </p>
          </div>

          <!-- Volumes -->
          <div class="detail-block">
            <h2 class="block-heading">
              <span class="heading-icon" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="24" height="24">
                  <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                </svg>
              </span>
              Des volumes adaptés à tous vos événements
            </h2>
            <p class="block-sub">L'espace se compose de plusieurs zones modulables pour s'adapter à vos besoins.</p>

            <div class="spaces-grid">

              <div class="space-card">
                <div class="space-top">
                  <div class="space-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="26" height="26" aria-hidden="true">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                      <polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                  </div>
                  <span class="space-sqm">120 m²</span>
                </div>
                <h3>La salle principale</h3>
                <p>Belle surface lumineuse et spacieuse, idéale pour vos tablées et votre piste de danse.</p>
              </div>

              <div class="space-card">
                <div class="space-top">
                  <div class="space-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="26" height="26" aria-hidden="true">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  </div>
                  <span class="space-sqm">50 m²</span>
                </div>
                <h3>Une vraie scène</h3>
                <p>Parfaite pour accueillir un DJ, un groupe de musique, un spectacle ou un discours.</p>
              </div>

              <div class="space-card">
                <div class="space-top">
                  <div class="space-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="26" height="26" aria-hidden="true">
                      <path d="M13 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7"/>
                      <path d="M18 2l4 4-10 10H8v-4L18 2z"/>
                    </svg>
                  </div>
                  <span class="space-sqm">60 m²</span>
                </div>
                <h3>Espace d'accueil &amp; dégagement</h3>
                <p>Grand couloir idéal pour installer un vestiaire ou un espace d'émargement.</p>
              </div>

            </div>
          </div>

          <!-- Cuisine -->
          <div class="detail-block">
            <div class="cuisine-card">
              <div class="cuisine-left">
                <div class="cuisine-title-row">
                  <div class="cuisine-icon-wrap" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="26" height="26">
                      <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
                      <line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
                    </svg>
                  </div>
                  <div>
                    <h2>Une cuisine équipée pour vos repas</h2>
                    <span class="cuisine-sqm-badge">Espace traiteur — 50 m²</span>
                  </div>
                </div>
                <ul class="equip-list">
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                    2 feux à gaz pour réchauffer vos plats
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                    2 grands réfrigérateurs
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                    1 lave-vaisselle professionnel
                  </li>
                </ul>
              </div>
              <div class="mobilier-callout">
                <div class="callout-icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </div>
                <div>
                  <strong>Le + de la location</strong>
                  <p>Le mobilier (tables et chaises) est entièrement mis à votre disposition et <strong>compris dans le tarif</strong>. Aucun frais caché !</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Extérieur -->
          <div class="detail-block">
            <div class="exterior-card">
              <div class="exterior-text">
                <div class="ext-icon-wrap" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="28" height="28">
                    <path d="M17 8C8 10 5.9 16.17 3.82 19c-.86 1.23-1.5 2-3.82 2"/>
                    <path d="M3 22c0 0 8.5-6 13.5-14"/>
                    <path d="M21 2s-4 2-4 8"/>
                    <path d="M21 2s-8.5 2-10 8"/>
                  </svg>
                </div>
                <h2>Un cadre extérieur exceptionnel et modulable</h2>
                <p>
                  Le véritable point fort de l'Espace Jean-Noël Prin réside dans son <strong>immense parc verdoyant</strong>
                  qui entoure la salle. Cet écrin de verdure est entièrement modulable selon vos envies : vous pouvez y
                  installer des barnums, des tentes nomades ou des structures événementielles pour vos cocktails en plein air,
                  vins d'honneur ou cérémonies laïques.
                </p>
                <p>
                  De plus, ce vaste espace permet à l'ensemble de vos convives de <strong>stationner très facilement</strong>
                  et en toute sécurité à proximité immédiate de la salle.
                </p>
              </div>
              <div class="exterior-tags">
                <span class="ext-tag">Barnums &amp; tentes</span>
                <span class="ext-tag">Cocktails en plein air</span>
                <span class="ext-tag">Cérémonies laïques</span>
                <span class="ext-tag">Parking facile</span>
              </div>
            </div>
          </div>

        </section>

        <section class="galerie">
          <div class="section-header">
            <h2>Galerie Photos</h2>
            <p>Découvrez la salle en images lors de différents événements.</p>
          </div>

          <div class="galerie-placeholder">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" width="48" height="48" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <p>La galerie photos arrive bientôt.</p>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .salle-hero {
      background:
        linear-gradient(155deg, rgba(30, 61, 47, 0.78) 0%, rgba(45, 106, 79, 0.42) 100%),
        url('/salle-hero.png') center / cover no-repeat;
      height: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-align: center;
      margin-bottom: 60px;
    }
    .hero-content h1 { font-size: 3rem; margin-bottom: 10px; color: white; text-shadow: 0 2px 10px rgba(0,0,0,.25); }
    .hero-content p { font-size: 1.15rem; color: rgba(255,255,255,0.92); }

    .salle-container { max-width: 1200px; margin: 0 auto; padding: 0 24px 60px; }

    .section-header { text-align: center; margin-bottom: 40px; }
    .section-header h2 { font-size: 2rem; margin-bottom: 10px; }
    .section-header p { color: var(--text-muted, #556b5a); }

    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; margin-bottom: 60px; }
    .info-text, .info-map { padding: 40px; display: flex; flex-direction: column; }

    .info-text h2 { margin-bottom: 20px; }
    .features-list { list-style: none; padding: 0; margin: 28px 0; }
    .features-list li { display: flex; gap: 15px; margin-bottom: 20px; align-items: flex-start; }
    .features-list .icon {
      background: var(--g050, #edf5ee);
      width: 52px; height: 52px;
      display: flex; align-items: center; justify-content: center;
      border-radius: 14px;
      flex-shrink: 0;
      border: 1px solid var(--border, rgba(45,106,79,.15));
    }
    .features-list .icon-img { width: 28px; height: 28px; display: block; }
    .features-list strong { display: block; color: var(--g900, #1e3d2f); font-size: 1rem; }
    .features-list p { margin: 2px 0 0; color: var(--text-muted, #556b5a); font-size: 0.9rem; }

    .cta-full { width: 100%; margin-top: auto; }

    .info-map h3 { margin-bottom: 20px; }
    .map-wrapper { border-radius: 16px; overflow: hidden; margin-bottom: 20px; border: 1px solid var(--border, rgba(45,106,79,.15)); }
    .address-footer { display: flex; align-items: center; gap: 10px; color: var(--g800, #2d6a4f); font-weight: 600; }
    .address-footer p { margin: 0; }

    .galerie-placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      padding: 60px 24px;
      color: var(--text-muted, #556b5a);
      border: 2px dashed rgba(45, 106, 79, 0.2);
      border-radius: 20px;
      background: var(--g010, #f6faf7);
    }
    .galerie-placeholder svg { color: var(--g400, #52b788); opacity: 0.6; }
    .galerie-placeholder p { margin: 0; font-size: 1rem; font-style: italic; }

    /* ══ Présentation détaillée ══ */
    .detail-section {
      margin-bottom: 60px;
      display: flex;
      flex-direction: column;
      gap: 48px;
    }

    /* Intro */
    .detail-intro {
      text-align: center;
      max-width: 760px;
      margin: 0 auto;
      padding: 0 8px;
    }
    .detail-lead {
      font-size: 1.08rem;
      color: var(--text-muted, #556b5a);
      line-height: 1.75;
      margin: 0;
    }
    .detail-lead strong { color: var(--g800, #2d6a4f); }

    /* Blocs */
    .detail-block { display: flex; flex-direction: column; }

    .block-heading {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--g900, #1e3d2f);
      margin: 0 0 8px;
    }
    .heading-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px; height: 44px;
      background: var(--g050, #edf5ee);
      border-radius: 12px;
      color: var(--g800, #2d6a4f);
      flex-shrink: 0;
    }
    .block-sub {
      color: var(--text-muted, #556b5a);
      font-size: 0.95rem;
      margin: 0 0 28px;
    }

    /* Grille volumes */
    .spaces-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }

    .space-card {
      background: var(--g010, #f6faf7);
      border: 1px solid var(--border, rgba(45,106,79,.15));
      border-radius: 20px;
      padding: 26px 22px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }
    .space-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-md, 0 10px 32px rgba(30,61,47,.10));
    }
    .space-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .space-icon {
      width: 50px; height: 50px;
      background: var(--g050, #edf5ee);
      border-radius: 13px;
      display: flex; align-items: center; justify-content: center;
      color: var(--g800, #2d6a4f);
    }
    .space-sqm {
      font-size: 1.1rem;
      font-weight: 800;
      color: var(--accent, #9e5524);
      background: rgba(158, 85, 36, 0.1);
      padding: 4px 12px;
      border-radius: 50px;
    }
    .space-card h3 {
      font-size: 1rem;
      font-weight: 700;
      color: var(--g900, #1e3d2f);
      margin: 0;
    }
    .space-card p {
      font-size: 0.88rem;
      color: var(--text-muted, #556b5a);
      line-height: 1.6;
      margin: 0;
    }

    /* Cuisine */
    .cuisine-card {
      background: #fff;
      border: 1px solid var(--border, rgba(45,106,79,.15));
      border-radius: 20px;
      box-shadow: var(--shadow-sm, 0 4px 16px rgba(30,61,47,.08));
      padding: 32px 32px 0;
      display: flex;
      flex-direction: column;
      gap: 0;
      overflow: hidden;
    }
    .cuisine-left { padding-bottom: 28px; }
    .cuisine-title-row {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 20px;
    }
    .cuisine-icon-wrap {
      width: 52px; height: 52px;
      background: var(--g050, #edf5ee);
      border-radius: 14px;
      display: flex; align-items: center; justify-content: center;
      color: var(--g800, #2d6a4f);
      flex-shrink: 0;
      margin-top: 4px;
    }
    .cuisine-title-row h2 {
      font-size: 1.4rem;
      font-weight: 800;
      color: var(--g900, #1e3d2f);
      margin: 0 0 6px;
    }
    .cuisine-sqm-badge {
      font-size: 0.78rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: var(--text-muted, #556b5a);
    }
    .equip-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .equip-list li {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.95rem;
      color: var(--text, #1a2e1d);
    }
    .equip-list li svg { color: var(--g700, #40916c); flex-shrink: 0; }

    .mobilier-callout {
      display: flex;
      gap: 16px;
      align-items: flex-start;
      background: rgba(158, 85, 36, 0.07);
      border-top: 3px solid var(--accent, #9e5524);
      padding: 22px 32px;
      margin: 0 -32px;
    }
    .callout-icon {
      width: 40px; height: 40px;
      display: flex; align-items: center; justify-content: center;
      color: var(--accent, #9e5524);
      flex-shrink: 0;
      margin-top: 2px;
    }
    .mobilier-callout strong { display: block; font-size: 0.95rem; font-weight: 700; color: var(--accent-alt, #7a3f18); margin-bottom: 4px; }
    .mobilier-callout p { margin: 0; font-size: 0.9rem; color: var(--text-muted, #556b5a); line-height: 1.6; }
    .mobilier-callout p strong { display: inline; color: var(--accent, #9e5524); }

    /* Extérieur */
    .exterior-card {
      background: linear-gradient(135deg, var(--g050, #edf5ee) 0%, var(--g010, #f6faf7) 100%);
      border: 1px solid rgba(45, 106, 79, 0.2);
      border-left: 4px solid var(--g400, #52b788);
      border-radius: 20px;
      padding: 32px 36px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .ext-icon-wrap {
      width: 54px; height: 54px;
      background: rgba(82, 183, 136, 0.2);
      border-radius: 14px;
      display: flex; align-items: center; justify-content: center;
      color: var(--g800, #2d6a4f);
      margin-bottom: 4px;
    }
    .exterior-text h2 {
      font-size: 1.4rem;
      font-weight: 800;
      color: var(--g900, #1e3d2f);
      margin: 0 0 14px;
    }
    .exterior-text p {
      font-size: 0.95rem;
      color: var(--text-muted, #556b5a);
      line-height: 1.7;
      margin: 0 0 10px;
    }
    .exterior-text p:last-child { margin-bottom: 0; }
    .exterior-text strong { color: var(--g800, #2d6a4f); }
    .exterior-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .ext-tag {
      background: #fff;
      border: 1px solid rgba(45, 106, 79, 0.2);
      border-radius: 50px;
      padding: 6px 16px;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--g800, #2d6a4f);
    }

    @media (max-width: 900px) {
      .info-grid { grid-template-columns: 1fr; }
      .spaces-grid { grid-template-columns: 1fr; }
      .hero-content h1 { font-size: 2.2rem; }
    }

    @media (max-width: 600px) {
      .salle-hero { height: 280px; }
      .hero-content h1 { font-size: 1.8rem; }
      .hero-content p { font-size: 1rem; }
      .info-text, .info-map { padding: 24px 20px; }
      .block-heading { font-size: 1.25rem; }
      .cuisine-card { padding: 24px 20px 0; }
      .mobilier-callout { margin: 0 -20px; padding: 18px 20px; }
      .exterior-card { padding: 24px 20px; }
    }
  `]
})
export class SalleComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.set({
      title: 'La Salle Jean-Noël Prin – Location salle mariage, concert, anniversaire à Brains',
      description: 'Louez la Salle Jean-Noël Prin à Brains (44830) : 150 personnes, scène 50 m², cuisine équipée, grand parc. Idéale pour mariage, anniversaire, concert, théâtre, banquet et cocktail.',
      keywords: 'location salle Brains, salle mariage Brains, salle anniversaire Brains, salle concert Brains, salle théâtre Brains, salle réception 44830, salle Jean-Noël Prin',
      path: '/salle'
    });
  }
}
