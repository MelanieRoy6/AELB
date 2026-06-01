import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-adherents-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="header-actions">
      <h2>Gestion des Adhérents</h2>
      <button class="export-btn" (click)="exportCSV()">Exporter CSV</button>
    </div>

    <div class="search-bar">
      <input type="text" [(ngModel)]="searchTerm" placeholder="Rechercher un nom, prénom ou email...">
    </div>

    <table class="admin-table">
      <thead>
        <tr>
          <th>Nom / Prénom</th>
          <th>Email / Tel</th>
          <th>Section</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let a of filteredAdherents()">
          <td>{{ a.nom }} {{ a.prenom }}</td>
          <td>{{ a.email }}<br><small>{{ a.telephone }}</small></td>
          <td>{{ a.section }}</td>
          <td>
            <button class="delete-btn" (click)="delete(a.id)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [`
    .header-actions { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .export-btn { background: #1d3557; color: white; border: none; padding: 10px 15px; border-radius: 4px; cursor: pointer; }
    .search-bar { margin-bottom: 20px; }
    .search-bar input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; }
    .admin-table { width: 100%; border-collapse: collapse; background: white; }
    .admin-table th, .admin-table td { padding: 12px; text-align: left; border-bottom: 1px solid #eee; }
    .delete-btn { background: #e63946; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; }
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
