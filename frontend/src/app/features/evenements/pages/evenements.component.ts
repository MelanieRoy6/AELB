import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../../core/services/seo.service';

interface Animation {
  image: string;
  alt: string;
  titre: string;
  periode: string;
  description: string;
  lienYoutube?: string;
}

@Component({
  selector: 'app-evenements',
  standalone: true,
  imports: [],
  templateUrl: './evenements.component.html',
  styleUrls: ['./evenements.component.css'],
})
export class EvenementsComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.set({
      title: 'Évènements & Animations – Concerts, Apéro, Vide-grenier, Théâtre à Brains',
      description:
        "Découvrez les animations organisées par l'AELB à Brains : concerts, apéros, vide-grenier, théâtre, expositions, carnaval. Des événements conviviaux pour toute la famille en Loire-Atlantique.",
      keywords:
        'concert Brains, apéro Brains, vide-grenier Brains, théâtre Brains, animations AELB, événements Brains 44830',
      path: '/evenements',
    });
  }

  animations: Animation[] = [
    {
      image: '/EVENEMENTS/concert.jpg',
      alt: "Soirée apéro-concert organisée par l'AELB",
      titre: 'Apéro / Concert',
      periode: "Tout au long de l'année",
      description:
        "Des soirées conviviales avec des musiciens locaux et régionaux, dans une ambiance chaleureuse et festive. L'AELB ouvre ses portes pour des moments de partage autour d'un verre et de la musique live, accessibles à tous, petits et grands.",
    },
    {
      image: '/EVENEMENTS/sportif.jpg',
      alt: "Rediffusion des grands événements sportifs sur grand écran",
      titre: 'Événements Sportifs',
      periode: "Ponctuellement, selon le calendrier sportif",
      description:
        "L'AELB vibre au rythme des grands rendez-vous sportifs ! À l'occasion des compétitions majeures (comme la Coupe du Monde de football), venez vibrer ensemble lors de rediffusions sur grand écran. Une ambiance de tribune, avec le bar ouvert pour partager ce moment convivial entre passionnés.",
    },
    {
      image: '/EVENEMENTS/art.jpg',
      alt: "Exposition d'art organisée par l'AELB",
      titre: "Exposition d'Art",
      periode: "Tout au long de l'année",
      description:
        "L'association met à l'honneur les talents artistiques du territoire avec des expositions de peinture, sculpture et photographie. Un espace d'expression unique, ouvert à tous les visiteurs, qui valorise la création locale et régionale.",
    },
    {
      image: '/EVENEMENTS/voiture.jpg',
      alt: 'Exposition de voitures anciennes à Brains',
      titre: 'Exposition Voitures Anciennes',
      periode: 'Printemps / Été',
      description:
        "Un rassemblement de véhicules de collection qui passionne les amateurs et éveille la curiosité des plus jeunes. Belles mécaniques, discussions passionnées et convivialité sont au programme de cette journée devenue un rendez-vous attendu de l'été à Brains.",
    },
    {
      image: '/EVENEMENTS/videGrenier.jpg',
      alt: "Vide grenier annuel de l'AELB",
      titre: 'Vide Grenier',
      periode: 'Été',
      description:
        "Le rendez-vous incontournable des chineurs de la région ! Notre vide grenier rassemble chaque année des dizaines d'exposants et des centaines de visiteurs venus de toute la Loire-Atlantique pour une journée de bonnes affaires, de découvertes et de rencontres.",
    },
    {
      image: '/EVENEMENTS/theatre.jpg',
      alt: 'Représentation de théâtre de la troupe AELB',
      titre: 'Représentation de Théâtre',
      periode: 'Hiver',
      description:
        "La troupe de théâtre de l'AELB répète toute l'année pour vous offrir des spectacles de qualité. Humour, émotion et talent local se retrouvent sur scène dans une salle qui fait salle comble à chaque représentation — un moment de culture accessible à tous. Retrouvez également les rediffusions de nos anciennes pièces en ligne !",
      lienYoutube: 'https://www.youtube.com/@AELBrainsTheatre',
    },
    {
      image: '/EVENEMENTS/scolaire.jpg',
      alt: "Spectacle de fin d'année scolaire",
      titre: 'Spectacle Scolaire',
      periode: "Fin d'année scolaire",
      description:
        "En juin, les enfants de l'école montent sur la scène de la salle Jean-Noël Prin pour présenter le fruit de leur travail annuel. Chants, danses et saynètes se succèdent dans un spectacle coloré et émouvant, temps fort de l'année pour toutes les familles de Brains.",
    },
  ];
}
