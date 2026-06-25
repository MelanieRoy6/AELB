import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipeService } from '../services/equipe.service';
import { SeoService } from '../../../core/services/seo.service';
import { MembreEquipe } from '../../../core/models';

@Component({
  selector: 'app-equipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css']
})
export class EquipeComponent implements OnInit {
  equipe: MembreEquipe[] = [];

  private seo = inject(SeoService);
  private equipeService = inject(EquipeService);

  ngOnInit(): void {
    this.seo.set({
      title: 'Notre Équipe – Les bénévoles de l\'AELB à Brains',
      description: 'Rencontrez les bénévoles et membres du bureau de l\'AELB qui animent la Salle Jean-Noël Prin et organisent les événements à Brains (Loire-Atlantique, 44830).',
      keywords: 'équipe AELB, bénévoles Brains, bureau association AELB, membres association Brains',
      path: '/equipe'
    });
    this.equipeService.getEquipe().subscribe(membres => {
      this.equipe = membres;
    });
  }
}
