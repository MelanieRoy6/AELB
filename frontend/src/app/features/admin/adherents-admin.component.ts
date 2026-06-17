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
      <div class="header-content">
        <h2>Gestion des Adhérents</h2>
        <p>Consultez et gérez la liste des membres de l'association.</p>
      </div>
      <button class="app-button app-button-primary" (click)="exportCSV()">
        <span>📊</span> Exporter CSV
      </button>
    </div>

    <div class="search-container">
      <div class="search-wrapper">
        <span class="search-icon">🔍</span>
        <input type="text" [(ngModel)]="searchTerm" placeholder="Rechercher par nom, prénom ou email...">
      </div>
    </div>

    <div class="table-container app-card">
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
  `,
  styles: [`
    .admin-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 30px; }
    .header-content h2 { margin-bottom: 5px; }
    .header-content p { color: #64748b; margin: 0; }
    
    .search-container { margin-bottom: 25px; }
    .search-wrapper { position: relative; display: flex; align-items: center; }
    .search-icon { position: absolute; left: 16px; color: #94a3b8; }
    .search-wrapper input { 
      width: 100%; 
      padding: 14px 14px 14px 45px; 
      border: 2px solid #edf2f7; 
      border-radius: 16px; 
      font-size: 1rem;
      transition: all 0.3s ease;
      background: white;
    }
    .search-wrapper input:focus {
      outline: none;
      border-color: #a8dadc;
      box-shadow: 0 0 0 4px rgba(168, 218, 220, 0.2);
    }
    
    .table-container { overflow: hidden; }
    .admin-table { width: 100%; border-collapse: collapse; background: white; }
    .admin-table th { background: #f8fafc; color: #475569; font-weight: 600; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.05em; padding: 16px 24px; text-align: left; }
    .admin-table td { padding: 16px 24px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
    
    .user-info { display: flex; align-items: center; gap: 12px; }
    .avatar { width: 36px; height: 36px; background: #f1faee; color: #457b9d; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.8rem; }
    .user-info strong { color: #1e293b; }
    
    .contact-info { display: flex; flex-direction: column; }
    .contact-info span { color: #475569; font-size: 0.9rem; }
    .contact-info small { color: #94a3b8; }
    
    .section-tag { background: #e2e8f0; color: #475569; padding: 4px 10px; border-radius: 8px; font-size: 0.8rem; font-weight: 600; }
    
    .btn-sm { padding: 6px 14px; font-size: 0.8rem; }
    .empty-row { text-align: center; padding: 40px !important; color: #94a3b8; font-style: italic; }
  `]
})
export class AdherentsAdminComponent implements OnInit {
  adherents: any[] = [];
  searchTerm = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.dataService.getAdherents().subscribe(res => this.adherents = res);
  }

  filteredAdherents() {
    return this.adherents.filter(a => 
      a.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      a.prenom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      a.email.toLowerCase().includes(this.searchTerm.toLowerCase())
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
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'adherents_aelb.csv';
    link.click();
  }
}
