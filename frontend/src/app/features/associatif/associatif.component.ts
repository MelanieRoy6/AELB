import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../core/services/data.service';
import { Evenement } from '../../core/models';

@Component({
  selector: 'app-associatif',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Vie Associative</h1>
      
      <section class="presentation">
        <h2>Présentation de l'AELB</h2>
        <p>L'Amicale de l'École Laïque de Brains (AELB) est une association dynamique qui œuvre pour l'animation culturelle et sociale de notre commune depuis de nombreuses années...</p>
      </section>

      <section class="activites">
        <h2>Nos Activités</h2>
        <div class="activity-list">
          <div class="activity-item">
            <h3>Théâtre</h3>
            <p>Notre troupe répète toute l'année pour vous proposer des spectacles de qualité.</p>
          </div>
          <div class="activity-item">
            <h3>Danse</h3>
            <p>Des cours pour tous les âges et tous les niveaux.</p>
          </div>
          <div class="activity-item">
            <h3>Concerts & Événements</h3>
            <p>Organisation de concerts, brocantes et moments de convivialité.</p>
          </div>
        </div>
      </section>

      <section class="actualites">
        <h2>Actualités</h2>
        <div class="news-list" *ngIf="actualites.length > 0; else noNews">
          <div *ngFor="let news of actualites" class="news-item">
            <div class="news-date">{{ news.dateDebut | date: 'shortDate' }}</div>
            <div class="news-content">
              <h3>{{ news.titre }}</h3>
              <p>{{ news.description }}</p>
            </div>
          </div>
        </div>
        <ng-template #noNews><p>Aucune actualité pour le moment.</p></ng-template>
      </section>
    </div>
  `,
  styles: [`
    .container { padding: 20px; max-width: 1000px; margin: auto; }
    .activity-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
    .activity-item { background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 5px solid #1d3557; }
    .news-item { display: flex; gap: 20px; border-bottom: 1px solid #eee; padding: 15px 0; }
    .news-date { font-weight: bold; color: #e63946; min-width: 100px; }
  `]
})
export class AssociatifComponent implements OnInit {
  actualites: Evenement[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getEvents('ACTU').subscribe(page => {
      this.actualites = page.content;
    });
  }
}
