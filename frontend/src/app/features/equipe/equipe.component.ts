import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../core/services/data.service';
import { MembreEquipe } from '../../core/models';

@Component({
  selector: 'app-equipe',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <div class="page-header">
        <img src="/ICON/PeopleCapacity.svg" alt="" aria-hidden="true" class="page-icon">
        <h1>Notre Équipe</h1>
      </div>
      <p class="intro">Découvrez les membres bénévoles qui animent l'Amicale au quotidien.</p>
      
      <div class="equipe-grid">
        <div *ngFor="let membre of equipe" class="membre-card">
          <img [src]="membre.photoUrl || 'assets/default-avatar.jpg'" [alt]="membre.prenom + ' ' + membre.nom">
          <div class="membre-info">
            <h3>{{ membre.prenom }} {{ membre.nom }}</h3>
            <span class="role">{{ membre.role }}</span>
            <p class="bio">{{ membre.bio }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 40px 24px 60px; max-width: 1000px; margin: auto; }
    .page-header { display: flex; align-items: center; gap: 14px; margin-bottom: 12px; }
    .page-icon { width: 44px; height: 44px; flex-shrink: 0; }
    .intro { text-align: center; font-size: 1.1rem; color: var(--text-muted, #556b5a); margin-bottom: 48px; }
    .equipe-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 28px; }
    .membre-card {
      background: #fff;
      border-radius: 20px;
      box-shadow: var(--shadow-sm, 0 4px 16px rgba(30,61,47,.08));
      border: 1px solid var(--border, rgba(45,106,79,.15));
      overflow: hidden;
      text-align: center;
      transition: transform 0.28s ease, box-shadow 0.28s ease;
    }
    .membre-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-md, 0 10px 32px rgba(30,61,47,.10));
    }
    .membre-card img { width: 100%; height: 280px; object-fit: cover; }
    .membre-info { padding: 22px 20px; }
    .membre-info h3 { color: var(--g900, #1e3d2f); margin-bottom: 6px; }
    /* Rôle : #2d6a4f sur blanc = 7:1 AA */
    .role { display: block; color: var(--g800, #2d6a4f); font-weight: 700; margin-bottom: 10px; font-size: 0.88rem; text-transform: uppercase; letter-spacing: 0.5px; }
    .bio { font-size: 0.9rem; color: var(--text-muted, #556b5a); line-height: 1.5; }
  `]
})
export class EquipeComponent implements OnInit {
  equipe: MembreEquipe[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getEquipe().subscribe(membres => {
      this.equipe = membres;
    });
  }
}
