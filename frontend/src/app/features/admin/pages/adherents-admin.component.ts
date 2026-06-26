import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../services/admin.service';

interface AdherentForm {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  section: string;
  dateNaissance: string;
  anneeAdhesion: number | null;
  cotisationPayee: boolean;
  anneeCotisation: number | null;
  actif: boolean;
}

@Component({
  selector: 'app-adherents-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './adherents-admin.component.html',
  styleUrls: ['./adherents-admin.component.css']
})
export class AdherentsAdminComponent implements OnInit {
  adherents: any[] = [];
  searchTerm = '';
  anneeActuelle = new Date().getFullYear();

  // Modal ajout/édition
  showModal = false;
  editingId: number | null = null;
  saving = false;
  form: AdherentForm = this.emptyForm();

  // Import Excel
  importing = false;
  importMessage = '';
  importError = false;

  // Pagination
  currentPage = 1;
  readonly pageSize = 10;

  // Copie emails
  copySuccess = false;

  // Modal email groupé
  showEmailModal = false;
  sendingEmail = false;
  emailForm = { sujet: '', corps: '' };
  emailSuccess = '';
  emailError = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.adminService.getAdherents().subscribe(res => this.adherents = res);
  }

  emptyForm(): AdherentForm {
    return {
      nom: '', prenom: '', email: '', telephone: '', section: '',
      dateNaissance: '', anneeAdhesion: this.anneeActuelle,
      cotisationPayee: false, anneeCotisation: this.anneeActuelle, actif: true
    };
  }

  openAdd(): void {
    this.editingId = null;
    this.form = this.emptyForm();
    this.showModal = true;
  }

  openEdit(a: any): void {
    this.editingId = a.id;
    this.form = {
      nom: a.nom, prenom: a.prenom, email: a.email,
      telephone: a.telephone ?? '',
      section: a.section ?? '',
      dateNaissance: a.dateNaissance ?? '',
      anneeAdhesion: a.anneeAdhesion ?? this.anneeActuelle,
      cotisationPayee: a.cotisationPayee ?? false,
      anneeCotisation: a.anneeCotisation ?? this.anneeActuelle,
      actif: a.actif ?? true
    };
    this.showModal = true;
  }

  closeModal(): void { this.showModal = false; }

  save(): void {
    if (!this.form.nom || !this.form.prenom || !this.form.email) return;
    this.saving = true;
    const obs = this.editingId
      ? this.adminService.updateAdherent(this.editingId, this.form)
      : this.adminService.createAdherent(this.form);
    obs.subscribe({
      next: () => { this.load(); this.closeModal(); this.saving = false; },
      error: () => { this.saving = false; }
    });
  }

  delete(id: number): void {
    if (confirm('Supprimer cet adhérent définitivement ?')) {
      this.adminService.deleteAdherent(id).subscribe(() => this.load());
    }
  }

  filteredAdherents(): any[] {
    const q = this.searchTerm.toLowerCase();
    const list = q
      ? this.adherents.filter(a =>
          a.nom.toLowerCase().includes(q) ||
          a.prenom.toLowerCase().includes(q) ||
          a.email.toLowerCase().includes(q) ||
          (a.section ?? '').toLowerCase().includes(q)
        )
      : [...this.adherents];
    return list.sort((a, b) =>
      a.nom.localeCompare(b.nom, 'fr') || a.prenom.localeCompare(b.prenom, 'fr')
    );
  }

  pagedAdherents(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredAdherents().slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredAdherents().length / this.pageSize));
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get paginationInfo(): string {
    const total = this.filteredAdherents().length;
    if (total === 0) return 'Aucun résultat';
    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(this.currentPage * this.pageSize, total);
    return `${start}–${end} sur ${total} adhérent${total > 1 ? 's' : ''}`;
  }

  setPage(n: number): void {
    if (n >= 1 && n <= this.totalPages) this.currentPage = n;
  }

  get totalActifs(): number { return this.adherents.filter(a => a.actif).length; }

  get cotisationsPayees(): number {
    return this.adherents.filter(a => a.cotisationPayee && a.anneeCotisation === this.anneeActuelle).length;
  }

  formatAnniversaire(dateStr: string): string {
    if (!dateStr) return '—';
    const [, month, day] = dateStr.split('-');
    return `${day}/${month}`;
  }

  cotisationStatus(a: any): 'payee' | 'attente' {
    return a.cotisationPayee && a.anneeCotisation === this.anneeActuelle ? 'payee' : 'attente';
  }

  // Import Excel
  onImportFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    this.importing = true;
    this.importMessage = '';
    this.adminService.importAdherentsExcel(file).subscribe({
      next: (res: any) => {
        this.importing = false;
        this.importMessage = `${res.imported} adhérent(s) importé(s) avec succès.`;
        this.importError = false;
        this.load();
        input.value = '';
      },
      error: (err: any) => {
        this.importing = false;
        this.importMessage = err.error?.error ?? "Erreur lors de l'import du fichier.";
        this.importError = true;
        input.value = '';
      }
    });
  }

  // Export Excel
  exportExcel(): void {
    this.adminService.exportAdherentsExcel().subscribe(blob => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'adherents_aelb.xlsx';
      link.click();
    });
  }

  // Copier tous les emails
  copyEmails(): void {
    this.adminService.getAdherentEmails().subscribe(emails => {
      if (!emails.length) return;
      navigator.clipboard.writeText(emails.join(', ')).then(() => {
        this.copySuccess = true;
        setTimeout(() => this.copySuccess = false, 2500);
      });
    });
  }

  // Email groupé
  openEmailModal(): void {
    this.emailForm = { sujet: '', corps: '' };
    this.emailSuccess = '';
    this.emailError = '';
    this.showEmailModal = true;
  }

  closeEmailModal(): void { this.showEmailModal = false; }

  sendEmailGroupe(): void {
    if (!this.emailForm.sujet || !this.emailForm.corps) return;
    this.sendingEmail = true;
    this.emailSuccess = '';
    this.emailError = '';
    this.adminService.sendEmailGroupe(this.emailForm.sujet, this.emailForm.corps).subscribe({
      next: () => {
        this.sendingEmail = false;
        this.emailSuccess = `Email envoyé à ${this.totalActifs} adhérent(s) actif(s).`;
      },
      error: () => {
        this.sendingEmail = false;
        this.emailError = "Erreur lors de l'envoi. Vérifiez la configuration SMTP.";
      }
    });
  }
}
