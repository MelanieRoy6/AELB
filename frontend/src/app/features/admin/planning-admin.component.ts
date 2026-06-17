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
    <div class="admin-header">
      <h2>Planning global de la salle</h2>
      <p>Visualisez toutes les réservations sur les 3 prochaines années.</p>
    </div>

    <div class="calendar-admin app-card">
      <full-calendar [options]="calendarOptions"></full-calendar>
    </div>
    
    <div class="legend-container">
      <div class="legend-item">
        <span class="box confirmed"></span> 
        <span class="label">Confirmé</span>
      </div>
      <div class="legend-item">
        <span class="box pending"></span> 
        <span class="label">En attente</span>
      </div>
    </div>
  `,
  styles: [`
    .admin-header { margin-bottom: 25px; }
    .admin-header h2 { margin-bottom: 5px; }
    .admin-header p { color: #64748b; }

    .calendar-admin { background: white; padding: 30px; }
    
    .legend-container { margin-top: 25px; display: flex; gap: 30px; justify-content: center; }
    .legend-item { display: flex; align-items: center; gap: 10px; }
    .box { width: 18px; height: 18px; border-radius: 6px; }
    .confirmed { background: #457b9d; box-shadow: 0 4px 10px rgba(69, 123, 157, 0.2); }
    .pending { background: #f4a261; box-shadow: 0 4px 10px rgba(244, 162, 97, 0.2); }
    .label { font-weight: 600; color: #1d3557; font-size: 0.9rem; }

    /* Customizing FullCalendar styles to match our theme */
    :host ::ng-deep .fc { font-family: inherit; }
    :host ::ng-deep .fc-toolbar-title { font-size: 1.4rem !important; color: #1d3557; }
    :host ::ng-deep .fc-button { 
      background: #f1faee !important; 
      border: none !important; 
      color: #1d3557 !important; 
      font-weight: 600 !important;
      border-radius: 12px !important;
      text-transform: capitalize !important;
    }
    :host ::ng-deep .fc-button-active { background: #a8dadc !important; color: #1d3557 !important; }
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
