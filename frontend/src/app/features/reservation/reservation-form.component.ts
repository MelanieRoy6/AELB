import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="form-container app-card">
      <div class="form-header">
        <h3>Demande de réservation</h3>
        <p>Remplissez ce formulaire pour solliciter la location de la salle.</p>
      </div>
      
      <form [formGroup]="resForm" (ngSubmit)="onSubmit()" *ngIf="!submitted; else successMsg">
        <div class="form-group">
          <label>Nom complet du demandeur</label>
          <input type="text" formControlName="nomDemandeur" placeholder="Ex: Jean Dupont">
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Email</label>
            <input type="email" formControlName="email" placeholder="votre@email.com">
          </div>
          <div class="form-group">
            <label>Téléphone</label>
            <input type="tel" formControlName="telephone" placeholder="06 00 00 00 00">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Début de l'occupation</label>
            <input type="datetime-local" formControlName="dateDebut">
          </div>
          <div class="form-group">
            <label>Fin de l'occupation</label>
            <input type="datetime-local" formControlName="dateFin">
          </div>
        </div>

        <div class="form-group">
          <label>Motif de la location</label>
          <textarea formControlName="motif" rows="3" placeholder="Description de votre événement..."></textarea>
        </div>

        <div class="error-msg" *ngIf="error">{{ error }}</div>

        <button type="submit" class="app-button app-button-primary submit-btn" [disabled]="resForm.invalid || loading">
          {{ loading ? 'Envoi en cours...' : 'Envoyer la demande' }}
        </button>
      </form>

      <ng-template #successMsg>
        <div class="success-box">
          <div class="success-icon">✓</div>
          <h4>Merci pour votre demande !</h4>
          <p>Elle a été transmise au bureau de l'AELB. Vous recevrez prochainement un email de confirmation.</p>
          <button (click)="reset()" class="app-button app-button-secondary">Faire une autre demande</button>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .form-container { max-width: 700px; margin: 40px auto; padding: 40px; }
    .form-header { margin-bottom: 30px; text-align: center; }
    .form-header h3 { margin-bottom: 5px; font-size: 1.8rem; }
    .form-header p { color: #666; }
    
    .form-group { margin-bottom: 20px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    
    label { display: block; margin-bottom: 8px; font-weight: 600; color: #1d3557; font-size: 0.95rem; }
    input, textarea { 
      width: 100%; 
      padding: 12px 16px; 
      border: 2px solid #edf2f7; 
      border-radius: 12px; 
      box-sizing: border-box; 
      transition: all 0.3s ease;
      font-size: 1rem;
      background: #f8fafc;
    }
    input:focus, textarea:focus {
      outline: none;
      border-color: #a8dadc;
      background: white;
      box-shadow: 0 0 0 4px rgba(168, 218, 220, 0.2);
    }
    
    .submit-btn { width: 100%; margin-top: 20px; }
    
    .success-box { text-align: center; padding: 30px; }
    .success-icon { 
      width: 60px; height: 60px; background: #d8f3dc; color: #1b4332; 
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
      margin: 0 auto 20px; font-size: 2rem; font-weight: bold;
    }
    .success-box h4 { color: #1b4332; margin-bottom: 10px; }
    .success-box p { margin-bottom: 25px; color: #4a5568; }
    
    .error-msg { 
      background: #fff5f5; color: #e63946; padding: 12px; 
      border-radius: 8px; font-size: 0.9em; margin-bottom: 20px; 
      border-left: 4px solid #e63946;
    }
  `]
})
export class ReservationFormComponent implements OnInit {
  resForm: FormGroup;
  submitted = false;
  loading = false;
  error = '';

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.resForm = this.fb.group({
      nomDemandeur: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      motif: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.resForm.invalid) return;

    this.loading = true;
    this.error = '';

    const start = new Date(this.resForm.value.dateDebut);
    const end = new Date(this.resForm.value.dateFin);

    if (start >= end) {
      this.error = "La date de fin doit être après la date de début.";
      this.loading = false;
      return;
    }

    this.dataService.createReservation(this.resForm.value).subscribe({
      next: () => {
        this.submitted = true;
        this.loading = false;
      },
      error: (err) => {
        this.error = "Une erreur est survenue lors de l'envoi. Veuillez réessayer.";
        this.loading = false;
      }
    });
  }

  reset() {
    this.submitted = false;
    this.resForm.reset();
  }
}
