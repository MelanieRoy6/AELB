import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssociatifService } from '../services/associatif.service';
import { SeoService } from '../../../core/services/seo.service';
import { Evenement } from '../../../core/models';

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
  templateUrl: './associatif.component.html',
  styleUrls: ['./associatif.component.css']
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

  private seo = inject(SeoService);
  private associatifService = inject(AssociatifService);

  ngOnInit(): void {
    this.seo.set({
      title: 'Vie Associative – AELB, association laïque à Brains',
      description: 'Découvrez la vie associative de l\'AELB à Brains : activités culturelles, sportives, éducatives et sociales ouvertes à tous. Une association laïque et populaire en Loire-Atlantique (44830).',
      keywords: 'association Brains, AELB associatif, amis écoles laïques Brains, activités Brains 44830, vie associative Loire-Atlantique',
      path: '/associatif'
    });
    this.associatifService.getActualites().subscribe(page => {
      this.actualites = page.content;
    });
  }
}
