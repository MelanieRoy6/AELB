import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-disponibilites',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  template: `
    <div class="calendar-container">
      <h3>Planning d'occupation de la salle</h3>
      <full-calendar [options]="calendarOptions"></full-calendar>
      <div class="legend">
        <span class="box reserved"></span> Dates réservées (indisponibles)
      </div>
    </div>
  `,
  styles: [`
    .calendar-container { margin-bottom: 30px; }
    .legend { margin-top: 10px; display: flex; align-items: center; gap: 10px; font-size: 0.9em; }
    .box { width: 20px; height: 20px; border-radius: 3px; }
    .reserved { background-color: #e63946; }
    ::ng-deep .fc-event-reserved { background-color: #e63946 !important; border-color: #e63946 !important; cursor: not-allowed; }
  `]
})
export class DisponibilitesComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    locale: 'fr',
    events: [],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth'
    },
    datesSet: (info) => this.loadDispos(info.startStr, info.endStr)
  };

  constructor(private dataService: DataService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  loadDispos(start: string, end: string) {
    this.dataService.getDisponibilites(start, end).subscribe(dispos => {
      const events: EventInput[] = dispos.map(d => ({
        start: d.start,
        end: d.end,
        display: 'background',
        classNames: ['fc-event-reserved'],
        title: 'Occupé'
      }));
      this.calendarOptions.events = events;
      this.cdr.detectChanges();
    });
  }
}
