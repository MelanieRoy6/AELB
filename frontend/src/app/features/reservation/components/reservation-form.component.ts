import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../services/reservation.service';

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
            <label>Adresse e-mail</label>
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
            <div class="datetime-split">
              <input type="date" (change)="onDebutDateChange($event)" placeholder="Date">
              <select (change)="onDebutTimeChange($event)">
                <option value="">Heure</option>
                <option *ngFor="let s of timeSlots" [value]="s">{{ formatSlot(s) }}</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>Fin de l'occupation</label>
            <div class="datetime-split">
              <input type="date" (change)="onFinDateChange($event)" placeholder="Date">
              <select (change)="onFinTimeChange($event)">
                <option value="">Heure</option>
                <option *ngFor="let s of timeSlots" [value]="s">{{ formatSlot(s) }}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label>Motif de la location</label>
          <textarea formControlName="motif" rows="3" placeholder="Description de votre événement..."></textarea>
        </div>

        @if (conflictWarning) {
          <div class="conflict-warning">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              width="18" height="18" aria-hidden="true">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <span>
              <strong>Attention :</strong> la salle semble déjà réservée sur tout ou partie de cette période.
              Votre demande sera quand même transmise, mais elle pourrait être refusée.
              Consultez le calendrier pour voir les créneaux disponibles.
            </span>
          </div>
        }

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
    .form-container { max-width: 700px; margin: 0 auto; padding: 32px; }
    .form-header { margin-bottom: 24px; text-align: center; }
    .form-header h3 { margin-bottom: 6px; font-size: 1.6rem; }
    .form-header p { color: #666; font-size: 0.95rem; margin: 0; }
    .form-group { margin-bottom: 18px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    label { display: block; margin-bottom: 6px; font-weight: 600; color: #1d3557; font-size: 0.9rem; }
    input, textarea, select {
      width: 100%; padding: 12px 14px; border: 2px solid #edf2f7; border-radius: 12px;
      box-sizing: border-box; transition: all 0.3s ease; font-size: 1rem; background: #f8fafc; font-family: inherit;
    }
    input:focus, textarea:focus, select:focus {
      outline: none; border-color: #a8dadc; background: white; box-shadow: 0 0 0 4px rgba(168, 218, 220, 0.2);
    }
    .datetime-split { display: flex; gap: 8px; }
    .datetime-split input[type="date"] { flex: 1; min-width: 0; }
    .datetime-split select { width: 108px; flex-shrink: 0; padding: 12px 8px; cursor: pointer; }
    .submit-btn { width: 100%; margin-top: 16px; }
    .success-box { text-align: center; padding: 24px 16px; }
    .success-icon {
      width: 60px; height: 60px; background: #d8f3dc; color: #1b4332;
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
      margin: 0 auto 16px; font-size: 2rem; font-weight: bold;
    }
    .success-box h4 { color: #1b4332; margin-bottom: 8px; }
    .success-box p { margin-bottom: 20px; color: #4a5568; font-size: 0.95rem; }
    .error-msg { background: #fff5f5; color: #e63946; padding: 12px; border-radius: 8px; font-size: 0.9rem; margin-bottom: 16px; border-left: 4px solid #e63946; }
    .conflict-warning {
      display: flex; align-items: flex-start; gap: 10px;
      background: #fffbeb; border: 1.5px solid #fbbf24; color: #92400e;
      padding: 12px 14px; border-radius: 10px; font-size: 0.88rem; line-height: 1.5; margin-bottom: 4px;
    }
    .conflict-warning svg { flex-shrink: 0; margin-top: 1px; color: #d97706; }
    @media (max-width: 992px) { .form-container { padding: 24px 20px; } .form-header h3 { font-size: 1.35rem; } }
    @media (max-width: 600px) {
      .form-container { padding: 20px 16px; border-radius: 14px; width: 100%; box-sizing: border-box; }
      .form-header { margin-bottom: 18px; text-align: center; }
      .form-header h3 { font-size: 1.2rem; } .form-header p { font-size: 0.85rem; }
      .form-row { grid-template-columns: 1fr; gap: 0; }
      .form-group { margin-bottom: 14px; }
      label { font-size: 0.83rem; margin-bottom: 5px; }
      input, textarea, select { padding: 11px 12px; font-size: 0.95rem; border-radius: 10px; }
      .datetime-split { flex-direction: column; gap: 6px; }
      .datetime-split select { width: 100%; }
      .submit-btn { margin-top: 12px; }
      .conflict-warning { font-size: 0.83rem; padding: 10px 12px; }
    }
  `]
})
export class ReservationFormComponent implements OnInit {
  resForm: FormGroup;
  submitted = false;
  loading = false;
  error = '';
  conflictWarning = false;

  dateDebutDate = '';
  dateDebutTime = '';
  dateFinDate = '';
  dateFinTime = '';

  readonly timeSlots: string[] = (() => {
    const slots: string[] = [];
    for (let h = 0; h < 24; h++) {
      slots.push(`${String(h).padStart(2, '0')}:00`);
      slots.push(`${String(h).padStart(2, '0')}:30`);
    }
    return slots;
  })();

  formatSlot(slot: string): string {
    const [h, m] = slot.split(':');
    return `${parseInt(h, 10)}h${m}`;
  }

  onDebutDateChange(e: Event): void {
    this.dateDebutDate = (e.target as HTMLInputElement).value;
    this.resForm.get('dateDebut')!.setValue(
      this.dateDebutDate && this.dateDebutTime ? `${this.dateDebutDate}T${this.dateDebutTime}` : ''
    );
    this.checkConflict();
  }
  onDebutTimeChange(e: Event): void {
    this.dateDebutTime = (e.target as HTMLSelectElement).value;
    this.resForm.get('dateDebut')!.setValue(
      this.dateDebutDate && this.dateDebutTime ? `${this.dateDebutDate}T${this.dateDebutTime}` : ''
    );
    this.checkConflict();
  }
  onFinDateChange(e: Event): void {
    this.dateFinDate = (e.target as HTMLInputElement).value;
    this.resForm.get('dateFin')!.setValue(
      this.dateFinDate && this.dateFinTime ? `${this.dateFinDate}T${this.dateFinTime}` : ''
    );
    this.checkConflict();
  }
  onFinTimeChange(e: Event): void {
    this.dateFinTime = (e.target as HTMLSelectElement).value;
    this.resForm.get('dateFin')!.setValue(
      this.dateFinDate && this.dateFinTime ? `${this.dateFinDate}T${this.dateFinTime}` : ''
    );
    this.checkConflict();
  }

  private checkConflict(): void {
    const debut = this.resForm.get('dateDebut')?.value;
    const fin = this.resForm.get('dateFin')?.value;
    if (!debut || !fin || new Date(fin) <= new Date(debut)) {
      this.conflictWarning = false;
      return;
    }
    this.reservationService.getDisponibilites(debut, fin).subscribe(periods => {
      this.conflictWarning = periods.length > 0;
    });
  }

  constructor(private fb: FormBuilder, private reservationService: ReservationService) {
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
      this.error = 'La date de fin doit être après la date de début.';
      this.loading = false;
      return;
    }
    this.reservationService.createReservation(this.resForm.value).subscribe({
      next: () => { this.submitted = true; this.loading = false; },
      error: () => { this.error = "Une erreur est survenue lors de l'envoi. Veuillez réessayer."; this.loading = false; }
    });
  }

  reset() {
    this.submitted = false;
    this.conflictWarning = false;
    this.resForm.reset();
    this.dateDebutDate = '';
    this.dateDebutTime = '';
    this.dateFinDate = '';
    this.dateFinTime = '';
  }
}
