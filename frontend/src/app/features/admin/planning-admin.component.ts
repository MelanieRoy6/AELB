import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-planning-admin',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  template: `
    <h2>Planning global de la salle (3 ans)</h2>
    <div class="calendar-admin">
      <full-calendar [options]="calendarOptions"></full-calendar>
    </div>
    <div class="legend">
      <span class="box confirmed"></span> Confirmé
      <span class="box pending"></span> En attente
    </div>
  `,
  styles: [`
    .calendar-admin { background: white; padding: 20px; border-radius: 8px; }
    .legend { margin-top: 15px; display: flex; gap: 20px; align-items: center; }
    .box { width: 15px; height: 15px; border-radius: 3px; }
    .confirmed { background: #2a9d8f; }
    .pending { background: #f4a261; }
  `]
})
export class PlanningAdminComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    locale: 'fr',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridYear'
    },
    events: []
  };

  constructor(private dataService: DataService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadAllReservations();
  }

  loadAllReservations() {
    this.dataService.getAdminReservations().subscribe(resas => {
      this.calendarOptions.events = resas.map(r => ({
        title: `${r.nomDemandeur} (${r.statut})`,
        start: r.dateDebut,
        end: r.dateFin,
        backgroundColor: r.statut === 'CONFIRMEE' ? '#2a9d8f' : (r.statut === 'EN_ATTENTE' ? '#f4a261' : '#e63946'),
        borderColor: 'transparent'
      }));
      this.cdr.detectChanges();
    });
  }
}
