import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../../core/services/seo.service';
import { DisponibilitesComponent } from '../components/disponibilites.component';
import { ReservationFormComponent } from '../components/reservation-form.component';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, DisponibilitesComponent, ReservationFormComponent],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
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
