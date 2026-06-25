import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-medias-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './medias-admin.component.html',
  styleUrls: ['./medias-admin.component.css']
})
export class MediasAdminComponent implements OnInit {
  medias: any[] = [];
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  selectedCategorie = 'GALERIE';
  legende = '';
  uploading = false;
  isDragging = false;
  successMsg = '';
  errorMsg = '';
  activeFilter = 'ALL';
  categories = ['ALL', 'GALERIE', 'EQUIPE', 'SALLE'];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void { this.load(); }

  get filteredMedias(): any[] {
    if (this.activeFilter === 'ALL') return this.medias;
    return this.medias.filter(m => m.categorie === this.activeFilter);
  }

  load() { this.adminService.getMedias().subscribe(res => this.medias = res); }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) this.handleFile(input.files[0]);
  }

  onDragOver(event: DragEvent) { event.preventDefault(); this.isDragging = true; }
  onDragLeave() { this.isDragging = false; }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    const file = event.dataTransfer?.files[0];
    if (file) this.handleFile(file);
  }

  handleFile(file: File) {
    this.clearMessages();
    if (!file.type.startsWith('image/')) { this.errorMsg = 'Ce fichier n\'est pas une image.'; return; }
    if (file.size > 10 * 1024 * 1024) { this.errorMsg = 'Le fichier dépasse la limite de 10 Mo.'; return; }
    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = e => this.previewUrl = e.target?.result as string;
    reader.readAsDataURL(file);
  }

  clearFile(event?: Event) {
    event?.stopPropagation();
    this.selectedFile = null;
    this.previewUrl = null;
    this.legende = '';
    this.clearMessages();
  }

  onUpload() {
    if (!this.selectedFile) return;
    this.uploading = true;
    this.clearMessages();
    this.adminService.uploadMedia(this.selectedFile, this.selectedCategorie, this.legende).subscribe({
      next: () => { this.uploading = false; this.successMsg = 'Photo ajoutée avec succès.'; this.clearFile(); this.load(); },
      error: (err) => {
        this.uploading = false;
        if (err.status === 401 || err.status === 403) this.errorMsg = 'Accès refusé (401/403). Veuillez vous reconnecter.';
        else if (err.status === 0) this.errorMsg = 'Impossible de contacter le serveur. Vérifiez que le backend est démarré.';
        else if (err.error && typeof err.error === 'string') this.errorMsg = `Erreur ${err.status} : ${err.error}`;
        else this.errorMsg = `Erreur ${err.status} lors de l'envoi. Consultez les logs du backend.`;
        console.error('[Upload] Détails :', err);
      }
    });
  }

  delete(id: number) {
    if (!confirm('Supprimer définitivement cette photo ?')) return;
    this.adminService.deleteMedia(id).subscribe(() => this.load());
  }

  private clearMessages() { this.successMsg = ''; this.errorMsg = ''; }
}
