import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-medias-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="medias-wrap">
      <h2>Médiathèque</h2>

      <!-- Zone d'upload -->
      <div class="app-card upload-card">
        <h3>Ajouter une photo</h3>

        <div class="drop-zone"
             [class.dragging]="isDragging"
             [class.has-preview]="!!previewUrl"
             (dragover)="onDragOver($event)"
             (dragleave)="onDragLeave()"
             (drop)="onDrop($event)"
             (click)="!previewUrl && fileInput.click()">

          <input #fileInput type="file" accept="image/*"
                 (change)="onFileSelected($event)" style="display:none">

          <ng-container *ngIf="!previewUrl">
            <div class="drop-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            </div>
            <p class="drop-text">Glissez une image ici</p>
            <p class="drop-hint">ou <button type="button" class="link-btn" (click)="fileInput.click()">parcourez vos fichiers</button></p>
            <p class="drop-formats">JPG · PNG · WEBP · GIF — max 10 Mo</p>
          </ng-container>

          <ng-container *ngIf="previewUrl">
            <img [src]="previewUrl" class="preview-img" alt="Aperçu">
            <button type="button" class="remove-btn" (click)="clearFile($event)" title="Changer d'image">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </ng-container>
        </div>

        <div class="upload-options" *ngIf="selectedFile">
          <div class="field">
            <label>Catégorie</label>
            <select [(ngModel)]="selectedCategorie">
              <option value="GALERIE">Galerie</option>
              <option value="EQUIPE">Équipe</option>
              <option value="SALLE">Salle</option>
            </select>
          </div>
          <div class="field">
            <label>Légende <span class="optional">(optionnel)</span></label>
            <input type="text" [(ngModel)]="legende" placeholder="Ex : Soirée du 14 juillet 2024">
          </div>
          <div class="field field-actions">
            <button class="app-button app-button-primary upload-btn"
                    (click)="onUpload()" [disabled]="uploading">
              <span *ngIf="!uploading">Envoyer la photo</span>
              <span *ngIf="uploading" class="loading-row">
                <span class="spinner"></span> Envoi en cours…
              </span>
            </button>
            <button class="app-button cancel-btn" (click)="clearFile()">Annuler</button>
          </div>
        </div>

        <div class="msg msg-success" *ngIf="successMsg">{{ successMsg }}</div>
        <div class="msg msg-error" *ngIf="errorMsg">{{ errorMsg }}</div>
      </div>

      <!-- En-tête grille + filtres -->
      <div class="grid-header">
        <h3>Photos enregistrées <span class="count">{{ filteredMedias.length }}</span></h3>
        <div class="filters">
          <button *ngFor="let cat of categories"
                  class="filter-btn"
                  [class.active]="activeFilter === cat"
                  (click)="activeFilter = cat">
            {{ cat === 'ALL' ? 'Toutes' : cat[0] + cat.slice(1).toLowerCase() }}
          </button>
        </div>
      </div>

      <!-- Grille photos -->
      <div class="media-grid" *ngIf="filteredMedias.length > 0; else emptyState">
        <div class="media-card app-card" *ngFor="let m of filteredMedias">
          <div class="img-wrap">
            <img [src]="m.url" [alt]="m.legende || m.categorie" loading="lazy">
          </div>
          <div class="card-footer">
            <div class="card-meta">
              <span class="badge cat-{{ m.categorie.toLowerCase() }}">{{ m.categorie }}</span>
              <span class="legende" *ngIf="m.legende">{{ m.legende }}</span>
            </div>
            <button class="del-btn" (click)="delete(m.id)" title="Supprimer">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14H6L5 6"/>
                <path d="M10 11v6M14 11v6"/>
                <path d="M9 6V4h6v2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <ng-template #emptyState>
        <div class="empty-state">
          <p>Aucune photo dans cette catégorie.</p>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .medias-wrap { padding: 0 4px; }
    h2 { color: var(--g900, #1e3d2f); margin-bottom: 24px; }
    h3 { color: var(--g900, #1e3d2f); margin: 0 0 16px; font-size: 1.05rem; }
    .upload-card { padding: 28px; margin-bottom: 32px; }
    .drop-zone { border: 2px dashed var(--border, rgba(45,106,79,.25)); border-radius: 16px; min-height: 180px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: border-color .2s, background .2s; background: var(--g010, #f6faf7); position: relative; gap: 6px; padding: 24px; text-align: center; }
    .drop-zone:hover, .drop-zone.dragging { border-color: var(--g700, #3d7a5c); background: rgba(61,122,92,.05); }
    .drop-zone.has-preview { cursor: default; padding: 0; overflow: hidden; min-height: 220px; }
    .drop-icon { color: var(--g400, #7daa92); margin-bottom: 4px; }
    .drop-text { font-weight: 600; color: var(--g900, #1e3d2f); margin: 0; }
    .drop-hint { color: var(--text-muted, #556b5a); margin: 0; font-size: .92rem; }
    .drop-formats { color: var(--text-muted, #556b5a); font-size: .8rem; margin: 4px 0 0; }
    .link-btn { background: none; border: none; padding: 0; color: var(--g700, #3d7a5c); font-weight: 600; cursor: pointer; font-size: inherit; text-decoration: underline; }
    .preview-img { width: 100%; height: 220px; object-fit: cover; border-radius: 14px; }
    .remove-btn { position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,.55); color: white; border: none; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background .2s; }
    .remove-btn:hover { background: rgba(0,0,0,.8); }
    .upload-options { display: grid; grid-template-columns: 1fr 1fr auto; gap: 16px; margin-top: 20px; align-items: end; }
    .field { display: flex; flex-direction: column; gap: 6px; }
    .field label { font-weight: 600; font-size: .88rem; color: var(--g900, #1e3d2f); }
    .optional { font-weight: 400; color: var(--text-muted, #556b5a); }
    .field select, .field input[type=text] { padding: 10px 14px; border: 1.5px solid var(--border, rgba(45,106,79,.2)); border-radius: 12px; background: var(--g010, #f6faf7); font-size: .95rem; color: var(--text, #1a2e1d); transition: border-color .2s, box-shadow .2s; }
    .field select:focus, .field input[type=text]:focus { outline: none; border-color: var(--g700, #3d7a5c); box-shadow: 0 0 0 3px rgba(45,106,79,.12); }
    .field-actions { flex-direction: row; gap: 10px; }
    .upload-btn { white-space: nowrap; }
    .cancel-btn { background: var(--g050, #eaf2ec); color: var(--g700, #3d7a5c); border-color: transparent; }
    .cancel-btn:hover { background: var(--g100, #d4e8da); }
    .loading-row { display: flex; align-items: center; gap: 8px; }
    .spinner { width: 14px; height: 14px; border: 2px solid rgba(255,255,255,.4); border-top-color: white; border-radius: 50%; animation: spin .7s linear infinite; display: inline-block; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .msg { margin-top: 14px; padding: 10px 16px; border-radius: 10px; font-size: .9rem; font-weight: 600; }
    .msg-success { color: #1a5c35; background: #e6f4ec; border: 1px solid rgba(26,92,53,.2); }
    .msg-error   { color: #7a3f18; background: #fdf3ec; border: 1px solid rgba(158,85,36,.25); }
    .grid-header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 16px; }
    .count { display: inline-flex; align-items: center; justify-content: center; background: var(--g100, #d4e8da); color: var(--g800, #2d6a4f); border-radius: 20px; padding: 1px 10px; font-size: .82rem; font-weight: 700; margin-left: 8px; }
    .filters { display: flex; gap: 8px; flex-wrap: wrap; }
    .filter-btn { padding: 6px 16px; border-radius: 20px; border: 1.5px solid var(--border, rgba(45,106,79,.2)); background: white; color: var(--g700, #3d7a5c); font-size: .85rem; font-weight: 600; cursor: pointer; transition: all .15s; }
    .filter-btn:hover { border-color: var(--g700, #3d7a5c); }
    .filter-btn.active { background: var(--g700, #3d7a5c); color: white; border-color: var(--g700, #3d7a5c); }
    .media-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; }
    .media-card { padding: 0; overflow: hidden; }
    .img-wrap { width: 100%; height: 160px; overflow: hidden; }
    .img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform .3s; }
    .media-card:hover .img-wrap img { transform: scale(1.04); }
    .card-footer { padding: 12px 14px; display: flex; align-items: center; justify-content: space-between; gap: 8px; }
    .card-meta { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
    .badge { display: inline-block; padding: 2px 10px; border-radius: 20px; font-size: .75rem; font-weight: 700; text-transform: uppercase; letter-spacing: .04em; }
    .cat-galerie { background: #e8f4fd; color: #1a5276; }
    .cat-equipe  { background: #fef9e7; color: #7d6608; }
    .cat-salle   { background: #e6f4ec; color: #1a5c35; }
    .legende { font-size: .82rem; color: var(--text-muted, #556b5a); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin: 0; }
    .del-btn { flex-shrink: 0; background: none; border: 1.5px solid transparent; color: #c0392b; border-radius: 8px; padding: 5px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background .15s, border-color .15s; }
    .del-btn:hover { background: #fdecea; border-color: rgba(192,57,43,.3); }
    .empty-state { text-align: center; padding: 48px 0; color: var(--text-muted, #556b5a); font-size: .95rem; }
    @media (max-width: 700px) { .upload-options { grid-template-columns: 1fr; } .field-actions { flex-direction: column; } }
  `]
})
export class MediasAdminComponent implements OnInit {
  medias: any[] = [];
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  selectedCategorie = 'GALERIE';
  legende = '';
  uploading = false;
  isDragging = false;
  successMsg = '';
  errorMsg = '';
  activeFilter = 'ALL';
  categories = ['ALL', 'GALERIE', 'EQUIPE', 'SALLE'];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void { this.load(); }

  get filteredMedias(): any[] {
    if (this.activeFilter === 'ALL') return this.medias;
    return this.medias.filter(m => m.categorie === this.activeFilter);
  }

  load() { this.adminService.getMedias().subscribe(res => this.medias = res); }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) this.handleFile(input.files[0]);
  }

  onDragOver(event: DragEvent) { event.preventDefault(); this.isDragging = true; }
  onDragLeave() { this.isDragging = false; }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    const file = event.dataTransfer?.files[0];
    if (file) this.handleFile(file);
  }

  handleFile(file: File) {
    this.clearMessages();
    if (!file.type.startsWith('image/')) { this.errorMsg = 'Ce fichier n\'est pas une image.'; return; }
    if (file.size > 10 * 1024 * 1024) { this.errorMsg = 'Le fichier dépasse la limite de 10 Mo.'; return; }
    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = e => this.previewUrl = e.target?.result as string;
    reader.readAsDataURL(file);
  }

  clearFile(event?: Event) {
    event?.stopPropagation();
    this.selectedFile = null;
    this.previewUrl = null;
    this.legende = '';
    this.clearMessages();
  }

  onUpload() {
    if (!this.selectedFile) return;
    this.uploading = true;
    this.clearMessages();
    this.adminService.uploadMedia(this.selectedFile, this.selectedCategorie, this.legende).subscribe({
      next: () => { this.uploading = false; this.successMsg = 'Photo ajoutée avec succès.'; this.clearFile(); this.load(); },
      error: (err) => {
        this.uploading = false;
        if (err.status === 401 || err.status === 403) this.errorMsg = 'Accès refusé (401/403). Veuillez vous reconnecter.';
        else if (err.status === 0) this.errorMsg = 'Impossible de contacter le serveur. Vérifiez que le backend est démarré.';
        else if (err.error && typeof err.error === 'string') this.errorMsg = `Erreur ${err.status} : ${err.error}`;
        else this.errorMsg = `Erreur ${err.status} lors de l'envoi. Consultez les logs du backend.`;
        console.error('[Upload] Détails :', err);
      }
    });
  }

  delete(id: number) {
    if (!confirm('Supprimer définitivement cette photo ?')) return;
    this.adminService.deleteMedia(id).subscribe(() => this.load());
  }

  private clearMessages() { this.successMsg = ''; this.errorMsg = ''; }
}
