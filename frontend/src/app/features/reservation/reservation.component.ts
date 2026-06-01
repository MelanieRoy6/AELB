import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisponibilitesComponent } from './disponibilites.component';
import { ReservationFormComponent } from './reservation-form.component';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, DisponibilitesComponent, ReservationFormComponent],
  template: `
    <div class="container">
      <h1>Réserver la Salle Jean-Noël Prin</h1>
      <p class="intro">Utilisez le calendrier pour vérifier les disponibilités et remplissez le formulaire ci-dessous pour nous soumettre votre demande.</p>
      
      <div class="reservation-layout">
        <div class="calendar-section">
          <app-disponibilites></app-disponibilites>
        </div>
        <div class="form-section">
          <app-reservation-form></app-reservation-form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 20px; max-width: 1200px; margin: auto; }
    .intro { margin-bottom: 40px; color: #555; }
    .reservation-layout { display: grid; grid-template-columns: 1.5fr 1fr; gap: 40px; }
    
    @media (max-width: 992px) {
      .reservation-layout { grid-template-columns: 1fr; }
    }
  `]
})
export class ReservationComponent {}
