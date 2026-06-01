import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-demandes-admin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Demandes de réservation en attente</h2>
    
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
            <strong>{{ res.nomDemandeur }}</strong><br>
            <small>{{ res.email }} | {{ res.telephone }}</small>
          </td>
          <td>
            Du {{ res.dateDebut | date: 'short' }}<br>
            Au {{ res.dateFin | date: 'short' }}
          </td>
          <td>{{ res.motif }}</td>
          <td class="actions">
            <button class="confirm" (click)="updateStatut(res.id, 'CONFIRMEE')">Confirmer</button>
            <button class="reject" (click)="updateStatut(res.id, 'REFUSEE')">Refuser</button>
          </td>
        </tr>
        <tr *ngIf="demandes.length === 0">
          <td colspan="4" style="text-align: center;">Aucune demande en attente.</td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [`
    .admin-table { width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; }
    .admin-table th, .admin-table td { padding: 15px; text-align: left; border-bottom: 1px solid #eee; }
    .admin-table th { background: #f1faee; color: #1d3557; }
    .actions { display: flex; gap: 10px; }
    button { border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; color: white; font-weight: bold; }
    .confirm { background: #2a9d8f; }
    .reject { background: #e63946; }
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
