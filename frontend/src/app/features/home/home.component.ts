import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { Evenement } from '../../core/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="hero">
      <div class="hero-content">
        <h1>Location de la Salle Jean-Noël Prin</h1>
        <p>Un espace idéal pour vos événements au cœur de Brains.</p>
        <a routerLink="/reservation" class="app-button app-button-accent">Réserver la salle</a>
      </div>
    </section>

    <section class="upcoming-events">
      <div class="section-header">
        <h2>Prochainement à l'AELB ({{ upcomingEvents.length }} événements)</h2>
      </div>
      <div class="event-grid">
        <div *ngIf="upcomingEvents.length === 0" class="empty-state">
          Aucun événement prévu pour le moment.
        </div>
        <div *ngFor="let event of upcomingEvents" class="event-card app-card">
          <img [src]="event.imageUrl || 'assets/default-event.jpg'" [alt]="event.titre">
          <div class="card-body">
            <span class="badge">{{ event.type }}</span>
            <h3>{{ event.titre }}</h3>
            <p class="date">{{ event.dateDebut | date: 'fullDate' }}</p>
            <p class="desc">{{ event.description || 'Pas de description' | slice:0:100 }}...</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      background: linear-gradient(rgba(29, 53, 87, 0.6), rgba(29, 53, 87, 0.3)), url('/salle-hero.png');
      background-size: cover;
      background-position: center;
      height: 500px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-align: center;
      margin-bottom: 40px;
    }
    .hero-content h1 { color: white; font-size: 2.5rem; margin-bottom: 10px; }
    .hero-content p { font-size: 1.2rem; margin-bottom: 30px; }
    
    .section-header { text-align: center; margin-bottom: 30px; }
    
    .event-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 30px;
      padding: 0 20px 40px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .event-card img { width: 100%; height: 200px; object-fit: cover; }
    .card-body { padding: 20px; }
    .badge { background: #f1faee; color: #457b9d; padding: 4px 12px; border-radius: 20px; font-size: 0.8em; font-weight: 600; text-transform: uppercase; }
    .date { color: #e63946; font-weight: 600; margin: 10px 0; font-size: 0.9em; }
    .desc { color: #666; font-size: 0.95em; }
    .empty-state { grid-column: 1 / -1; text-align: center; padding: 60px; color: #999; font-style: italic; }
  `]
})
export class HomeComponent implements OnInit {
  upcomingEvents: Evenement[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getUpcomingEvents().subscribe(events => {
      this.upcomingEvents = events;
    });
  }
}
