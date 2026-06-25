import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../core/services/seo.service';
import { SalleService } from '../services/salle.service';
import { Media } from '../../../core/models';

@Component({
  selector: 'app-salle',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './salle.component.html',
  styleUrls: ['./salle.component.css']
})
export class SalleComponent implements OnInit, OnDestroy {
  private seo = inject(SeoService);
  private salleService = inject(SalleService);

  photos: Media[] = [];
  currentIndex = 0;
  prevIndex = -1;
  private autoTimer: any;

  ngOnInit(): void {
    this.seo.set({
      title: 'La Salle Jean-Noël Prin – Location salle mariage, concert, anniversaire à Brains',
      description: 'Louez la Salle Jean-Noël Prin à Brains (44830) : 150 personnes, scène 50 m², cuisine équipée, grand parc. Idéale pour mariage, anniversaire, concert, théâtre, banquet et cocktail.',
      keywords: 'location salle Brains, salle mariage Brains, salle anniversaire Brains, salle concert Brains, salle théâtre Brains, salle réception 44830, salle Jean-Noël Prin',
      path: '/salle'
    });

    this.salleService.getMediasByCategorie('SALLE').subscribe(medias => {
      this.photos = medias.filter(m => m.categorie === 'SALLE');
      if (this.photos.length > 1) this.startAuto();
    });
  }

  ngOnDestroy(): void { this.stopAuto(); }

  next(): void { this.prevIndex = this.currentIndex; this.currentIndex = (this.currentIndex + 1) % this.photos.length; }
  prev(): void { this.prevIndex = this.currentIndex; this.currentIndex = (this.currentIndex - 1 + this.photos.length) % this.photos.length; }

  goTo(index: number): void {
    if (index === this.currentIndex) return;
    this.prevIndex = this.currentIndex;
    this.currentIndex = index;
    this.resetAuto();
  }

  pauseAuto(): void { this.stopAuto(); }
  resumeAuto(): void { if (this.photos.length > 1) this.startAuto(); }

  private startAuto(): void { this.autoTimer = setInterval(() => this.next(), 5000); }
  private stopAuto(): void { if (this.autoTimer) { clearInterval(this.autoTimer); this.autoTimer = null; } }
  private resetAuto(): void { this.stopAuto(); if (this.photos.length > 1) this.startAuto(); }
}
