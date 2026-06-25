import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Evenement, FacebookPost, MembreEquipe, Media } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUpcomingEvents(): Observable<Evenement[]> {
    return this.http.get<Evenement[]>(`${this.apiUrl}/evenements/upcoming`).pipe(
      catchError(err => {
        console.error('Error fetching upcoming events', err);
        return of([]);
      })
    );
  }

  getEvents(type?: string): Observable<any> {
    let url = `${this.apiUrl}/evenements`;
    if (type) url += `?type=${type}`;
    return this.http.get<any>(url).pipe(
      catchError(err => {
        console.error('Error fetching events', err);
        return of({ content: [] });
      })
    );
  }

  getEquipe(): Observable<MembreEquipe[]> {
    return this.http.get<MembreEquipe[]>(`${this.apiUrl}/equipe`).pipe(
      catchError(err => {
        console.error('Error fetching equipe', err);
        return of([]);
      })
    );
  }

  getAdminEquipe(): Observable<MembreEquipe[]> {
    return this.http.get<MembreEquipe[]>(`${this.apiUrl}/admin/equipe`).pipe(
      catchError(err => { console.error('Error fetching admin equipe', err); return of([]); })
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

  getMedias(): Observable<Media[]> {
    return this.http.get<Media[]>(`${this.apiUrl}/medias`).pipe(
      catchError(err => { console.error('Error fetching medias', err); return of([]); })
    );
  }

  getMediasByCategorie(categorie: string): Observable<Media[]> {
    return this.http.get<Media[]>(`${this.apiUrl}/medias?categorie=${categorie}`).pipe(
      catchError(err => { console.error('Error fetching medias by categorie', err); return of([]); })
    );
  }

  getDisponibilites(from: string, to: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reservations/disponibilites?from=${from}&to=${to}`).pipe(
      catchError(err => {
        console.error('Error fetching disponibilites', err);
        return of([]);
      })
    );
  }

  createReservation(reservation: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reservations`, reservation);
  }

  getAdminReservations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/reservations`).pipe(
      catchError(err => {
        console.error('Error fetching admin reservations', err);
        return of([]);
      })
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
      catchError(err => {
        console.error('Error fetching adherents', err);
        return of([]);
      })
    );
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

  getFacebookPosts(limit = 3): Observable<FacebookPost[]> {
    return this.http.get<FacebookPost[]>(`${this.apiUrl}/facebook/posts?limit=${limit}`).pipe(
      catchError(err => {
        console.error('Error fetching Facebook posts', err);
        return of([]);
      })
    );
  }
}
