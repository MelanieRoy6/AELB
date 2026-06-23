import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../core/services/data.service';
import { Evenement } from '../../core/models';

interface Activite {
  image: string;
  alt: string;
  titre: string;
  description: string;
}

@Component({
  selector: 'app-associatif',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-wrapper">

      <!-- Hero -->
      <section class="hero">
        <div class="hero-content">
          <h1>Vie Associative</h1>
          <p>L'Amicale de l'École Laïque de Brains œuvre pour l'animation culturelle et sociale de notre commune depuis de nombreuses années.</p>
        </div>
      </section>

      <!-- Activités -->
      <section class="activites-section">
        <div class="section-inner">

          <div class="section-title">
            <span class="section-label">Ce que nous faisons</span>
            <h2>Nos Activités</h2>
          </div>

          <div class="activity-list">
            @for (activite of activites; track activite.titre; let i = $index) {
              <div class="activity-row" [class.reverse]="i % 2 === 1">

                <div class="activity-text">
                  <h3>{{ activite.titre }}</h3>
                  <p>{{ activite.description }}</p>
                </div>

                <div class="activity-visual">
                  <img [src]="activite.image" [alt]="activite.alt" class="activity-photo">
                </div>

              </div>
            }
          </div>

        </div>
      </section>

    </div>
  `,
  styles: [`
    /* === Page === */
    .page-wrapper {
      background: #fff;
    }

    /* === Hero === */
    .hero {
      background: linear-gradient(155deg, rgba(30,61,47,.82) 0%, rgba(45,106,79,.50) 100%),
                  url('/salle-hero.png') center / cover no-repeat;
      padding: 80px 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .hero-content {
      max-width: 640px;
      color: white;
    }

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

    /* === Layout commun === */
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

    /* === Section activités === */
    .activites-section {
      padding: 90px 0 100px;
      background: linear-gradient(180deg, var(--g010, #f6faf7) 0%, #fff 70%);
    }

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 80px;
    }

    /* Ligne : texte à gauche, photo à droite */
    .activity-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
    }

    /* Ligne inversée : photo à gauche, texte à droite */
    .activity-row.reverse .activity-text { order: 2; }
    .activity-row.reverse .activity-visual { order: 1; }

    .activity-text h3 {
      font-size: 1.6rem;
      font-weight: 800;
      color: var(--g900, #1e3d2f);
      margin: 0 0 16px;
    }

    .activity-text p {
      font-size: 1rem;
      color: var(--text-muted, #556b5a);
      line-height: 1.7;
      margin: 0;
    }

    /* Conteneur photo */
    .activity-visual {
      border-radius: 24px;
      overflow: hidden;
      aspect-ratio: 4 / 3;
      background: var(--g050, #edf5ee);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 32px rgba(30,61,47,.10);
    }

    /* Photo réelle */
    .activity-photo {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    /* Si c'est encore un SVG (icône), on le centre et on le redimensionne */
    .activity-visual img[src$=".svg"] {
      width: 40%;
      height: 40%;
      object-fit: contain;
      opacity: 0.7;
    }

    /* === Section actualités === */
    .actualites-section {
      padding: 80px 0 100px;
      background: #fff;
    }

    .news-item {
      display: flex;
      gap: 20px;
      border-bottom: 1px solid var(--border, rgba(45,106,79,.15));
      padding: 18px 0;
    }

    .news-date {
      font-weight: 700;
      color: var(--g800, #2d6a4f);
      min-width: 100px;
      font-size: 0.9rem;
      padding-top: 2px;
    }

    .news-content h3 {
      color: var(--g900, #1e3d2f);
      margin: 0 0 6px;
      font-size: 1rem;
    }

    .news-content p {
      color: var(--text-muted, #556b5a);
      margin: 0;
      font-size: 0.9rem;
      line-height: 1.55;
    }

    .empty-msg {
      color: var(--text-muted, #556b5a);
      font-style: italic;
    }

    /* === Responsive === */
    @media (max-width: 860px) {
      .activity-row,
      .activity-row.reverse {
        grid-template-columns: 1fr;
        gap: 28px;
      }

      /* Sur mobile, toujours : texte en haut, photo en bas */
      .activity-row .activity-text,
      .activity-row.reverse .activity-text { order: 1; }
      .activity-row .activity-visual,
      .activity-row.reverse .activity-visual { order: 2; }

      .activity-list { gap: 52px; }
      .hero-content h1 { font-size: 2.1rem; }
    }

    @media (max-width: 600px) {
      .hero { padding: 60px 20px; }
      .hero-content h1 { font-size: 1.8rem; }
    }
  `]
})
export class AssociatifComponent implements OnInit {
  actualites: Evenement[] = [];

  activites: Activite[] = [
    {
      image: '/ICON/Theater.svg',
      alt: 'Spectacle de théâtre',
      titre: 'Théâtre',
      description: 'Notre troupe répète toute l\'année pour vous proposer des spectacles de qualité, alliant humour, émotion et créativité. Un moment de partage unique pour tous les publics.'
    },
    {
      image: '/ICON/Concert.svg',
      alt: 'Cours de danse',
      titre: 'Danse',
      description: 'Des cours pour tous les âges et tous les niveaux, animés par des passionnés. Venez vous initier ou perfectionner votre technique dans une ambiance conviviale.'
    },
    {
      image: '/ICON/NightLife.svg',
      alt: 'Concert et événements',
      titre: 'Concerts & Événements',
      description: 'Organisation de concerts, brocantes et moments de convivialité tout au long de l\'année. Des rendez-vous festifs qui rassemblent la commune autour d\'une passion partagée.'
    },
    {
      image: '/ICON/Car.svg',
      alt: 'Expositions',
      titre: 'Expositions',
      description: 'Expositions d\'art et de véhicules anciens pour partager les passions de nos membres et de la commune. Un espace ouvert à toutes les créations et à toutes les collections.'
    },
    {
      image: '/ICON/Event.svg',
      alt: 'Vide-grenier annuel',
      titre: 'Vide-Grenier',
      description: 'Un grand vide-grenier annuel organisé chaque année aux alentours de septembre. Un rendez-vous incontournable à Brains, qui attire exposants et visiteurs de toute la région !'
    },
    {
      image: '/ICON/Ball.svg',
      alt: 'Boulodrome pétanque',
      titre: 'Boulodrome',
      description: 'Un espace convivial en plein air pour jouer à la pétanque entre amis, en famille ou en compétition. Le boulodrome de l\'AELB est ouvert à tous, débutants comme confirmés.'
    },
    {
      image: '/ICON/Kitchen.svg',
      alt: 'Atelier cuisine',
      titre: 'Atelier Cuisine',
      description: 'Des ateliers pour apprendre, partager et régaler autour de recettes du terroir et de créations culinaires. Chaque séance est une invitation à la découverte et au plaisir gustatif.'
    },
    {
      image: '/ICON/Floral.svg',
      alt: 'Atelier art floral',
      titre: 'Art Floral',
      description: 'Compositions, bouquets et créations végétales — un atelier créatif ouvert à toutes et à tous. Laissez libre cours à votre imagination avec l\'aide de nos animatrices passionnées.'
    }
  ];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getEvents('ACTU').subscribe(page => {
      this.actualites = page.content;
    });
  }
}
