import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
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
