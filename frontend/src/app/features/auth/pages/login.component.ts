import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="login-container">
      <div class="login-box app-card">
        <div class="login-header">
          <h2>Espace Admin</h2>
          <p>Veuillez vous identifier pour accéder à la gestion.</p>
        </div>
        <form [formGroup]="loginForm" (ngSubmit)="onLogin()">
          <div class="form-group">
            <label>Email</label>
            <input type="email" formControlName="email" placeholder="votre@email.fr">
          </div>
          <div class="form-group">
            <label>Mot de passe</label>
            <input type="password" formControlName="password" placeholder="••••••••">
          </div>
          <div class="error" *ngIf="error">{{ error }}</div>
          <button type="submit" class="app-button app-button-primary login-btn" [disabled]="loginForm.invalid">Se connecter</button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      min-height: calc(100vh - 160px);
      align-items: center;
      justify-content: center;
      background: var(--g010, #f6faf7);
      padding: 24px;
    }
    .login-box { padding: 44px; width: 100%; max-width: 440px; }
    .login-header { text-align: center; margin-bottom: 32px; }
    .login-header h2 { margin-bottom: 8px; color: var(--g900, #1e3d2f); }
    .login-header p { color: var(--text-muted, #556b5a); font-size: 0.95rem; margin: 0; }

    .form-group { margin-bottom: 24px; }
    label { display: block; margin-bottom: 8px; font-weight: 600; color: var(--g900, #1e3d2f); font-size: 0.92rem; }
    input {
      width: 100%;
      padding: 13px 18px;
      border: 1.5px solid var(--border, rgba(45,106,79,.2));
      border-radius: 14px;
      box-sizing: border-box;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
      background: var(--g010, #f6faf7);
      font-size: 1rem;
      color: var(--text, #1a2e1d);
    }
    input:focus {
      outline: none;
      border-color: var(--g700, #3d7a5c);
      background: #fff;
      box-shadow: 0 0 0 3px rgba(45, 106, 79, 0.15);
    }
    .login-btn { width: 100%; margin-top: 8px; }
    .error {
      color: #7a3f18;
      background: #fdf3ec;
      border: 1px solid rgba(158, 85, 36, 0.25);
      padding: 10px 14px;
      border-radius: 10px;
      margin-bottom: 20px;
      text-align: center;
      font-weight: 600;
      font-size: 0.9rem;
    }
  `]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  error = '';

  onLogin() {
    if (this.loginForm.invalid) return;
    this.authService.login(this.loginForm.value as { email: string; password: string }).subscribe({
      next: () => this.router.navigate(['/admin']),
      error: () => this.error = 'Identifiants invalides'
    });
  }
}
