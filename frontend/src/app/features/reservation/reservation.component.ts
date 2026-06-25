import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';
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
    .container { padding: 40px 24px 60px; max-width: 1200px; margin: auto; }
    .container h1 { font-size: 2rem; margin-bottom: 12px; }
    .intro { margin-bottom: 40px; color: #555; font-size: 1rem; line-height: 1.6; }
    .reservation-layout { display: grid; grid-template-columns: 1.5fr 1fr; gap: 40px; align-items: start; }

    @media (max-width: 992px) {
      .reservation-layout { display: flex; flex-direction: column; }
      .form-section    { order: 1; }
      .calendar-section { order: 2; }
    }

    @media (max-width: 600px) {
      .container { padding: 24px 16px 40px; }
      .container h1 { font-size: 1.6rem; text-align: center; }
      .intro { text-align: center; }
      .reservation-layout { align-items: center; }
    }
  `]
})
export class ReservationComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.set({
      title: 'Réserver la Salle Jean-Noël Prin à Brains',
      description: 'Faites une demande de réservation pour la Salle Jean-Noël Prin à Brains (44830). Vérifiez les disponibilités et soumettez votre projet : mariage, anniversaire, concert, apéro, vide-grenier.',
      keywords: 'réserver salle Brains, demande réservation salle, location salle événement Brains 44830, disponibilités salle Jean-Noël Prin',
      path: '/reservation'
    });
  }
}
