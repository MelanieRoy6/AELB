import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../core/services/data.service';
import { SeoService } from '../../core/services/seo.service';
import { MembreEquipe } from '../../core/models';

@Component({
  selector: 'app-equipe',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-wrapper">

      <!-- En-tête de page -->
      <div class="container">
        <div class="page-header">
          <img src="/ICON/PeopleCapacity.svg" alt="" aria-hidden="true" class="page-icon">
          <h1>Notre Équipe</h1>
        </div>
        <p class="intro">Découvrez les membres bénévoles qui animent l'Amicale au quotidien.</p>

        <!-- Grille équipe : vide pour l'instant -->
        @if (equipe.length > 0) {
          <div class="equipe-list">
            @for (membre of equipe; track membre.nom; let i = $index) {
              <div class="membre-card" [class.reverse]="i % 2 === 1">
                <div class="membre-photo-col">
                  @if (membre.photoUrl) {
                    <img [src]="membre.photoUrl" [alt]="membre.prenom + ' ' + membre.nom" class="membre-img">
                  } @else {
                    <div class="membre-avatar">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"
                        width="52" height="52" aria-hidden="true">
                        <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                      </svg>
                    </div>
                  }
                </div>
                <div class="membre-info">
                  <span class="role">{{ membre.role }}</span>
                  <h3>{{ membre.prenom }} {{ membre.nom }}</h3>
                  @if (membre.bio) { <p class="bio">{{ membre.bio }}</p> }
                </div>
              </div>
            }
          </div>
        } @else {
          <div class="equipe-placeholder">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" width="48" height="48" aria-hidden="true">
              <circle cx="9" cy="7" r="4"/>
              <circle cx="17" cy="7" r="4"/>
              <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
              <path d="M19 11c1.66 0 3 1.34 3 3v2"/>
            </svg>
            <p>La présentation de l'équipe arrive bientôt.</p>
          </div>
        }
      </div>

      <!-- Comment nous soutenir ? -->
      <section class="support-section">
        <div class="support-inner">

          <div class="support-header">
            <span class="support-label">Agir ensemble</span>
            <h2>Comment nous soutenir ?</h2>
            <p class="support-lead">
              Vous partagez nos valeurs et souhaitez agir à nos côtés ? Il existe de nombreuses façons
              de soutenir l'action de notre association et de faire vivre notre communauté.
            </p>
          </div>

          <div class="support-ways">

            <div class="way-card">
              <div class="way-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="28" height="28" aria-hidden="true">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div class="way-content">
                <h3>Rejoignez notre équipe de bénévoles</h3>
                <p>Participez à l'entretien de notre patrimoine, faites fonctionner nos différentes sections ou prêtez main-forte lors de l'organisation de nos manifestations.</p>
              </div>
            </div>

            <div class="way-card">
              <div class="way-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="28" height="28" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div class="way-content">
                <h3>Engagez-vous dans la gouvernance</h3>
                <p>Intégrez le Conseil d'Administration pour participer activement aux décisions et à l'avenir de l'association.</p>
              </div>
            </div>

            <div class="way-card">
              <div class="way-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="28" height="28" aria-hidden="true">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
              <div class="way-content">
                <h3>Devenez membre honoraire</h3>
                <p>Apportez-nous votre soutien moral et contribuez au rayonnement de nos actions.</p>
              </div>
            </div>

          </div>

          <div class="support-cta">
            <p class="cta-tagline">Chaque geste compte, rejoignez-nous !</p>
            <a
              href="mailto:contact@aelb-brains.fr?subject=Demande%20de%20bénévolat"
              class="app-button app-button-accent cta-btn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Faire une demande de bénévolat
            </a>
          </div>

        </div>
      </section>

    </div>
  `,
  styles: [`
    .page-wrapper { background: #fff; }

    /* ── En-tête ── */
    .container { padding: 40px 24px 60px; max-width: 1000px; margin: auto; }

    .page-header { display: flex; align-items: center; gap: 14px; margin-bottom: 12px; }
    .page-icon { width: 44px; height: 44px; flex-shrink: 0; }

    h1 { color: var(--g900, #1e3d2f); font-size: 2.2rem; font-weight: 800; margin: 0; }

    .intro {
      text-align: center;
      font-size: 1.05rem;
      color: var(--text-muted, #556b5a);
      margin-bottom: 48px;
    }

    /* ── Liste équipe ── */
    .equipe-list { display: flex; flex-direction: column; gap: 32px; }

    .membre-card {
      display: flex;
      align-items: center;
      gap: 40px;
      background: #fff;
      border-radius: 24px;
      box-shadow: var(--shadow-sm, 0 4px 16px rgba(30,61,47,.08));
      border: 1px solid var(--border, rgba(45,106,79,.15));
      overflow: hidden;
      transition: transform 0.28s ease, box-shadow 0.28s ease;
    }
    .membre-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-md, 0 10px 32px rgba(30,61,47,.10)); }
    .membre-card.reverse { flex-direction: row-reverse; }

    .membre-photo-col { flex-shrink: 0; }
    .membre-img {
      width: 220px;
      height: 260px;
      object-fit: cover;
      display: block;
    }
    .membre-avatar {
      width: 220px;
      height: 260px;
      background: var(--g010, #f0f7f2);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--g400, #52b788);
      opacity: 0.5;
    }

    .membre-info { padding: 28px 36px 28px 0; flex: 1; }
    .membre-card.reverse .membre-info { padding: 28px 0 28px 36px; }

    .membre-info h3 { color: var(--g900, #1e3d2f); font-size: 1.4rem; margin: 8px 0 14px; }
    .role {
      display: inline-block;
      background: var(--g010, #edf5ee);
      color: var(--g800, #2d6a4f);
      font-weight: 800;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 4px 14px;
      border-radius: 50px;
    }
    .bio { font-size: 0.95rem; color: var(--text-muted, #556b5a); line-height: 1.7; margin: 0; }

    /* ── Placeholder ── */
    .equipe-placeholder {
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
    .equipe-placeholder svg { color: var(--g400, #52b788); opacity: 0.6; }
    .equipe-placeholder p { margin: 0; font-size: 1rem; font-style: italic; }

    /* ── Section "Comment nous soutenir ?" ── */
    .support-section {
      background: linear-gradient(135deg, var(--g900, #1e3d2f) 0%, var(--g800, #2d6a4f) 100%);
      padding: 80px 0 90px;
    }

    .support-inner {
      max-width: 960px;
      margin: 0 auto;
      padding: 0 24px;
    }

    /* En-tête */
    .support-header { text-align: center; margin-bottom: 52px; }

    .support-label {
      display: inline-block;
      background: rgba(255, 255, 255, 0.15);
      color: rgba(255, 255, 255, 0.9);
      padding: 5px 18px;
      border-radius: 50px;
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 14px;
    }

    .support-header h2 {
      font-size: 2rem;
      font-weight: 800;
      color: #fff;
      margin: 0 0 16px;
    }

    .support-lead {
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.78);
      line-height: 1.7;
      max-width: 620px;
      margin: 0 auto;
    }

    /* Cartes */
    .support-ways {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 52px;
    }

    .way-card {
      display: flex;
      gap: 22px;
      align-items: flex-start;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 18px;
      padding: 26px 28px;
      transition: background 0.25s ease, border-color 0.25s ease;
    }

    .way-card:hover {
      background: rgba(255, 255, 255, 0.13);
      border-color: rgba(255, 255, 255, 0.25);
    }

    .way-icon {
      width: 54px;
      height: 54px;
      background: rgba(82, 183, 136, 0.25);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--g400, #52b788);
      flex-shrink: 0;
    }

    .way-content h3 {
      font-size: 1.05rem;
      font-weight: 700;
      color: #fff;
      margin: 0 0 8px;
    }

    .way-content p {
      font-size: 0.92rem;
      color: rgba(255, 255, 255, 0.72);
      line-height: 1.65;
      margin: 0;
    }

    /* CTA bas */
    .support-cta {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 22px;
    }

    .cta-tagline {
      font-size: 1.25rem;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.95);
      margin: 0;
      font-style: italic;
    }

    .cta-btn {
      font-size: 1rem !important;
      padding: 14px 32px !important;
      gap: 10px;
    }

    /* ── Responsive ── */
    @media (max-width: 700px) {
      .way-card { flex-direction: column; gap: 14px; padding: 22px 20px; }
      .support-header h2 { font-size: 1.6rem; }
      .cta-tagline { font-size: 1.1rem; }
    }

    @media (max-width: 700px) {
      .membre-card,
      .membre-card.reverse { flex-direction: column; }
      .membre-img, .membre-avatar { width: 100%; height: 260px; }
      .membre-info { padding: 20px 20px 24px !important; }
    }

    @media (max-width: 600px) {
      .container { padding: 24px 16px 40px; }
      .page-header { justify-content: center; }
      h1 { font-size: 1.8rem; }
      .intro { font-size: 1rem; margin-bottom: 32px; }
      .support-section { padding: 56px 0 64px; }
    }
  `]
})
export class EquipeComponent implements OnInit {
  equipe: MembreEquipe[] = [];

  private seo = inject(SeoService);

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.seo.set({
      title: 'Notre Équipe – Les bénévoles de l\'AELB à Brains',
      description: 'Rencontrez les bénévoles et membres du bureau de l\'AELB qui animent la Salle Jean-Noël Prin et organisent les événements à Brains (Loire-Atlantique, 44830).',
      keywords: 'équipe AELB, bénévoles Brains, bureau association AELB, membres association Brains',
      path: '/equipe'
    });
    this.dataService.getEquipe().subscribe(membres => {
      this.equipe = membres;
    });
  }
}
