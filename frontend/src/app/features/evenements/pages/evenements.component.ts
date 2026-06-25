import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../../core/services/seo.service';

interface Animation {
  image: string;
  alt: string;
  titre: string;
  periode: string;
  description: string;
}

@Component({
  selector: 'app-evenements',
  standalone: true,
  imports: [],
  template: `
    <div class="page-wrapper">

      <!-- Hero -->
      <section class="hero">
        <div class="hero-content">
          <h1>Évènements & Animations</h1>
          <p>Découvrez toutes les grandes animations organisées par l'AELB tout au long de l'année à Brains.</p>
        </div>
      </section>

      <!-- Animations -->
      <section class="animations-section">
        <div class="section-inner">

          <div class="section-title">
            <span class="section-label">Ce que nous organisons</span>
            <h2>Nos Grandes Animations</h2>
          </div>

          <div class="animation-list">
            @for (anim of animations; track anim.titre; let i = $index) {
              <div class="animation-row" [class.reverse]="i % 2 === 1">

                <div class="animation-text">
                  <span class="anim-periode">{{ anim.periode }}</span>
                  <h3>{{ anim.titre }}</h3>
                  <p>{{ anim.description }}</p>
                </div>

                <div class="animation-visual">
                  <img [src]="anim.image" [alt]="anim.alt" class="animation-photo" loading="lazy">
                </div>

              </div>
            }
          </div>

        </div>
      </section>

      <!-- CTA bas de page -->
      <section class="cta-section">
        <div class="cta-inner">
          <p class="cta-label">Restez informés</p>
          <h2>Ne manquez aucun événement</h2>
          <p class="cta-sub">Suivez notre page Facebook pour découvrir toutes les dates, nouveautés et surprises de l'AELB.</p>
          <div class="cta-actions">
            <a href="https://www.facebook.com/aelbrains/" target="_blank" rel="noopener" class="app-button app-button-primary">
              Suivre sur Facebook
            </a>
            <a href="/reservation" class="app-button app-button-secondary">
              Réserver la salle
            </a>
          </div>
        </div>
      </section>

    </div>
  `,
  styles: [`
    .page-wrapper { background: #fff; }

    .hero {
      background:
        linear-gradient(155deg, rgba(30,61,47,.82) 0%, rgba(45,106,79,.50) 100%),
        url('/salle-hero.png') center / cover no-repeat;
      padding: 80px 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .hero-content { max-width: 640px; color: white; }

    .hero-content h1 {
      font-size: 2.8rem;
      font-weight: 800;
      color: white;
      margin: 10px 0 16px;
      text-shadow: 0 2px 12px rgba(0,0,0,.25);
    }

    .hero-content p {
      font-size: 1.05rem;
      color: rgba(255,255,255,.88);
      line-height: 1.65;
      margin: 0;
    }

    .section-inner {
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 24px;
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
    }

    .section-title {
      text-align: center;
      margin-bottom: 56px;
    }

    .section-title h2 {
      font-size: 2rem;
      font-weight: 800;
      color: var(--g900, #1e3d2f);
      margin: 12px 0 0;
    }

    .animations-section {
      padding: 90px 0 100px;
      background: linear-gradient(180deg, var(--g010, #f6faf7) 0%, #fff 70%);
    }

    .animation-list {
      display: flex;
      flex-direction: column;
      gap: 80px;
    }

    .animation-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
    }

    .animation-row.reverse .animation-text { order: 2; }
    .animation-row.reverse .animation-visual { order: 1; }

    .anim-periode {
      display: inline-block;
      background: var(--g050, #edf5ee);
      color: var(--g800, #2d6a4f);
      padding: 3px 14px;
      border-radius: 50px;
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      margin-bottom: 14px;
    }

    .animation-text h3 {
      font-size: 1.65rem;
      font-weight: 800;
      color: var(--g900, #1e3d2f);
      margin: 0 0 16px;
    }

    .animation-text p {
      font-size: 1rem;
      color: var(--text-muted, #556b5a);
      line-height: 1.75;
      margin: 0;
    }

    .animation-visual {
      border-radius: 24px;
      overflow: hidden;
      aspect-ratio: 4 / 3;
      background: var(--g050, #edf5ee);
      box-shadow: 0 8px 32px rgba(30,61,47,.12);
    }

    .animation-photo {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.5s ease;
    }

    .animation-visual:hover .animation-photo { transform: scale(1.04); }

    .cta-section {
      padding: 90px 24px;
      background: linear-gradient(135deg, var(--g900, #1e3d2f) 0%, var(--g800, #2d6a4f) 100%);
      text-align: center;
    }

    .cta-inner { max-width: 560px; margin: 0 auto; }

    .cta-label {
      display: inline-block;
      background: rgba(255,255,255,.15);
      color: rgba(255,255,255,.9);
      padding: 4px 16px;
      border-radius: 50px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.4px;
      margin-bottom: 14px;
    }

    .cta-section h2 {
      font-size: 2rem;
      font-weight: 800;
      color: white;
      margin: 0 0 14px;
    }

    .cta-sub {
      color: rgba(255,255,255,.78);
      font-size: 1rem;
      line-height: 1.65;
      margin: 0 0 34px;
    }

    .cta-actions {
      display: flex;
      gap: 14px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .cta-section .app-button-secondary {
      background: rgba(255,255,255,.12);
      color: white;
      border-color: rgba(255,255,255,.35);
    }

    .cta-section .app-button-secondary:hover {
      background: rgba(255,255,255,.22);
    }

    @media (max-width: 860px) {
      .animation-row,
      .animation-row.reverse {
        grid-template-columns: 1fr;
        gap: 28px;
      }

      .animation-row .animation-text,
      .animation-row.reverse .animation-text { order: 1; }
      .animation-row .animation-visual,
      .animation-row.reverse .animation-visual { order: 2; }

      .animation-list { gap: 52px; }
      .hero-content h1 { font-size: 2.1rem; }
    }

    @media (max-width: 600px) {
      .hero { padding: 60px 20px; }
      .hero-content h1 { font-size: 1.8rem; }
      .cta-section h2 { font-size: 1.6rem; }
    }
  `]
})
export class EvenementsComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.set({
      title: 'Évènements & Animations – Concerts, Apéro, Vide-grenier, Théâtre à Brains',
      description: 'Découvrez les animations organisées par l\'AELB à Brains : concerts, apéros, vide-grenier, théâtre, expositions, carnaval. Des événements conviviaux pour toute la famille en Loire-Atlantique.',
      keywords: 'concert Brains, apéro Brains, vide-grenier Brains, théâtre Brains, animations AELB, événements Brains 44830',
      path: '/evenements'
    });
  }

  animations: Animation[] = [
    {
      image: '/EVENEMENTS/concert.jpg',
      alt: 'Soirée apéro-concert organisée par l\'AELB',
      titre: 'Apéro / Concert',
      periode: 'Tout au long de l\'année',
      description: 'Des soirées conviviales avec des musiciens locaux et régionaux, dans une ambiance chaleureuse et festive. L\'AELB ouvre ses portes pour des moments de partage autour d\'un verre et de la musique live, accessibles à tous, petits et grands.'
    },
    {
      image: '/EVENEMENTS/art.jpg',
      alt: 'Exposition d\'art organisée par l\'AELB',
      titre: 'Exposition d\'Art',
      periode: 'Printemps / Automne',
      description: 'L\'association met à l\'honneur les talents artistiques du territoire avec des expositions de peinture, sculpture et photographie. Un espace d\'expression unique, ouvert à tous les visiteurs, qui valorise la création locale et régionale.'
    },
    {
      image: '/EVENEMENTS/voiture.jpg',
      alt: 'Exposition de voitures anciennes à Brains',
      titre: 'Exposition Voitures Anciennes',
      periode: 'Été',
      description: 'Un rassemblement de véhicules de collection qui passionne les amateurs et éveille la curiosité des plus jeunes. Belles mécaniques, discussions passionnées et convivialité sont au programme de cette journée devenue un rendez-vous attendu de l\'été à Brains.'
    },
    {
      image: '/EVENEMENTS/videGrenier.jpg',
      alt: 'Vide grenier annuel de l\'AELB',
      titre: 'Vide Grenier',
      periode: 'Printemps',
      description: 'Le rendez-vous incontournable des chineurs de la région ! Notre vide grenier rassemble chaque année des dizaines d\'exposants et des centaines de visiteurs venus de toute la Loire-Atlantique pour une journée de bonnes affaires, de découvertes et de rencontres.'
    },
    {
      image: '/EVENEMENTS/theatre.jpg',
      alt: 'Représentation de théâtre de la troupe AELB',
      titre: 'Représentation de Théâtre',
      periode: 'Hiver / Printemps',
      description: 'La troupe de théâtre de l\'AELB répète toute l\'année pour vous offrir des spectacles de qualité. Humour, émotion et talent local se retrouvent sur scène dans une salle qui fait salle comble à chaque représentation — un moment de culture accessible à tous.'
    },
    {
      image: '/EVENEMENTS/scolaire.jpg',
      alt: 'Spectacle de fin d\'année scolaire',
      titre: 'Spectacle Scolaire',
      periode: 'Fin d\'année scolaire',
      description: 'En juin, les enfants de l\'école montent sur la scène de la salle Jean-Noël Prin pour présenter le fruit de leur travail annuel. Chants, danses et saynètes se succèdent dans un spectacle coloré et émouvant, temps fort de l\'année pour toutes les familles de Brains.'
    }
  ];
}
