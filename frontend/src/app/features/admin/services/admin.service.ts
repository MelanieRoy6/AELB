import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { MembreEquipe, Media } from '../../../core/models';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Réservations
  getAdminReservations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/reservations`).pipe(
      catchError(() => of([]))
    );
  }

  updateReservationStatut(id: number, statut: string, commentaire?: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/admin/reservations/${id}/statut`, { statut, commentaire });
  }

  createAdminReservation(reservation: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/reservations`, reservation);
  }

  // Adhérents
  getAdherents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/adherents`).pipe(
      catchError(() => of([]))
    );
  }

  createAdherent(adherent: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/adherents`, adherent);
  }

  deleteAdherent(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/admin/adherents/${id}`);
  }

  // Médias
  getMedias(): Observable<Media[]> {
    return this.http.get<Media[]>(`${this.apiUrl}/medias`).pipe(
      catchError(() => of([]))
    );
  }

  uploadMedia(file: File, categorie: string, legende?: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('categorie', categorie);
    if (legende) formData.append('legende', legende);
    return this.http.post<any>(`${this.apiUrl}/admin/medias/upload`, formData);
  }

  deleteMedia(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/admin/medias/${id}`);
  }

  // Équipe (admin)
  getAdminEquipe(): Observable<MembreEquipe[]> {
    return this.http.get<MembreEquipe[]>(`${this.apiUrl}/admin/equipe`).pipe(
      catchError(() => of([]))
    );
  }

  createMembre(membre: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/equipe`, membre);
  }

  updateMembre(id: number, membre: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/admin/equipe/${id}`, membre);
  }

  deleteMembre(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/admin/equipe/${id}`);
  }
}
