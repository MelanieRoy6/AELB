import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { MembreEquipe } from '../../../core/models';

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
  templateUrl: './equipe-admin.component.html',
  styleUrls: ['./equipe-admin.component.css']
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

  constructor(private adminService: AdminService) {}

  ngOnInit(): void { this.loadMembres(); }

  loadMembres(): void {
    this.adminService.getAdminEquipe().subscribe(m => {
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

  onRoleChange(val: string): void { if (val !== 'Autre') this.form.role = val; else this.form.role = ''; }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { this.errorMessage = 'La photo dépasse 5 Mo.'; return; }
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
      this.adminService.uploadMedia(this.selectedFile, 'EQUIPE' as any, `${this.form.prenom} ${this.form.nom}`).subscribe({
        next: (media: any) => { this.form.photoUrl = media.url; this.photoUploading = false; this.persist(); },
        error: () => { this.photoUploading = false; this.errorMessage = 'Erreur lors de l\'upload de la photo.'; }
      });
    } else {
      this.persist();
    }
  }

  private persist(): void {
    this.saving = true;
    const payload = { ...this.form };
    const req = this.editingMembre
      ? this.adminService.updateMembre(this.editingMembre.id!, payload)
      : this.adminService.createMembre(payload);
    req.subscribe({
      next: () => { this.closeModal(); this.loadMembres(); },
      error: (err) => { this.saving = false; this.errorMessage = err?.error?.message ?? 'Une erreur est survenue.'; }
    });
  }

  confirmDelete(m: MembreEquipe): void {
    if (confirm(`Supprimer ${m.prenom} ${m.nom} du bureau ?`)) {
      this.adminService.deleteMembre(m.id!).subscribe(() => this.loadMembres());
    }
  }
}
