import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../core/services/data.service';
import { MembreEquipe } from '../../core/models';

const ROLES_PREDEFINIS = [
  'Président(e)',
  'Vice-président(e)',
  'Secrétaire',
  'Secrétaire adjoint(e)',
  'Trésorier(ère)',
  'Trésorier(ère) adjoint(e)',
  'Responsable événements',
  'Bénévole',
  'Autre'
];

@Component({
  selector: 'app-equipe-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-header">
      <div class="header-left">
        <h2>Bureau de l'AELB</h2>
        <p>Gérez les membres du bureau affichés sur la page publique.</p>
      </div>
      <button class="app-button app-button-primary add-btn" (click)="openModal()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          width="16" height="16">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        Ajouter un membre
      </button>
    </div>

    <!-- Liste des membres -->
    @if (membres.length === 0) {
      <div class="empty-state app-card">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"
          width="48" height="48">
          <circle cx="9" cy="7" r="3"/><circle cx="17" cy="7" r="3"/>
          <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
          <path d="M19 11c1.66 0 3 1.34 3 3v2"/>
        </svg>
        <p>Aucun membre enregistré. Ajoutez les membres du bureau.</p>
      </div>
    }

    <div class="membres-list">
      @for (m of membres; track m.id) {
        <div class="membre-row app-card">
          <div class="membre-photo-wrap">
            @if (m.photoUrl) {
              <img [src]="m.photoUrl" [alt]="m.prenom + ' ' + m.nom" class="membre-photo">
            } @else {
              <div class="membre-photo-placeholder">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                  width="28" height="28"><circle cx="12" cy="8" r="4"/>
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
              </div>
            }
            <span class="ordre-badge">#{{ m.ordre ?? '—' }}</span>
          </div>

          <div class="membre-info">
            <div class="membre-name">{{ m.prenom }} {{ m.nom }}</div>
            <span class="role-tag">{{ m.role }}</span>
            @if (m.bio) {
              <p class="membre-bio">{{ m.bio }}</p>
            }
          </div>

          <div class="membre-actions">
            <button class="icon-btn edit" (click)="openModal(m)" title="Modifier">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                width="16" height="16">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>
            <button class="icon-btn delete" (click)="confirmDelete(m)" title="Supprimer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                width="16" height="16">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                <path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
              </svg>
            </button>
          </div>
        </div>
      }
    </div>

    <!-- Modal ajout / édition -->
    @if (showModal) {
      <div class="modal-overlay" (click)="closeModal()">
        <div class="modal" (click)="$event.stopPropagation()">

          <div class="modal-header">
            <h3>{{ editingMembre ? 'Modifier le membre' : 'Ajouter un membre' }}</h3>
            <button class="modal-close" (click)="closeModal()">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                width="20" height="20">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <div class="modal-body">

            <!-- Photo -->
            <div class="photo-section">
              <div class="photo-preview-wrap">
                @if (photoPreview || form.photoUrl) {
                  <img [src]="photoPreview || form.photoUrl" alt="Aperçu" class="photo-preview">
                } @else {
                  <div class="photo-placeholder">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                      width="36" height="36"><circle cx="12" cy="8" r="4"/>
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                  </div>
                }
              </div>
              <div class="photo-controls">
                <label class="photo-upload-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    width="15" height="15">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  {{ photoUploading ? 'Envoi…' : 'Choisir une photo' }}
                  <input type="file" accept="image/*" (change)="onPhotoSelected($event)" [disabled]="photoUploading" hidden>
                </label>
                @if (form.photoUrl && !photoPreview) {
                  <button class="remove-photo-btn" (click)="form.photoUrl = ''" type="button">Supprimer la photo</button>
                }
                <p class="photo-hint">JPG, PNG · Max 5 Mo · Ratio 3:4 recommandé</p>
              </div>
            </div>

            <div class="form-divider"></div>

            <!-- Infos -->
            <div class="form-row">
              <div class="form-group">
                <label>Prénom *</label>
                <input type="text" [(ngModel)]="form.prenom" placeholder="Prénom" name="prenom">
              </div>
              <div class="form-group">
                <label>Nom *</label>
                <input type="text" [(ngModel)]="form.nom" placeholder="Nom de famille" name="nom">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Rôle / Fonction *</label>
                <select [(ngModel)]="roleSelection" (ngModelChange)="onRoleChange($event)" name="roleSelect">
                  <option value="">-- Choisir un rôle --</option>
                  @for (r of rolesPredefs; track r) {
                    <option [value]="r">{{ r }}</option>
                  }
                </select>
              </div>
              <div class="form-group">
                <label>Ordre d'affichage</label>
                <input type="number" [(ngModel)]="form.ordre" placeholder="1, 2, 3…" min="1" name="ordre">
              </div>
            </div>

            @if (roleSelection === 'Autre') {
              <div class="form-group">
                <label>Rôle personnalisé *</label>
                <input type="text" [(ngModel)]="form.role" placeholder="Ex : Responsable communication" name="roleCustom">
              </div>
            }

            <div class="form-group">
              <label>Texte de présentation</label>
              <textarea [(ngModel)]="form.bio" rows="4"
                placeholder="Décrivez brièvement ce membre, son rôle dans l'association…"
                name="bio"></textarea>
              <span class="char-count">{{ form.bio?.length ?? 0 }} / 400 caractères</span>
            </div>

            @if (errorMessage) {
              <div class="form-error">{{ errorMessage }}</div>
            }
          </div>

          <div class="modal-footer">
            <button type="button" class="btn-cancel" (click)="closeModal()">Annuler</button>
            <button type="button" class="app-button app-button-primary"
              (click)="saveMembre()"
              [disabled]="saving || photoUploading || !form.prenom || !form.nom || !form.role">
              {{ saving ? 'Enregistrement…' : (editingMembre ? 'Mettre à jour' : 'Ajouter au bureau') }}
            </button>
          </div>

        </div>
      </div>
    }
  `,
  styles: [`
    .admin-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 28px;
      gap: 16px;
      flex-wrap: wrap;
    }
    .header-left h2 { margin-bottom: 4px; color: #1e3d2f; }
    .header-left p { color: #64748b; margin: 0; font-size: 0.9rem; }

    .add-btn { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }

    /* ── Empty state ── */
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
      padding: 60px 24px;
      color: #94a3b8;
      font-style: italic;
      text-align: center;
    }
    .empty-state svg { opacity: 0.35; color: #2d6a4f; }

    /* ── Liste membres ── */
    .membres-list { display: flex; flex-direction: column; gap: 12px; }

    .membre-row {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 16px 20px;
    }

    .membre-photo-wrap {
      position: relative;
      flex-shrink: 0;
    }

    .membre-photo {
      width: 72px;
      height: 72px;
      border-radius: 12px;
      object-fit: cover;
      border: 2px solid rgba(45, 106, 79, 0.15);
    }

    .membre-photo-placeholder {
      width: 72px;
      height: 72px;
      border-radius: 12px;
      background: #edf5ee;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #52b788;
      border: 2px dashed rgba(45, 106, 79, 0.2);
    }

    .ordre-badge {
      position: absolute;
      bottom: -6px;
      right: -6px;
      background: #2d6a4f;
      color: white;
      font-size: 0.65rem;
      font-weight: 800;
      padding: 2px 5px;
      border-radius: 6px;
    }

    .membre-info { flex: 1; min-width: 0; }
    .membre-name { font-size: 1rem; font-weight: 800; color: #1e3d2f; margin-bottom: 4px; }
    .role-tag {
      display: inline-block;
      background: #edf5ee;
      color: #2d6a4f;
      font-size: 0.72rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 2px 10px;
      border-radius: 20px;
      margin-bottom: 6px;
    }
    .membre-bio {
      font-size: 0.85rem;
      color: #64748b;
      margin: 0;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .membre-actions { display: flex; gap: 8px; flex-shrink: 0; }
    .icon-btn {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
      background: #f8fafc;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.15s, color 0.15s, border-color 0.15s;
      color: #64748b;
    }
    .icon-btn.edit:hover { background: #edf5ee; border-color: #2d6a4f; color: #2d6a4f; }
    .icon-btn.delete:hover { background: #fef2f2; border-color: #fca5a5; color: #dc2626; }

    /* ── Modal ── */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.45);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 16px;
    }
    .modal {
      background: white;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.2);
      width: 100%;
      max-width: 640px;
      max-height: 90vh;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }
    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 22px 28px 18px;
      border-bottom: 1px solid #f1f5f9;
      flex-shrink: 0;
    }
    .modal-header h3 { margin: 0; font-size: 1.1rem; font-weight: 800; color: #1e3d2f; }
    .modal-close {
      background: none; border: none; cursor: pointer;
      color: #94a3b8; padding: 4px; border-radius: 6px;
      display: flex; transition: color 0.15s, background 0.15s;
    }
    .modal-close:hover { color: #475569; background: #f1f5f9; }

    .modal-body { padding: 24px 28px; display: flex; flex-direction: column; gap: 18px; overflow-y: auto; }

    /* Photo section */
    .photo-section {
      display: flex;
      gap: 20px;
      align-items: flex-start;
    }
    .photo-preview-wrap { flex-shrink: 0; }
    .photo-preview {
      width: 100px;
      height: 120px;
      object-fit: cover;
      border-radius: 12px;
      border: 2px solid rgba(45,106,79,0.2);
    }
    .photo-placeholder {
      width: 100px;
      height: 120px;
      border-radius: 12px;
      background: #f0f7f2;
      border: 2px dashed rgba(45,106,79,0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #52b788;
    }
    .photo-controls {
      display: flex;
      flex-direction: column;
      gap: 8px;
      justify-content: center;
    }
    .photo-upload-btn {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: #edf5ee;
      color: #2d6a4f;
      border: 1.5px solid rgba(45,106,79,0.25);
      border-radius: 8px;
      padding: 8px 16px;
      font-size: 0.84rem;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.15s;
    }
    .photo-upload-btn:hover { background: #d8eddd; }
    .remove-photo-btn {
      background: none;
      border: none;
      color: #dc2626;
      font-size: 0.8rem;
      cursor: pointer;
      text-align: left;
      padding: 0;
      font-weight: 600;
    }
    .photo-hint { font-size: 0.75rem; color: #94a3b8; margin: 0; }

    .form-divider { height: 1px; background: #f1f5f9; }

    /* Form fields */
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .form-group { display: flex; flex-direction: column; gap: 6px; }
    .form-group label {
      font-size: 0.8rem; font-weight: 700; color: #475569;
      text-transform: uppercase; letter-spacing: 0.4px;
    }
    .form-group input,
    .form-group select,
    .form-group textarea {
      border: 1.5px solid #e2e8f0;
      border-radius: 10px;
      padding: 10px 14px;
      font-size: 0.9rem;
      color: #1e293b;
      outline: none;
      font-family: inherit;
      background: #fafcfe;
      transition: border-color 0.18s, box-shadow 0.18s;
    }
    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      border-color: #2d6a4f;
      box-shadow: 0 0 0 3px rgba(45,106,79,0.12);
      background: white;
    }
    .form-group textarea { resize: vertical; min-height: 90px; }
    .char-count { font-size: 0.75rem; color: #94a3b8; align-self: flex-end; }

    .form-error {
      background: #fef2f2;
      border: 1px solid #fecaca;
      color: #dc2626;
      border-radius: 8px;
      padding: 10px 14px;
      font-size: 0.88rem;
    }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      padding: 16px 28px 22px;
      border-top: 1px solid #f1f5f9;
      flex-shrink: 0;
    }
    .btn-cancel {
      background: #f1f5f9; color: #475569;
      border: 1px solid #e2e8f0; border-radius: 50px;
      padding: 10px 24px; font-size: 0.9rem; font-weight: 600;
      cursor: pointer; transition: background 0.18s;
    }
    .btn-cancel:hover { background: #e2e8f0; }

    @media (max-width: 640px) {
      .admin-header { flex-direction: column; }
      .add-btn { width: 100%; justify-content: center; }
      .membre-row { flex-wrap: wrap; gap: 12px; }
      .membre-actions { width: 100%; justify-content: flex-end; }
    }
    @media (max-width: 560px) {
      .form-row { grid-template-columns: 1fr; }
      .photo-section { flex-direction: column; }
      .photo-preview, .photo-placeholder { width: 100%; height: 160px; }
      .modal-footer { flex-direction: column-reverse; }
      .modal-footer button { width: 100%; text-align: center; }
    }
  `]
})
export class EquipeAdminComponent implements OnInit {
  membres: MembreEquipe[] = [];
  rolesPredefs = ROLES_PREDEFINIS;

  showModal = false;
  editingMembre: MembreEquipe | null = null;
  saving = false;
  errorMessage = '';

  photoPreview: string | null = null;
  photoUploading = false;
  selectedFile: File | null = null;

  roleSelection = '';

  form: Partial<MembreEquipe> & { bio: string } = {
    prenom: '', nom: '', role: '', bio: '', photoUrl: '', ordre: undefined
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadMembres();
  }

  loadMembres(): void {
    this.dataService.getAdminEquipe().subscribe(m => {
      this.membres = m.sort((a, b) => (a.ordre ?? 99) - (b.ordre ?? 99));
    });
  }

  openModal(membre?: MembreEquipe): void {
    this.editingMembre = membre ?? null;
    this.errorMessage = '';
    this.photoPreview = null;
    this.selectedFile = null;

    if (membre) {
      this.form = { ...membre, bio: membre.bio ?? '' };
      this.roleSelection = ROLES_PREDEFINIS.includes(membre.role ?? '') ? (membre.role ?? '') : 'Autre';
    } else {
      this.form = { prenom: '', nom: '', role: '', bio: '', photoUrl: '', ordre: this.membres.length + 1 };
      this.roleSelection = '';
    }
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editingMembre = null;
    this.photoPreview = null;
    this.selectedFile = null;
    this.saving = false;
  }

  onRoleChange(val: string): void {
    if (val !== 'Autre') this.form.role = val;
    else this.form.role = '';
  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      this.errorMessage = 'La photo dépasse 5 Mo.';
      return;
    }

    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = e => this.photoPreview = e.target?.result as string;
    reader.readAsDataURL(file);
  }

  saveMembre(): void {
    if (!this.form.prenom?.trim() || !this.form.nom?.trim() || !this.form.role?.trim()) {
      this.errorMessage = 'Prénom, nom et rôle sont obligatoires.';
      return;
    }

    this.errorMessage = '';

    if (this.selectedFile) {
      this.photoUploading = true;
      this.dataService.uploadMedia(this.selectedFile, 'EQUIPE' as any, `${this.form.prenom} ${this.form.nom}`).subscribe({
        next: (media: any) => {
          this.form.photoUrl = media.url;
          this.photoUploading = false;
          this.persist();
        },
        error: () => {
          this.photoUploading = false;
          this.errorMessage = 'Erreur lors de l\'upload de la photo.';
        }
      });
    } else {
      this.persist();
    }
  }

  private persist(): void {
    this.saving = true;
    const payload = { ...this.form };

    const req = this.editingMembre
      ? this.dataService.updateMembre(this.editingMembre.id!, payload)
      : this.dataService.createMembre(payload);

    req.subscribe({
      next: () => { this.closeModal(); this.loadMembres(); },
      error: (err) => {
        this.saving = false;
        this.errorMessage = err?.error?.message ?? 'Une erreur est survenue.';
      }
    });
  }

  confirmDelete(m: MembreEquipe): void {
    if (confirm(`Supprimer ${m.prenom} ${m.nom} du bureau ?`)) {
      this.dataService.deleteMembre(m.id!).subscribe(() => this.loadMembres());
    }
  }
}
