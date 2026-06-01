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
      <h1>Notre Équipe</h1>
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
    .container { padding: 20px; max-width: 1000px; margin: auto; }
    .intro { text-align: center; font-size: 1.2em; margin-bottom: 40px; }
    .equipe-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 30px; }
    .membre-card { background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden; text-align: center; }
    .membre-card img { width: 100%; height: 300px; object-fit: cover; }
    .membre-info { padding: 20px; }
    .role { display: block; color: #e63946; font-weight: bold; margin-bottom: 10px; }
    .bio { font-size: 0.9em; color: #555; }
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
