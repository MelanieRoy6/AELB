import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-medias-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Médiathèque</h2>

    <div class="upload-section">
      <h3>Ajouter une photo</h3>
      <div class="upload-form">
        <input type="file" (change)="onFileSelected($event)">
        <select [(ngModel)]="selectedCategorie">
          <option value="GALERIE">Galerie</option>
          <option value="EQUIPE">Équipe</option>
          <option value="SALLE">Salle</option>
        </select>
        <input type="text" [(ngModel)]="legende" placeholder="Légende (optionnel)">
        <button (click)="onUpload()" [disabled]="!selectedFile">Uploader</button>
      </div>
    </div>

    <div class="media-grid">
      <div *ngFor="let m of medias" class="media-card">
        <img [src]="m.url" alt="Media">
        <div class="media-info">
          <span class="badge">{{ m.categorie }}</span>
          <button (click)="delete(m.id)" class="del-btn">×</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .upload-section { background: white; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
    .upload-form { display: flex; gap: 10px; align-items: center; }
    .media-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; }
    .media-card { background: white; border-radius: 8px; overflow: hidden; position: relative; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
    .media-card img { width: 100%; height: 150px; object-fit: cover; }
    .media-info { padding: 10px; display: flex; justify-content: space-between; align-items: center; }
    .badge { background: #f1faee; color: #1d3557; padding: 2px 8px; border-radius: 4px; font-size: 0.8em; }
    .del-btn { background: #e63946; color: white; border: none; width: 25px; height: 25px; border-radius: 50%; cursor: pointer; }
  `]
})
export class MediasAdminComponent implements OnInit {
  medias: any[] = [];
  selectedFile: File | null = null;
  selectedCategorie = 'GALERIE';
  legende = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.dataService.getMedias().subscribe(res => this.medias = res);
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (this.selectedFile) {
      this.dataService.uploadMedia(this.selectedFile, this.selectedCategorie, this.legende).subscribe(() => {
        this.selectedFile = null;
        this.legende = '';
        this.load();
      });
    }
  }

  delete(id: number) {
    if (confirm('Supprimer cette image ?')) {
      this.dataService.deleteMedia(id).subscribe(() => this.load());
    }
  }
}
