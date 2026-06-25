import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-adherents-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-header">
      <div class="header-left">
        <h2>Gestion des adhérents</h2>
        <p>Consultez et gérez la liste des membres de l'association.</p>
      </div>
      <button class="app-button app-button-primary export-btn" (click)="exportCSV()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          width="15" height="15">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Exporter CSV
      </button>
    </div>

    <div class="search-container">
      <div class="search-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          width="16" height="16" class="search-icon">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input type="text" [(ngModel)]="searchTerm" placeholder="Rechercher par nom, prénom ou email…">
      </div>
    </div>

    <!-- Desktop : tableau -->
    <div class="table-container app-card desktop-only">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Adhérent</th>
            <th>Contact</th>
            <th>Section</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let a of filteredAdherents()">
            <td>
              <div class="user-info">
                <div class="avatar">{{ a.nom[0] }}{{ a.prenom[0] }}</div>
                <strong>{{ a.nom }} {{ a.prenom }}</strong>
              </div>
            </td>
            <td>
              <div class="contact-info">
                <span>{{ a.email }}</span>
                <small>{{ a.telephone }}</small>
              </div>
            </td>
            <td><span class="section-tag">{{ a.section }}</span></td>
            <td>
              <button class="app-button app-button-accent btn-sm" (click)="delete(a.id)">Supprimer</button>
            </td>
          </tr>
          <tr *ngIf="filteredAdherents().length === 0">
            <td colspan="4" class="empty-row">Aucun adhérent trouvé.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile : cartes -->
    <div class="cards-list mobile-only">
      @if (filteredAdherents().length === 0) {
        <div class="empty-card app-card">Aucun adhérent trouvé.</div>
      }
      @for (a of filteredAdherents(); track a.id) {
        <div class="adherent-card app-card">
          <div class="card-top">
            <div class="avatar">{{ a.nom[0] }}{{ a.prenom[0] }}</div>
            <div class="card-info">
              <div class="card-name">{{ a.nom }} {{ a.prenom }}</div>
              <div class="card-email">{{ a.email }}</div>
              @if (a.telephone) { <div class="card-phone">{{ a.telephone }}</div> }
            </div>
            @if (a.section) { <span class="section-tag">{{ a.section }}</span> }
          </div>
          <div class="card-footer">
            <button class="app-button app-button-accent btn-sm" (click)="delete(a.id)">Supprimer</button>
          </div>
        </div>
      }
    </div>
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
    .export-btn { display: flex; align-items: center; gap: 7px; flex-shrink: 0; }

    .search-container { margin-bottom: 20px; }
    .search-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      background: white;
      border: 1.5px solid #e2e8f0;
      border-radius: 12px;
      overflow: hidden;
      transition: border-color 0.18s, box-shadow 0.18s;
    }
    .search-wrapper:focus-within { border-color: #2d6a4f; box-shadow: 0 0 0 3px rgba(45,106,79,0.1); }
    .search-icon { position: absolute; left: 14px; color: #94a3b8; flex-shrink: 0; }
    .search-wrapper input {
      width: 100%; padding: 12px 14px 12px 42px;
      border: none; outline: none;
      font-size: 0.9rem; background: transparent; color: #1e293b;
    }

    /* ── Desktop / Mobile toggle ── */
    .desktop-only { display: block; }
    .mobile-only  { display: none; }

    /* ── Desktop table ── */
    .table-container { overflow-x: auto; }
    .admin-table { width: 100%; border-collapse: collapse; background: white; min-width: 500px; }
    .admin-table th { background: #f8fafc; color: #475569; font-weight: 600; text-transform: uppercase; font-size: 0.73rem; letter-spacing: 0.05em; padding: 14px 20px; text-align: left; }
    .admin-table td { padding: 14px 20px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }

    .user-info { display: flex; align-items: center; gap: 10px; }
    .avatar {
      width: 36px; height: 36px; background: #edf5ee; color: #2d6a4f;
      border-radius: 10px; display: flex; align-items: center; justify-content: center;
      font-weight: 800; font-size: 0.78rem; flex-shrink: 0;
    }
    .user-info strong { color: #1e293b; font-size: 0.9rem; }

    .contact-info { display: flex; flex-direction: column; }
    .contact-info span { color: #475569; font-size: 0.88rem; }
    .contact-info small { color: #94a3b8; font-size: 0.8rem; }

    .section-tag { background: #edf5ee; color: #2d6a4f; padding: 3px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; white-space: nowrap; }

    .btn-sm { padding: 6px 14px !important; font-size: 0.8rem !important; }
    .empty-row { text-align: center; padding: 40px !important; color: #94a3b8; font-style: italic; }

    /* ── Mobile cards ── */
    .cards-list { flex-direction: column; gap: 10px; }
    .empty-card { text-align: center; padding: 40px 20px; color: #94a3b8; font-style: italic; }

    .adherent-card { padding: 14px 16px; display: flex; flex-direction: column; gap: 12px; }
    .card-top { display: flex; align-items: flex-start; gap: 12px; }
    .card-info { flex: 1; min-width: 0; }
    .card-name { font-weight: 800; color: #1e3d2f; font-size: 0.92rem; }
    .card-email { font-size: 0.8rem; color: #64748b; word-break: break-all; }
    .card-phone { font-size: 0.8rem; color: #94a3b8; }
    .card-footer { display: flex; justify-content: flex-end; }

    /* ── Responsive ── */
    @media (max-width: 640px) {
      .desktop-only { display: none; }
      .mobile-only  { display: flex; }
    }
  `]
})
export class AdherentsAdminComponent implements OnInit {
  adherents: any[] = [];
  searchTerm = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void { this.load(); }

  load() { this.dataService.getAdherents().subscribe(res => this.adherents = res); }

  filteredAdherents() {
    const q = this.searchTerm.toLowerCase();
    return this.adherents.filter(a =>
      a.nom.toLowerCase().includes(q) ||
      a.prenom.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q)
    );
  }

  delete(id: number) {
    if (confirm('Supprimer cet adhérent ?')) {
      this.dataService.deleteAdherent(id).subscribe(() => this.load());
    }
  }

  exportCSV() {
    const headers = ['Nom', 'Prénom', 'Email', 'Téléphone', 'Section'];
    const rows = this.adherents.map(a => [a.nom, a.prenom, a.email, a.telephone, a.section].join(','));
    const blob = new Blob([[headers.join(','), ...rows].join('\n')], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'adherents_aelb.csv';
    link.click();
  }
}
