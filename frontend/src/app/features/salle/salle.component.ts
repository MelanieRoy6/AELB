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
    <div class="salle-page">
      <section class="salle-hero">
        <div class="hero-content">
          <h1>La Salle Jean-Noël Prin</h1>
          <p>Un espace de vie et de culture au cœur de la commune de Brains.</p>
        </div>
      </section>
      
      <div class="salle-container">
        <section class="main-info">
          <div class="info-grid">
            <div class="info-text app-card">
              <h2>Un équipement polyvalent</h2>
              <p>La salle Jean-Noël Prin est l'équipement phare de l'AELB. Elle accueille aussi bien des spectacles de théâtre que des réceptions privées ou des réunions d'entreprises.</p>
              <ul class="features-list">
                <li>
                  <span class="icon"><img src="/ICON/PeopleCapacity.svg" alt="" aria-hidden="true" class="icon-img"></span>
                  <div>
                    <strong>Capacité</strong>
                    <p>Jusqu'à 150 personnes assises</p>
                  </div>
                </li>
                <li>
                  <span class="icon"><img src="/ICON/Equipment.svg" alt="" aria-hidden="true" class="icon-img"></span>
                  <div>
                    <strong>Équipements</strong>
                    <p>Scène, sonorisation, éclairage, cuisine équipée</p>
                  </div>
                </li>
                <li>
                  <span class="icon"><img src="/ICON/Accesibility.svg" alt="" aria-hidden="true" class="icon-img"></span>
                  <div>
                    <strong>Accessibilité</strong>
                    <p>Entièrement accessible PMR</p>
                  </div>
                </li>
              </ul>
              <a routerLink="/reservation" class="app-button app-button-primary cta-full">Faire une demande de réservation</a>
            </div>

            <div class="info-map app-card">
              <h3>Plan d'accès</h3>
              <div class="map-wrapper">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2711.9613148152433!2d-1.72352822322501!3d47.17124991810967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4805f2713e790a13%3A0x66c897c8d88e0186!2s7%20Rue%20Jules%20Verne%2C%2044830%20Brains!5e0!3m2!1sfr!2sfr!4v1711200000000!5m2!1sfr!2sfr" 
                  width="100%" 
                  height="300" 
                  style="border:0;" 
                  allowfullscreen="" 
                  loading="lazy" 
                  referrerpolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
              <div class="address-footer">
                <span class="pin">📍</span>
                <p>7 rue Jules Verne, 44830 Brains</p>
              </div>
            </div>
          </div>
        </section>

        <section class="galerie">
          <div class="section-header">
            <h2>Galerie Photos</h2>
            <p>Découvrez la salle en images lors de différents événements.</p>
          </div>
          
          <div class="carousel" *ngIf="photos.length > 0; else noPhotos">
            <div class="photo-grid">
              <div *ngFor="let photo of photos" class="photo-item app-card">
                <img [src]="photo.url" [alt]="photo.legende">
                <div class="photo-overlay" *ngIf="photo.legende">
                  <p>{{ photo.legende }}</p>
                </div>
              </div>
            </div>
          </div>
          <ng-template #noPhotos>
            <div class="empty-gallery app-card">
              <p>Aucune photo dans la galerie pour le moment.</p>
            </div>
          </ng-template>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .salle-hero {
      background:
        linear-gradient(155deg, rgba(30, 61, 47, 0.78) 0%, rgba(45, 106, 79, 0.42) 100%),
        url('/salle-hero.png') center / cover no-repeat;
      height: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-align: center;
      margin-bottom: 60px;
    }
    .hero-content h1 { font-size: 3rem; margin-bottom: 10px; color: white; text-shadow: 0 2px 10px rgba(0,0,0,.25); }
    .hero-content p { font-size: 1.15rem; color: rgba(255,255,255,0.92); }

    .salle-container { max-width: 1200px; margin: 0 auto; padding: 0 24px 60px; }

    .section-header { text-align: center; margin-bottom: 40px; }
    .section-header h2 { font-size: 2rem; margin-bottom: 10px; }
    .section-header p { color: var(--text-muted, #556b5a); }

    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; margin-bottom: 60px; }
    .info-text, .info-map { padding: 40px; display: flex; flex-direction: column; }

    .info-text h2 { margin-bottom: 20px; }
    .features-list { list-style: none; padding: 0; margin: 28px 0; }
    .features-list li { display: flex; gap: 15px; margin-bottom: 20px; align-items: flex-start; }
    .features-list .icon {
      background: var(--g050, #edf5ee);
      width: 52px; height: 52px;
      display: flex; align-items: center; justify-content: center;
      border-radius: 14px;
      flex-shrink: 0;
      border: 1px solid var(--border, rgba(45,106,79,.15));
    }
    .features-list .icon-img { width: 28px; height: 28px; display: block; }
    .features-list strong { display: block; color: var(--g900, #1e3d2f); font-size: 1rem; }
    .features-list p { margin: 2px 0 0; color: var(--text-muted, #556b5a); font-size: 0.9rem; }

    .cta-full { width: 100%; margin-top: auto; }

    .info-map h3 { margin-bottom: 20px; }
    .map-wrapper { border-radius: 16px; overflow: hidden; margin-bottom: 20px; border: 1px solid var(--border, rgba(45,106,79,.15)); }
    .address-footer { display: flex; align-items: center; gap: 10px; color: var(--g800, #2d6a4f); font-weight: 600; }
    .address-footer p { margin: 0; }

    .photo-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }
    .photo-item { position: relative; height: 250px; cursor: pointer; border-radius: 20px; overflow: hidden; }
    .photo-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
    .photo-item:hover img { transform: scale(1.04); }
    .photo-overlay {
      position: absolute; bottom: 0; left: 0; right: 0;
      padding: 20px; background: linear-gradient(transparent, rgba(30,61,47,0.75));
      color: white; opacity: 0; transition: opacity 0.3s ease;
    }
    .photo-item:hover .photo-overlay { opacity: 1; }

    .empty-gallery { text-align: center; padding: 60px; color: var(--text-muted, #556b5a); font-style: italic; }

    @media (max-width: 900px) {
      .info-grid { grid-template-columns: 1fr; }
      .hero-content h1 { font-size: 2.2rem; }
    }
  `]
})
export class SalleComponent implements OnInit {
  photos: Media[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getMedias().subscribe(medias => {
      const fetchedPhotos = medias.filter(m => m.categorie === 'GALERIE' || m.categorie === 'SALLE');
      
      // Ajout manuel de la nouvelle photo de déco mariage pour le prototype
      const localPhotos: Media[] = [
        {
          id: 999,
          url: '/galerie-mariage.png',
          legende: 'Décoration de mariage dans la salle Jean-Noël Prin',
          categorie: 'GALERIE',
          dateUpload: new Date().toISOString()
        }
      ];

      this.photos = [...localPhotos, ...fetchedPhotos];
    });
  }
}
