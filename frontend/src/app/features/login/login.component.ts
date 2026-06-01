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
      <div class="login-box">
        <h2>Espace Administration</h2>
        <form [formGroup]="loginForm" (ngSubmit)="onLogin()">
          <div class="form-group">
            <label>Utilisateur</label>
            <input type="text" formControlName="username">
          </div>
          <div class="form-group">
            <label>Mot de passe</label>
            <input type="password" formControlName="password">
          </div>
          <div class="error" *ngIf="error">{{ error }}</div>
          <button type="submit" [disabled]="loginForm.invalid">Se connecter</button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-container { display: flex; height: 100vh; align-items: center; justify-content: center; background: #f1faee; }
    .login-box { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); width: 100%; max-width: 400px; }
    .form-group { margin-bottom: 20px; }
    label { display: block; margin-bottom: 8px; font-weight: bold; }
    input { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box; }
    button { width: 100%; padding: 12px; background: #1d3557; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; }
    .error { color: #e63946; margin-bottom: 15px; text-align: center; }
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
