import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../services/admin.service';

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

  constructor(private adminService: AdminService) {}

  ngOnInit(): void { this.load(); }

  load() { this.adminService.getAdherents().subscribe(res => this.adherents = res); }

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
      this.adminService.deleteAdherent(id).subscribe(() => this.load());
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
