import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDisponibilites(from: string, to: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reservations/disponibilites?from=${from}&to=${to}`).pipe(
      catchError(() => of([]))
    );
  }

  createReservation(reservation: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reservations`, reservation);
  }
}
