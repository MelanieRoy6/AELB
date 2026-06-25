import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminService } from '../services/admin.service';

const STORAGE_POSTITS = 'aelb_postits';
const STORAGE_ADHERENTS = 'aelb_adherents_last_update';

interface PostIt {
  id: string;
  text: string;
  color: 'yellow' | 'green' | 'blue' | 'pink';
  createdAt: string;
}

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  todayLabel = '';
  nextResa: any = null;
  daysUntil = 0;
  demandesEnAttente = 0;

  adherentLastUpdate: Date | null = null;
  adherentMonthsAgo = 0;
  adherentStatus: 'never' | 'ok' | 'warn' | 'due' = 'never';

  postIts: PostIt[] = [];
  showAddForm = false;
  newText = '';
  newColor: PostIt['color'] = 'yellow';

  editingId: string | null = null;
  editText = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.buildTodayLabel();
    this.loadNextReservation();
    this.loadAdherentReminder();
    this.loadPostIts();
  }

  private buildTodayLabel(): void {
    this.todayLabel = new Date().toLocaleDateString('fr-FR', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
  }

  loadNextReservation(): void {
    this.adminService.getAdminReservations().subscribe(resas => {
      const now = new Date();
      this.demandesEnAttente = resas.filter((r: any) => r.statut === 'EN_ATTENTE').length;
      const future = resas
        .filter(r => r.statut === 'CONFIRMEE' && new Date(r.dateDebut) > now)
        .sort((a: any, b: any) => new Date(a.dateDebut).getTime() - new Date(b.dateDebut).getTime());
      this.nextResa = future[0] ?? null;
      if (this.nextResa) {
        const diff = new Date(this.nextResa.dateDebut).getTime() - now.getTime();
        this.daysUntil = Math.ceil(diff / (1000 * 60 * 60 * 24));
      }
    });
  }

  loadAdherentReminder(): void {
    const raw = localStorage.getItem(STORAGE_ADHERENTS);
    if (!raw) { this.adherentStatus = 'never'; return; }
    this.adherentLastUpdate = new Date(raw);
    const diffMs = Date.now() - this.adherentLastUpdate.getTime();
    this.adherentMonthsAgo = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30.44));
    if (this.adherentMonthsAgo >= 12) this.adherentStatus = 'due';
    else if (this.adherentMonthsAgo >= 10) this.adherentStatus = 'warn';
    else this.adherentStatus = 'ok';
  }

  markAdherentsUpdated(): void {
    localStorage.setItem(STORAGE_ADHERENTS, new Date().toISOString());
    this.loadAdherentReminder();
  }

  loadPostIts(): void {
    const raw = localStorage.getItem(STORAGE_POSTITS);
    this.postIts = raw ? JSON.parse(raw) : [];
  }

  private savePostIts(): void {
    localStorage.setItem(STORAGE_POSTITS, JSON.stringify(this.postIts));
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) { this.newText = ''; this.newColor = 'yellow'; }
  }

  addPostIt(): void {
    if (!this.newText.trim()) return;
    this.postIts.unshift({ id: Date.now().toString(), text: this.newText.trim(), color: this.newColor, createdAt: new Date().toISOString() });
    this.savePostIts();
    this.newText = '';
    this.newColor = 'yellow';
    this.showAddForm = false;
  }

  deletePostIt(id: string): void {
    this.postIts = this.postIts.filter(p => p.id !== id);
    this.savePostIts();
  }

  startEdit(p: PostIt): void { this.editingId = p.id; this.editText = p.text; }
  saveEdit(p: PostIt): void { if (this.editText.trim()) { p.text = this.editText.trim(); this.savePostIts(); } this.editingId = null; }
  cancelEdit(): void { this.editingId = null; }
}
