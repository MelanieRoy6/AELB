import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

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
            <label>Utilisateur</label>
            <input type="text" formControlName="username" placeholder="Identifiant">
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
    .login-container { display: flex; min-height: calc(100vh - 160px); align-items: center; justify-content: center; background: #f8fafc; padding: 20px; }
    .login-box { padding: 40px; width: 100%; max-width: 450px; }
    .login-header { text-align: center; margin-bottom: 30px; }
    .login-header h2 { margin-bottom: 10px; color: #1d3557; }
    .login-header p { color: #64748b; font-size: 0.95rem; }
    
    .form-group { margin-bottom: 25px; }
    label { display: block; margin-bottom: 8px; font-weight: 600; color: #1d3557; }
    input { 
      width: 100%; 
      padding: 14px 18px; 
      border: 2px solid #f1f5f9; 
      border-radius: 16px; 
      box-sizing: border-box; 
      transition: all 0.3s ease;
      background: #f8fafc;
      font-size: 1rem;
    }
    input:focus {
      outline: none;
      border-color: #a8dadc;
      background: white;
      box-shadow: 0 0 0 4px rgba(168, 218, 220, 0.2);
    }
    .login-btn { width: 100%; margin-top: 10px; }
    .error { 
      color: #e63946; 
      background: #fff5f5; 
      padding: 10px; 
      border-radius: 8px; 
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
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  error = '';

  onLogin() {
    if (this.loginForm.invalid) return;
    this.authService.login(this.loginForm.value as any).subscribe({
      next: () => this.router.navigate(['/admin']),
      error: () => this.error = 'Identifiants invalides'
    });
  }
}
