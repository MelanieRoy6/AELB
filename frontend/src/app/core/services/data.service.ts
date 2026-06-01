import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Evenement, MembreEquipe, Media } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUpcomingEvents(): Observable<Evenement[]> {
    return this.http.get<Evenement[]>(`${this.apiUrl}/evenements/upcoming`);
  }

  getEvents(type?: string): Observable<any> {
    let url = `${this.apiUrl}/evenements`;
    if (type) url += `?type=${type}`;
    return this.http.get<any>(url);
  }

  getEquipe(): Observable<MembreEquipe[]> {
    return this.http.get<MembreEquipe[]>(`${this.apiUrl}/equipe`);
  }

  getMedias(): Observable<Media[]> {
    return this.http.get<Media[]>(`${this.apiUrl}/medias`);
  }

  getDisponibilites(from: string, to: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reservations/disponibilites?from=${from}&to=${to}`);
  }

  createReservation(reservation: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reservations`, reservation);
  }

  getAdminReservations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/reservations`);
  }

  updateReservationStatut(id: number, statut: string, commentaire?: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/admin/reservations/${id}/statut`, { statut, commentaire });
  }

  // Adhérents
  getAdherents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/adherents`);
  }

  createAdherent(adherent: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/adherents`, adherent);
  }

  deleteAdherent(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/admin/adherents/${id}`);
  }

  // Medias
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
}
