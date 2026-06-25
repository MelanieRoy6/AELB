import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-demandes-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './demandes-admin.component.html',
  styleUrls: ['./demandes-admin.component.css']
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

  constructor(private adminService: AdminService) {}

  ngOnInit(): void { this.loadDemandes(); }

  loadDemandes() {
    this.adminService.getAdminReservations().subscribe(all => {
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
      this.adminService.updateReservationStatut(id, statut).subscribe(() => this.loadDemandes());
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
    this.adminService.createAdminReservation(payload).subscribe({
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
