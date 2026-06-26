import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

const MOCK_DISPOS = [
  // ── 2026 (weekends, CONFIRMÉE uniquement) ────────────────────────
  { start: '2026-01-10T09:00:00', end: '2026-01-11T20:00:00' },
  { start: '2026-01-17T08:00:00', end: '2026-01-18T18:00:00' },
  { start: '2026-02-07T14:00:00', end: '2026-02-07T22:00:00' },
  { start: '2026-02-21T09:00:00', end: '2026-02-22T17:00:00' },
  { start: '2026-03-07T09:00:00', end: '2026-03-08T18:00:00' },
  { start: '2026-03-21T14:00:00', end: '2026-03-22T22:00:00' },
  { start: '2026-04-04T15:00:00', end: '2026-04-05T00:00:00' },
  { start: '2026-04-18T09:00:00', end: '2026-04-19T20:00:00' },
  { start: '2026-05-23T10:00:00', end: '2026-05-24T19:00:00' },
  { start: '2026-06-06T12:00:00', end: '2026-06-07T22:00:00' },
  { start: '2026-06-20T09:00:00', end: '2026-06-21T17:00:00' },
  { start: '2026-07-04T10:00:00', end: '2026-07-05T20:00:00' },
  { start: '2026-07-18T09:00:00', end: '2026-07-19T18:00:00' },
  { start: '2026-08-22T09:00:00', end: '2026-08-23T18:00:00' },
  { start: '2026-09-05T14:00:00', end: '2026-09-06T23:00:00' },
  { start: '2026-09-19T11:00:00', end: '2026-09-20T21:00:00' },
  { start: '2026-10-17T10:00:00', end: '2026-10-18T19:00:00' },
  { start: '2026-11-21T14:00:00', end: '2026-11-22T20:00:00' },
  { start: '2026-12-05T19:00:00', end: '2026-12-06T02:00:00' },
  { start: '2026-12-19T18:00:00', end: '2026-12-20T03:00:00' },
  { start: '2026-12-26T11:00:00', end: '2026-12-27T20:00:00' },
  // ── 2027 ─────────────────────────────────────────────────────────
  { start: '2027-01-09T10:00:00', end: '2027-01-10T19:00:00' },
  { start: '2027-01-23T10:00:00', end: '2027-01-24T20:00:00' },
  { start: '2027-02-20T14:00:00', end: '2027-02-21T22:00:00' },
  { start: '2027-03-06T09:00:00', end: '2027-03-07T18:00:00' },
  // ── 2028 ─────────────────────────────────────────────────────────
  { start: '2028-01-01T21:00:00', end: '2028-01-02T04:00:00' },
];

@Injectable({ providedIn: 'root' })
export class ReservationService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDisponibilites(from: string, to: string): Observable<any[]> {
    const fromDate = new Date(from);
    const toDate   = new Date(to);
    const filtered = () => MOCK_DISPOS.filter(
      d => new Date(d.start) >= fromDate && new Date(d.start) <= toDate
    );

    return this.http.get<any[]>(`${this.apiUrl}/reservations/disponibilites?from=${from}&to=${to}`).pipe(
      map(data => data?.length ? data : filtered()),
      catchError(() => of(filtered()))
    );
  }

  createReservation(reservation: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reservations`, reservation);
  }
}
