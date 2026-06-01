import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { Media } from '../../core/models';

@Component({
  selector: 'app-salle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h1>La Salle Jean-Noël Prin</h1>
      
      <section class="description">
        <div class="info-grid">
          <div class="info-text">
            <h2>Un équipement polyvalent</h2>
            <p>La salle Jean-Noël Prin est l'équipement phare de l'AELB. Elle accueille aussi bien des spectacles de théâtre que des réceptions privées ou des réunions d'entreprises.</p>
            <ul>
              <li><strong>Capacité :</strong> Jusqu'à 150 personnes assises.</li>
              <li><strong>Équipements :</strong> Scène, sonorisation, éclairage, cuisine équipée.</li>
              <li><strong>Accessibilité :</strong> Entièrement accessible PMR.</li>
            </ul>
            <a routerLink="/reservation" class="cta-button">Faire une demande de réservation</a>
          </div>
          <div class="info-map">
            <h3>Plan d'accès</h3>
            <div class="map-placeholder">
              [Carte Google Maps ici]
              <br>12 Rue de la Mairie, 44830 Brains
            </div>
          </div>
        </div>
      </section>

      <section class="galerie">
        <h2>Galerie Photos</h2>
        <div class="carousel" *ngIf="photos.length > 0; else noPhotos">
          <div class="photo-grid">
            <div *ngFor="let photo of photos" class="photo-item">
              <img [src]="photo.url" [alt]="photo.legende">
              <p class="legende" *ngIf="photo.legende">{{ photo.legende }}</p>
            </div>
          </div>
        </div>
        <ng-template #noPhotos><p>Aucune photo dans la galerie pour le moment.</p></ng-template>
      </section>
    </div>
  `,
  styles: [`
    .container { padding: 20px; max-width: 1200px; margin: auto; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px; }
    .map-placeholder { background: #eee; height: 200px; display: flex; align-items: center; justify-content: center; text-align: center; border-radius: 8px; }
    .cta-button { display: inline-block; background: #e63946; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
    .photo-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 15px; }
    .photo-item img { width: 100%; border-radius: 8px; }
    .legende { font-size: 0.9em; font-style: italic; color: #666; margin-top: 5px; }
  `]
})
export class SalleComponent implements OnInit {
  photos: Media[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getMedias().subscribe(medias => {
      this.photos = medias.filter(m => m.categorie === 'GALERIE' || m.categorie === 'SALLE');
    });
  }
}
