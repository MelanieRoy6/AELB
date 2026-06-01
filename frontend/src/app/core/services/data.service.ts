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
}
