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
        <a routerLink="/reservation" class="cta-button">Réserver la salle</a>
      </div>
    </section>

    <section class="upcoming-events">
      <h2>Prochainement à l'AELB</h2>
      <div class="event-grid">
        <div *ngFor="let event of upcomingEvents" class="event-card">
          <img [src]="event.imageUrl || 'assets/default-event.jpg'" [alt]="event.titre">
          <div class="card-body">
            <span class="badge">{{ event.type }}</span>
            <h3>{{ event.titre }}</h3>
            <p class="date">{{ event.dateDebut | date: 'fullDate' }}</p>
            <p class="desc">{{ event.description | slice:0:100 }}...</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/assets/hero-salle.jpg');
      background-size: cover;
      height: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-align: center;
    }
    .cta-button {
      background: #e63946;
      color: white;
      padding: 10px 25px;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
    }
    .event-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
      padding: 20px;
    }
    .event-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
    }
    .event-card img { width: 100%; height: 150px; object-fit: cover; }
    .card-body { padding: 15px; }
    .badge { background: #f1faee; color: #1d3557; padding: 2px 8px; border-radius: 4px; font-size: 0.8em; }
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
