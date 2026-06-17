import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-demandes-admin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-header">
      <h2>Demandes de réservation en attente</h2>
      <p>Gérez les demandes de location de la salle Jean-Noël Prin.</p>
    </div>
    
    <div class="table-container app-card">
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
                <span class="date-label">Du</span> {{ res.dateDebut | date: 'dd/MM/yyyy HH:mm' }}<br>
                <span class="date-label">Au</span> {{ res.dateFin | date: 'dd/MM/yyyy HH:mm' }}
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
  `,
  styles: [`
    .admin-header { margin-bottom: 25px; }
    .admin-header h2 { margin-bottom: 5px; }
    .admin-header p { color: #64748b; }

    .table-container { overflow: hidden; }
    .admin-table { width: 100%; border-collapse: collapse; background: white; }
    .admin-table th { background: #f8fafc; color: #475569; font-weight: 600; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.05em; padding: 16px 24px; text-align: left; }
    .admin-table td { padding: 20px 24px; border-bottom: 1px solid #f1f5f9; vertical-align: top; }
    
    .demandeur-info { display: flex; flex-direction: column; }
    .demandeur-info strong { color: #1e293b; margin-bottom: 4px; }
    .demandeur-info span { color: #64748b; font-size: 0.85rem; }
    
    .date-info { font-size: 0.9rem; color: #334155; line-height: 1.6; }
    .date-label { color: #94a3b8; font-weight: 600; text-transform: uppercase; font-size: 0.7rem; margin-right: 4px; }
    
    .motif-text { margin: 0; color: #475569; font-size: 0.9rem; max-width: 300px; }
    
    .actions { display: flex; gap: 12px; }
    .btn-sm { padding: 8px 16px; font-size: 0.85rem; }
    
    .empty-row { text-align: center; padding: 40px !important; color: #94a3b8; font-style: italic; }
  `]
})
export class DemandesAdminComponent implements OnInit {
  demandes: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadDemandes();
  }

  loadDemandes() {
    this.dataService.getAdminReservations().subscribe(all => {
      this.demandes = all.filter((r: any) => r.statut === 'EN_ATTENTE');
    });
  }

  updateStatut(id: number, statut: string) {
    if (confirm(`Êtes-vous sûr de vouloir ${statut.toLowerCase()} cette réservation ?`)) {
      this.dataService.updateReservationStatut(id, statut).subscribe(() => {
        this.loadDemandes();
      });
    }
  }
}
