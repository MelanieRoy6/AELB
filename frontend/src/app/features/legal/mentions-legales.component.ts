import { Component } from '@angular/core';

@Component({
  selector: 'app-mentions-legales',
  standalone: true,
  imports: [],
  template: `
    <div class="page-wrapper">

      <header class="page-hero">
        <div class="hero-inner">
          <span class="section-label">Informations légales</span>
          <h1>Mentions légales</h1>
          <p>Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN)</p>
        </div>
      </header>

      <div class="content-wrapper">

        <!-- 1. Édition du site -->
        <section class="legal-section">
          <div class="section-number">1</div>
          <div class="section-body">
            <h2>Édition du site</h2>
            <p>En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN), il est précisé aux utilisateurs du site <strong>www.aelbrains.fr</strong> l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi :</p>

            <dl class="info-list">
              <dt>Propriétaire / Éditeur du site</dt>
              <dd>Amicale Laïque de Brains (Association loi 1901)</dd>

              <dt>Siège social</dt>
              <dd>7 rue Jules Verne, 44830 Brains</dd>

              <dt>Téléphone</dt>
              <dd><a href="tel:0240326016">02.40.32.60.16</a></dd>

              <dt>Adresse e-mail</dt>
              <dd>
                <span class="placeholder">[Ajouter l'e-mail de contact de l'association]</span>
              </dd>

              <dt>Numéro RNA (ou SIREN)</dt>
              <dd>
                <span class="placeholder">[Ex : W44XXXXXX ou numéro SIRET]</span>
              </dd>

              <dt>Directeur de la publication</dt>
              <dd>
                <span class="placeholder">[Nom et Prénom du président ou représentant légal de l'association]</span>
                <span class="note">(Obligatoire pour une association)</span>
              </dd>

              <dt>Développement et Conception</dt>
              <dd>
                <a href="https://www.linkedin.com/in/m%C3%A9lanie-roy/" target="_blank" rel="noopener" class="linkedin-link">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  ROY Mélanie
                </a>
              </dd>
            </dl>
          </div>
        </section>

        <!-- 2. Hébergement -->
        <section class="legal-section">
          <div class="section-number">2</div>
          <div class="section-body">
            <h2>Hébergement</h2>
            <p class="legal-note">L'identification de l'hébergeur est une mention strictement obligatoire selon la loi LCEN.</p>
            <p>Le site <strong>www.aelbrains.fr</strong> est hébergé par :</p>

            <dl class="info-list">
              <dt>Nom de l'hébergeur</dt>
              <dd><span class="placeholder">[Ex : OVH, o2switch, Hostinger, etc.]</span></dd>

              <dt>Raison sociale</dt>
              <dd><span class="placeholder">[Ex : OVH SAS]</span></dd>

              <dt>Adresse postale</dt>
              <dd><span class="placeholder">[Adresse complète de l'hébergeur]</span></dd>

              <dt>Téléphone</dt>
              <dd><span class="placeholder">[Téléphone de l'hébergeur]</span></dd>
            </dl>
          </div>
        </section>

        <!-- 3. Propriété intellectuelle -->
        <section class="legal-section">
          <div class="section-number">3</div>
          <div class="section-body">
            <h2>Propriété intellectuelle</h2>
            <p>L'ensemble de ce site (structure générale, textes, graphismes, images animées ou non, photographies, logos) est la propriété exclusive de l'association <strong>Amicale Laïque de Brains</strong>, sauf mention contraire, et est protégé par les dispositions du Code de la propriété intellectuelle.</p>
            <p>Toute représentation ou reproduction totale ou partielle de ce site, par quelque procédé que ce soit, sans l'autorisation expresse et écrite de l'association Amicale Laïque de Brains est interdite et constituerait une contrefaçon sanctionnée par les articles L. 335-2 et suivants du Code de la propriété intellectuelle.</p>
          </div>
        </section>

        <!-- 4. Protection des données personnelles -->
        <section class="legal-section">
          <div class="section-number">4</div>
          <div class="section-body">
            <h2>Protection des données personnelles (RGPD)</h2>
            <p>Conformément au Règlement Général sur la Protection des Données (RGPD — Règlement UE 2016/679) et à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée, l'association Amicale Laïque de Brains s'engage à ce que la collecte et le traitement de vos données (photographies, adresses e-mail, formulaires de contact) soient transparents et sécurisés.</p>

            <dl class="info-list">
              <dt>Responsable du traitement</dt>
              <dd>L'association Amicale Laïque de Brains.</dd>

              <dt>Finalité</dt>
              <dd>Les données à caractère personnel (notamment les photos ou adresses e-mail) sont utilisées avec le consentement explicite des personnes concernées dans le cadre strict des activités et de la communication de l'association.</dd>

              <dt>Vos droits</dt>
              <dd>Vous disposez d'un droit d'accès, de rectification, d'effacement (droit à l'oubli), de limitation du traitement et d'opposition aux informations qui vous concernent.</dd>
            </dl>

            <h3>Exercer vos droits</h3>
            <p>Pour toute demande de modification, de retrait de consentement ou de suppression d'une donnée ou d'une photo parue par erreur, vous pouvez contacter l'association :</p>

            <dl class="info-list">
              <dt>Par courrier</dt>
              <dd>Amicale Laïque de Brains — 7 rue Jules Verne — 44830 Brains</dd>

              <dt>Par téléphone</dt>
              <dd><a href="tel:0240326016">02.40.32.60.16</a></dd>

              <dt>Par e-mail</dt>
              <dd><span class="placeholder">[Ajouter l'e-mail de contact]</span></dd>
            </dl>

            <div class="cnil-block">
              <p><strong>Réclamation :</strong> Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous disposez du droit d'introduire une réclamation auprès de la <strong>CNIL</strong> (Commission Nationale de l'Informatique et des Libertés) sur leur site <a href="https://www.cnil.fr" target="_blank" rel="noopener">www.cnil.fr</a>.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  `,
  styles: [`
    /* === Page === */
    .page-wrapper { background: #fff; }

    /* === Hero === */
    .page-hero {
      background: linear-gradient(155deg, rgba(30,61,47,.82) 0%, rgba(45,106,79,.50) 100%),
                  url('/salle-hero.png') center / cover no-repeat;
      padding: 72px 24px 60px;
      text-align: center;
    }

    .hero-inner { max-width: 640px; margin: 0 auto; color: white; }

    .section-label {
      display: inline-block;
      background: rgba(255,255,255,.18);
      border: 1px solid rgba(255,255,255,.30);
      color: white;
      padding: 4px 16px;
      border-radius: 50px;
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 14px;
    }

    .hero-inner h1 {
      font-size: 2.4rem;
      font-weight: 800;
      color: white;
      margin: 0 0 14px;
      text-shadow: 0 2px 12px rgba(0,0,0,.25);
    }

    .hero-inner p {
      font-size: 0.95rem;
      color: rgba(255,255,255,.82);
      line-height: 1.6;
      margin: 0;
    }

    /* === Contenu === */
    .content-wrapper {
      max-width: 820px;
      margin: 0 auto;
      padding: 64px 24px 100px;
      display: flex;
      flex-direction: column;
      gap: 48px;
    }

    /* === Section légale === */
    .legal-section {
      display: grid;
      grid-template-columns: 48px 1fr;
      gap: 24px;
      align-items: start;
    }

    .section-number {
      width: 48px;
      height: 48px;
      background: var(--g800, #2d6a4f);
      color: white;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      font-weight: 800;
      flex-shrink: 0;
      margin-top: 4px;
    }

    .section-body h2 {
      font-size: 1.35rem;
      font-weight: 800;
      color: var(--g900, #1e3d2f);
      margin: 0 0 16px;
    }

    .section-body h3 {
      font-size: 1rem;
      font-weight: 700;
      color: var(--g900, #1e3d2f);
      margin: 24px 0 12px;
    }

    .section-body p {
      color: var(--text-body, #3a4f42);
      font-size: 0.93rem;
      line-height: 1.75;
      margin: 0 0 14px;
    }

    .section-body p:last-child { margin-bottom: 0; }

    /* === Note légale === */
    .legal-note {
      background: #fffbf0;
      border-left: 3px solid #f59e0b;
      padding: 10px 14px;
      border-radius: 0 8px 8px 0;
      font-size: 0.85rem !important;
      color: #92400e !important;
      margin-bottom: 16px !important;
    }

    /* === Liste de définitions === */
    .info-list {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 10px 20px;
      margin: 16px 0;
      align-items: baseline;
    }

    .info-list dt {
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--g800, #2d6a4f);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      white-space: nowrap;
      padding-top: 1px;
    }

    .info-list dd {
      font-size: 0.93rem;
      color: var(--text-body, #3a4f42);
      line-height: 1.6;
      margin: 0;
    }

    .info-list a {
      color: var(--g800, #2d6a4f);
      text-decoration: none;
      font-weight: 600;
    }

    .info-list a:hover { text-decoration: underline; }

    /* Lien LinkedIn */
    .linkedin-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: #0a66c2;
      font-weight: 600;
      text-decoration: none;
      font-size: 0.93rem;
    }

    .linkedin-link:hover { text-decoration: underline; }

    /* Champs à compléter */
    .placeholder {
      background: #fef9c3;
      border: 1px dashed #d97706;
      color: #92400e;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 0.85rem;
      font-style: italic;
    }

    .note {
      display: block;
      font-size: 0.78rem;
      color: var(--text-muted, #556b5a);
      margin-top: 3px;
    }

    /* === Bloc CNIL === */
    .cnil-block {
      background: var(--g050, #edf5ee);
      border-left: 4px solid var(--g400, #52b788);
      border-radius: 0 12px 12px 0;
      padding: 16px 18px;
      margin-top: 20px;
    }

    .cnil-block p {
      margin: 0 !important;
      font-size: 0.92rem !important;
    }

    .cnil-block a {
      color: var(--g800, #2d6a4f);
      font-weight: 600;
    }

    .cnil-block a:hover { text-decoration: underline; }

    /* === Responsive === */
    @media (max-width: 600px) {
      .legal-section { grid-template-columns: 1fr; gap: 12px; }
      .section-number { width: 38px; height: 38px; font-size: 0.95rem; }
      .hero-inner h1 { font-size: 1.8rem; }
      .info-list { grid-template-columns: 1fr; gap: 4px 0; }
      .info-list dt { margin-top: 12px; }
    }
  `]
})
export class MentionsLegalesComponent {}
