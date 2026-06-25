import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Media } from '../../../core/models';

@Injectable({ providedIn: 'root' })
export class SalleService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMediasByCategorie(categorie: string): Observable<Media[]> {
    return this.http.get<Media[]>(`${this.apiUrl}/medias?categorie=${categorie}`).pipe(
      catchError(() => of([]))
    );
  }
}
