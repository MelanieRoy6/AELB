import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../core/services/seo.service';
import { APP_ICONS } from '../../../core/app-icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  readonly icons = APP_ICONS;
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
