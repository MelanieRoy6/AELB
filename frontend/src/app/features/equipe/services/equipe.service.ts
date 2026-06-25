import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { MembreEquipe } from '../../../core/models';

@Injectable({ providedIn: 'root' })
export class EquipeService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getEquipe(): Observable<MembreEquipe[]> {
    return this.http.get<MembreEquipe[]>(`${this.apiUrl}/equipe`).pipe(
      catchError(() => of([]))
    );
  }
}
