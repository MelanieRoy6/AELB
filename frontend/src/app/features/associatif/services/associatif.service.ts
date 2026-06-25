import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Evenement } from '../../../core/models';

@Injectable({ providedIn: 'root' })
export class AssociatifService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getActualites(): Observable<{ content: Evenement[] }> {
    return this.http.get<{ content: Evenement[] }>(`${this.apiUrl}/evenements?type=ACTU`).pipe(
      catchError(() => of({ content: [] }))
    );
  }
}
