import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';

const SESSION_DURATION_MS = 30 * 60 * 1000; // 30 minutes

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/auth';
  private currentUserSubject = new BehaviorSubject<string | null>(null);

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.currentUserSubject.next(localStorage.getItem('token'));
    }
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username: credentials.email, password: credentials.password }).pipe(
      tap(res => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('login_time', Date.now().toString());
        }
        this.currentUserSubject.next(res.token);
      })
    );
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('login_time');
    }
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isSessionValid(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    const loginTime = localStorage.getItem('login_time');
    if (!loginTime) return false;
    return Date.now() - parseInt(loginTime, 10) < SESSION_DURATION_MS;
  }

  isAdmin(): boolean {
    const token = this.getToken();
    if (!token) return false;
    if (!this.isSessionValid()) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const roles: string[] = payload['roles'] ?? [];
      return roles.includes('ADMIN');
    } catch {
      return false;
    }
  }
}
