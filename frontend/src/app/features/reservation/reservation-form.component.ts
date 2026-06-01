import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="form-container">
      <h3>Demande de réservation</h3>
      
      <form [formGroup]="resForm" (ngSubmit)="onSubmit()" *ngIf="!submitted; else successMsg">
        <div class="form-group">
          <label>Nom complet du demandeur</label>
          <input type="text" formControlName="nomDemandeur">
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Email</label>
            <input type="email" formControlName="email">
          </div>
          <div class="form-group">
            <label>Téléphone</label>
            <input type="tel" formControlName="telephone">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Date & Heure de début</label>
            <input type="datetime-local" formControlName="dateDebut">
          </div>
          <div class="form-group">
            <label>Date & Heure de fin</label>
            <input type="datetime-local" formControlName="dateFin">
          </div>
        </div>

        <div class="form-group">
          <label>Motif de la location (événement, réunion...)</label>
          <textarea formControlName="motif" rows="3"></textarea>
        </div>

        <div class="error-msg" *ngIf="error">{{ error }}</div>

        <button type="submit" [disabled]="resForm.invalid || loading">
          {{ loading ? 'Envoi en cours...' : 'Envoyer la demande' }}
        </button>
      </form>

      <ng-template #successMsg>
        <div class="success-box">
          <h4>Merci pour votre demande !</h4>
          <p>Elle a été transmise au bureau de l'AELB. Vous recevrez prochainement un email de confirmation à l'adresse indiquée.</p>
          <button (click)="reset()">Faire une autre demande</button>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .form-container { background: #f8f9fa; padding: 25px; border-radius: 12px; }
    .form-group { margin-bottom: 15px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    label { display: block; margin-bottom: 5px; font-weight: 500; }
    input, textarea { width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
    button { background: #1d3557; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: bold; width: 100%; margin-top: 10px; }
    button:disabled { background: #ccc; }
    .success-box { text-align: center; padding: 20px; color: #1b4332; background: #d8f3dc; border-radius: 8px; }
    .error-msg { color: #e63946; font-size: 0.9em; margin-bottom: 10px; }
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
