import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-demandes-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-header">
      <div class="header-left">
        <h2>Demandes de réservation</h2>
        <p>Gérez les demandes de location de la salle Jean-Noël Prin.</p>
      </div>
      <button class="app-button app-button-primary add-btn" (click)="openModal()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          width="16" height="16">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        Ajouter
      </button>
    </div>

    <!-- Vue desktop : tableau -->
    <div class="table-container app-card desktop-only">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Demandeur</th>
            <th>Dates</th>
            <th>Motif</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let res of demandes">
            <td>
              <div class="demandeur-info">
                <strong>{{ res.nomDemandeur }}</strong>
                <span>{{ res.email }}</span>
                <span>{{ res.telephone }}</span>
              </div>
            </td>
            <td>
              <div class="date-info">
                <span class="date-label">Du</span> {{ res.dateDebut | date:'dd/MM/yyyy HH:mm' }}<br>
                <span class="date-label">Au</span> {{ res.dateFin | date:'dd/MM/yyyy HH:mm' }}
              </div>
            </td>
            <td><p class="motif-text">{{ res.motif }}</p></td>
            <td class="actions">
              <button class="app-button app-button-primary btn-sm" (click)="updateStatut(res.id, 'CONFIRMEE')">Confirmer</button>
              <button class="app-button app-button-accent btn-sm" (click)="updateStatut(res.id, 'REFUSEE')">Refuser</button>
            </td>
          </tr>
          <tr *ngIf="demandes.length === 0">
            <td colspan="4" class="empty-row">Aucune demande en attente.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Vue mobile : cartes -->
    <div class="cards-list mobile-only">
      @if (demandes.length === 0) {
        <div class="empty-card app-card">Aucune demande en attente.</div>
      }
      @for (res of demandes; track res.id) {
        <div class="demande-card app-card">
          <div class="card-top">
            <div>
              <div class="card-name">{{ res.nomDemandeur }}</div>
              <div class="card-contact">{{ res.email }}</div>
              @if (res.telephone) { <div class="card-contact">{{ res.telephone }}</div> }
            </div>
            <span class="pending-badge">En attente</span>
          </div>
          <div class="card-dates">
            <span class="date-label">Du</span> {{ res.dateDebut | date:'dd/MM/yy HH:mm' }}
            <span class="date-sep">→</span>
            <span class="date-label">Au</span> {{ res.dateFin | date:'dd/MM/yy HH:mm' }}
          </div>
          @if (res.motif) {
            <p class="card-motif">{{ res.motif }}</p>
          }
          <div class="card-actions">
            <button class="app-button app-button-primary btn-sm" (click)="updateStatut(res.id, 'CONFIRMEE')">Confirmer</button>
            <button class="app-button app-button-accent btn-sm" (click)="updateStatut(res.id, 'REFUSEE')">Refuser</button>
          </div>
        </div>
      }
    </div>

    <!-- Section : Prochaines réservations confirmées -->
    <div class="section-sep">
      <h3>Prochaines réservations confirmées</h3>
      <p>Réservations à venir, triées chronologiquement.</p>
    </div>

    <!-- Vue desktop : tableau prochaines -->
    <div class="table-container app-card desktop-only">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Demandeur</th>
            <th>Dates</th>
            <th>Motif</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let res of prochaines">
            <td>
              <div class="demandeur-info">
                <strong>{{ res.nomDemandeur }}</strong>
                <span>{{ res.email }}</span>
                <span>{{ res.telephone }}</span>
              </div>
            </td>
            <td>
              <div class="date-info">
                <span class="date-label">Du</span> {{ res.dateDebut | date:'dd/MM/yyyy HH:mm' }}<br>
                <span class="date-label">Au</span> {{ res.dateFin | date:'dd/MM/yyyy HH:mm' }}
              </div>
            </td>
            <td><p class="motif-text">{{ res.motif }}</p></td>
          </tr>
          <tr *ngIf="prochaines.length === 0">
            <td colspan="3" class="empty-row">Aucune réservation confirmée à venir.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Vue mobile : cartes prochaines -->
    <div class="cards-list mobile-only">
      @if (prochaines.length === 0) {
        <div class="empty-card app-card">Aucune réservation confirmée à venir.</div>
      }
      @for (res of prochaines; track res.id) {
        <div class="prochain-card app-card">
          <div class="card-top">
            <div>
              <div class="card-name">{{ res.nomDemandeur }}</div>
              <div class="card-contact">{{ res.email }}</div>
              @if (res.telephone) { <div class="card-contact">{{ res.telephone }}</div> }
            </div>
            <span class="confirmed-badge">Confirmé</span>
          </div>
          <div class="card-dates">
            <span class="date-label">Du</span> {{ res.dateDebut | date:'dd/MM/yy HH:mm' }}
            <span class="date-sep">→</span>
            <span class="date-label">Au</span> {{ res.dateFin | date:'dd/MM/yy HH:mm' }}
          </div>
          @if (res.motif) {
            <p class="card-motif">{{ res.motif }}</p>
          }
        </div>
      }
    </div>

    <!-- Section : Historique des refus -->
    <div class="section-sep">
      <h3>Historique des demandes refusées</h3>
      <p>Toutes les demandes ayant été refusées, de la plus récente à la plus ancienne.</p>
    </div>

    <!-- Vue desktop : tableau refusées -->
    <div class="table-container app-card desktop-only">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Demandeur</th>
            <th>Dates demandées</th>
            <th>Motif</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let res of refusees" class="row-refused">
            <td>
              <div class="demandeur-info">
                <strong>{{ res.nomDemandeur }}</strong>
                <span>{{ res.email }}</span>
                <span>{{ res.telephone }}</span>
              </div>
            </td>
            <td>
              <div class="date-info">
                <span class="date-label">Du</span> {{ res.dateDebut | date:'dd/MM/yyyy HH:mm' }}<br>
                <span class="date-label">Au</span> {{ res.dateFin | date:'dd/MM/yyyy HH:mm' }}
              </div>
            </td>
            <td><p class="motif-text">{{ res.motif }}</p></td>
          </tr>
          <tr *ngIf="refusees.length === 0">
            <td colspan="3" class="empty-row">Aucune demande refusée.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Vue mobile : cartes refusées -->
    <div class="cards-list mobile-only">
      @if (refusees.length === 0) {
        <div class="empty-card app-card">Aucune demande refusée.</div>
      }
      @for (res of refusees; track res.id) {
        <div class="refuse-card app-card">
          <div class="card-top">
            <div>
              <div class="card-name">{{ res.nomDemandeur }}</div>
              <div class="card-contact">{{ res.email }}</div>
              @if (res.telephone) { <div class="card-contact">{{ res.telephone }}</div> }
            </div>
            <span class="refused-badge">Refusé</span>
          </div>
          <div class="card-dates">
            <span class="date-label">Du</span> {{ res.dateDebut | date:'dd/MM/yy HH:mm' }}
            <span class="date-sep">→</span>
            <span class="date-label">Au</span> {{ res.dateFin | date:'dd/MM/yy HH:mm' }}
          </div>
          @if (res.motif) {
            <p class="card-motif">{{ res.motif }}</p>
          }
        </div>
      }
    </div>

    <!-- Modal d'ajout manuel -->
    @if (showModal) {
      <div class="modal-overlay" (click)="closeModal()">
        <div class="modal" (click)="$event.stopPropagation()">

          <div class="modal-header">
            <h3>Ajouter une réservation</h3>
            <button class="modal-close" (click)="closeModal()" aria-label="Fermer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                width="20" height="20">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <form class="modal-form" (ngSubmit)="submitReservation()" #f="ngForm">

            <div class="form-row">
              <div class="form-group">
                <label for="prenom">Prénom *</label>
                <input id="prenom" type="text" [(ngModel)]="form.prenom" name="prenom" placeholder="Prénom" required />
              </div>
              <div class="form-group">
                <label for="nom">Nom *</label>
                <input id="nom" type="text" [(ngModel)]="form.nom" name="nom" placeholder="Nom de famille" required />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="email">Adresse e-mail *</label>
                <input id="email" type="email" [(ngModel)]="form.email" name="email" placeholder="email@exemple.fr" required />
              </div>
              <div class="form-group">
                <label for="telephone">Téléphone *</label>
                <input id="telephone" type="tel" [(ngModel)]="form.telephone" name="telephone" placeholder="06 xx xx xx xx" required />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="dateDebutDate">Date de début *</label>
                <div class="datetime-split">
                  <input id="dateDebutDate" type="date" [(ngModel)]="form.dateDebutDate" name="dateDebutDate" required />
                  <select [(ngModel)]="form.dateDebutTime" name="dateDebutTime" required>
                    <option value="">Heure</option>
                    <option *ngFor="let s of timeSlots" [value]="s">{{ formatSlot(s) }}</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label for="dateFinDate">Date de fin *</label>
                <div class="datetime-split">
                  <input id="dateFinDate" type="date" [(ngModel)]="form.dateFinDate" name="dateFinDate" required />
                  <select [(ngModel)]="form.dateFinTime" name="dateFinTime" required>
                    <option value="">Heure</option>
                    <option *ngFor="let s of timeSlots" [value]="s">{{ formatSlot(s) }}</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label for="motif">Motif / Événement</label>
              <textarea id="motif" [(ngModel)]="form.motif" name="motif" rows="3" placeholder="Type d'événement, description…"></textarea>
            </div>

            @if (errorMessage) {
              <div class="form-error">{{ errorMessage }}</div>
            }

            <div class="modal-actions">
              <button type="button" class="btn-cancel" (click)="closeModal()">Annuler</button>
              <button type="submit" class="app-button app-button-primary" [disabled]="loading || !f.valid">
                @if (loading) { Enregistrement… } @else { Confirmer la réservation }
              </button>
            </div>

          </form>
        </div>
      </div>
    }
  `,
  styles: [`
    .admin-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 24px;
      gap: 12px;
      flex-wrap: wrap;
    }
    .header-left h2 { margin-bottom: 4px; }
    .header-left p { color: #64748b; margin: 0; font-size: 0.9rem; }
    .add-btn { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }

    /* ── Desktop table ── */
    .desktop-only { display: block !important; }
    .mobile-only  { display: none !important; }

    .table-container { overflow-x: auto; }
    .admin-table { width: 100%; border-collapse: collapse; background: white; min-width: 560px; }
    .admin-table th { background: #f8fafc; color: #475569; font-weight: 600; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.05em; padding: 14px 20px; text-align: left; }
    .admin-table td { padding: 16px 20px; border-bottom: 1px solid #f1f5f9; vertical-align: top; }

    .demandeur-info { display: flex; flex-direction: column; }
    .demandeur-info strong { color: #1e293b; margin-bottom: 2px; }
    .demandeur-info span { color: #64748b; font-size: 0.83rem; }

    .date-info { font-size: 0.88rem; color: #334155; line-height: 1.6; }
    .date-label { color: #94a3b8; font-weight: 700; text-transform: uppercase; font-size: 0.68rem; margin-right: 3px; }

    .motif-text { margin: 0; color: #475569; font-size: 0.88rem; max-width: 260px; }

    .actions { display: flex; gap: 8px; flex-wrap: wrap; }
    .btn-sm { padding: 7px 14px !important; font-size: 0.82rem !important; }

    .empty-row { text-align: center; padding: 40px !important; color: #94a3b8; font-style: italic; }

    /* ── Mobile cards ── */
    .cards-list { display: flex; flex-direction: column; gap: 12px; }

    .empty-card {
      text-align: center;
      padding: 40px 20px;
      color: #94a3b8;
      font-style: italic;
    }

    .demande-card { padding: 16px; display: flex; flex-direction: column; gap: 10px; }

    .card-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; }
    .card-name { font-weight: 800; color: #1e3d2f; font-size: 0.95rem; }
    .card-contact { font-size: 0.82rem; color: #64748b; }

    .pending-badge {
      flex-shrink: 0;
      background: #fef3c7;
      color: #b45309;
      font-size: 0.7rem;
      font-weight: 800;
      text-transform: uppercase;
      padding: 3px 9px;
      border-radius: 20px;
    }

    .card-dates {
      display: flex;
      align-items: center;
      gap: 5px;
      flex-wrap: wrap;
      font-size: 0.83rem;
      color: #334155;
      background: #f8fafc;
      border-radius: 8px;
      padding: 8px 10px;
    }
    .date-sep { color: #94a3b8; }

    .card-motif {
      margin: 0;
      font-size: 0.85rem;
      color: #475569;
      font-style: italic;
      border-left: 3px solid #2d6a4f;
      padding-left: 10px;
    }

    .card-actions { display: flex; gap: 8px; flex-wrap: wrap; }

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
      max-width: 580px;
      max-height: 90vh;
      overflow-y: auto;
    }
    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 24px 16px;
      border-bottom: 1px solid #f1f5f9;
    }
    .modal-header h3 { margin: 0; font-size: 1.05rem; font-weight: 800; color: #1e3d2f; }
    .modal-close {
      background: none; border: none; cursor: pointer;
      color: #94a3b8; padding: 4px; border-radius: 6px; display: flex;
    }
    .modal-close:hover { color: #475569; background: #f1f5f9; }

    .modal-form { padding: 20px 24px 24px; display: flex; flex-direction: column; gap: 16px; }

    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .form-group { display: flex; flex-direction: column; gap: 5px; }
    .form-group label { font-size: 0.78rem; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.4px; }
    .form-group input,
    .form-group textarea {
      border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 9px 13px;
      font-size: 0.88rem; color: #1e293b; outline: none; font-family: inherit;
      background: #fafcfe; transition: border-color 0.18s, box-shadow 0.18s;
    }
    .form-group input:focus,
    .form-group textarea:focus { border-color: #2d6a4f; box-shadow: 0 0 0 3px rgba(45,106,79,0.12); background: white; }
    .form-group textarea { resize: vertical; min-height: 72px; }

    .datetime-split { display: flex; gap: 8px; }
    .datetime-split input[type="date"] { flex: 1; min-width: 0; }
    .datetime-split select {
      width: 110px;
      flex-shrink: 0;
      border: 1.5px solid #e2e8f0;
      border-radius: 10px;
      padding: 9px 8px;
      font-size: 0.88rem;
      color: #1e293b;
      background: #fafcfe;
      cursor: pointer;
      font-family: inherit;
    }
    .datetime-split select:focus {
      border-color: #2d6a4f;
      box-shadow: 0 0 0 3px rgba(45,106,79,0.12);
      background: white;
      outline: none;
    }

    .form-error { background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; border-radius: 8px; padding: 9px 13px; font-size: 0.86rem; }

    .modal-actions { display: flex; justify-content: flex-end; gap: 10px; padding-top: 4px; flex-wrap: wrap; }
    .btn-cancel {
      background: #f1f5f9; color: #475569; border: 1px solid #e2e8f0;
      border-radius: 50px; padding: 9px 20px; font-size: 0.88rem; font-weight: 600; cursor: pointer;
    }
    .btn-cancel:hover { background: #e2e8f0; }

    /* ── Section séparateur prochaines réservations ── */
    .section-sep {
      margin: 36px 0 20px;
      padding-top: 28px;
      border-top: 2px solid #f1f5f9;
    }
    .section-sep h3 { margin-bottom: 4px; color: #1e3d2f; font-size: 1.05rem; font-weight: 800; }
    .section-sep p { color: #64748b; font-size: 0.88rem; margin: 0; }

    .confirmed-badge {
      flex-shrink: 0;
      background: #d1fae5;
      color: #065f46;
      font-size: 0.7rem;
      font-weight: 800;
      text-transform: uppercase;
      padding: 3px 9px;
      border-radius: 20px;
    }
    .prochain-card { padding: 16px; display: flex; flex-direction: column; gap: 10px; }

    .refused-badge {
      flex-shrink: 0;
      background: #fee2e2;
      color: #991b1b;
      font-size: 0.7rem;
      font-weight: 800;
      text-transform: uppercase;
      padding: 3px 9px;
      border-radius: 20px;
    }
    .refuse-card { padding: 16px; display: flex; flex-direction: column; gap: 10px; }
    .row-refused td { opacity: 0.65; }
    .row-refused .demandeur-info strong { color: #991b1b; }

    /* ── Responsive ── */
    @media (max-width: 640px) {
      .desktop-only { display: none !important; }
      .mobile-only  { display: flex !important; }
      .form-row { grid-template-columns: 1fr; }
      .modal-actions { justify-content: stretch; }
      .modal-actions button { flex: 1; text-align: center; }
    }
  `]
})
export class DemandesAdminComponent implements OnInit {
  demandes: any[] = [];
  prochaines: any[] = [];
  refusees: any[] = [];
  showModal = false;
  loading = false;
  errorMessage = '';

  form = { prenom: '', nom: '', email: '', telephone: '', dateDebutDate: '', dateDebutTime: '', dateFinDate: '', dateFinTime: '', motif: '' };

  readonly timeSlots: string[] = (() => {
    const slots: string[] = [];
    for (let h = 0; h < 24; h++) {
      slots.push(`${String(h).padStart(2, '0')}:00`);
      slots.push(`${String(h).padStart(2, '0')}:30`);
    }
    return slots;
  })();

  formatSlot(slot: string): string {
    const [h, m] = slot.split(':');
    return `${parseInt(h, 10)}h${m}`;
  }

  constructor(private dataService: DataService) {}

  ngOnInit(): void { this.loadDemandes(); }

  loadDemandes() {
    this.dataService.getAdminReservations().subscribe(all => {
      const now = new Date();
      this.demandes = all.filter((r: any) => r.statut === 'EN_ATTENTE');
      this.prochaines = all
        .filter((r: any) => r.statut === 'CONFIRMEE' && new Date(r.dateFin) >= now)
        .sort((a: any, b: any) => new Date(a.dateDebut).getTime() - new Date(b.dateDebut).getTime());
      this.refusees = all.filter((r: any) => r.statut === 'REFUSEE');
    });
  }

  updateStatut(id: number, statut: string) {
    if (confirm(`Êtes-vous sûr de vouloir ${statut === 'CONFIRMEE' ? 'confirmer' : 'refuser'} cette réservation ?`)) {
      this.dataService.updateReservationStatut(id, statut).subscribe(() => this.loadDemandes());
    }
  }

  openModal() {
    this.form = { prenom: '', nom: '', email: '', telephone: '', dateDebutDate: '', dateDebutTime: '', dateFinDate: '', dateFinTime: '', motif: '' };
    this.errorMessage = '';
    this.showModal = true;
  }

  closeModal() { this.showModal = false; this.loading = false; this.errorMessage = ''; }

  submitReservation() {
    if (!this.form.prenom || !this.form.nom || !this.form.email || !this.form.telephone
        || !this.form.dateDebutDate || !this.form.dateDebutTime || !this.form.dateFinDate || !this.form.dateFinTime) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }
    const dateDebut = `${this.form.dateDebutDate}T${this.form.dateDebutTime}`;
    const dateFin = `${this.form.dateFinDate}T${this.form.dateFinTime}`;
    if (new Date(dateFin) <= new Date(dateDebut)) {
      this.errorMessage = 'La date de fin doit être postérieure à la date de début.';
      return;
    }
    this.loading = true;
    this.errorMessage = '';
    const payload = {
      nomDemandeur: `${this.form.prenom} ${this.form.nom}`,
      email: this.form.email, telephone: this.form.telephone,
      dateDebut, dateFin,
      motif: this.form.motif || 'Réservation manuelle', statut: 'CONFIRMEE'
    };
    this.dataService.createAdminReservation(payload).subscribe({
      next: () => { this.closeModal(); this.loadDemandes(); },
      error: (err) => {
        this.loading = false;
        const s = err?.status;
        if (s === 403) this.errorMessage = 'Accès refusé (403).';
        else if (s === 404) this.errorMessage = 'Point d\'accès introuvable (404) — redémarrez le serveur.';
        else if (s === 400) this.errorMessage = `Données invalides (400) : ${err?.error?.message ?? ''}`;
        else if (s === 500) this.errorMessage = `Erreur serveur (500) : ${err?.error?.message ?? err?.error?.error ?? ''}`;
        else this.errorMessage = `Erreur ${s ?? '?'} : ${err?.error?.message ?? err?.message ?? 'Une erreur est survenue.'}`;
        console.error('Erreur création réservation admin:', err);
      }
    });
  }
}
