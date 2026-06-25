import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AdminService } from '../services/admin.service';

const MONTHS_FR = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

interface DayCell {
  day: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'none';
}

interface MonthGrid {
  name: string;
  month: number;
  count: number;
  cells: (DayCell | null)[];
}

@Component({
  selector: 'app-planning-admin',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './planning-admin.component.html',
  styleUrls: ['./planning-admin.component.css']
})
export class PlanningAdminComponent implements OnInit {
  view: 'month' | 'year' = 'year';
  currentYear = new Date().getFullYear();
  monthsData: MonthGrid[] = [];

  private rawEvents: EventInput[] = [];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    locale: 'fr',
    headerToolbar: { left: 'prev,next today', center: 'title', right: '' },
    events: []
  };

  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void { this.loadAllReservations(); }

  setView(v: 'month' | 'year'): void { this.view = v; if (v === 'year') this.buildYearView(); }
  prevYear(): void { this.currentYear--; this.buildYearView(); }
  nextYear(): void { this.currentYear++; this.buildYearView(); }

  isToday(month: number, day: number): boolean {
    const today = new Date();
    return today.getFullYear() === this.currentYear && today.getMonth() === month && today.getDate() === day;
  }

  isCurrentMonth(month: number): boolean {
    const today = new Date();
    return today.getFullYear() === this.currentYear && today.getMonth() === month;
  }

  loadAllReservations(): void {
    this.adminService.getAdminReservations().subscribe(resas => {
      this.rawEvents = resas.map(r => ({
        title: r.nomDemandeur,
        start: r.dateDebut,
        end: r.dateFin,
        backgroundColor: r.statut === 'CONFIRMEE' ? '#2a9d8f' : r.statut === 'EN_ATTENTE' ? '#f4a261' : '#e63946',
        borderColor: 'transparent',
        extendedProps: { statut: r.statut }
      }));
      this.calendarOptions = { ...this.calendarOptions, events: this.rawEvents };
      if (this.view === 'year') this.buildYearView();
      this.cdr.detectChanges();
    });
  }

  private buildYearView(): void {
    const reserved = this.buildReservedDaysMap();
    this.monthsData = Array.from({ length: 12 }, (_, m) => this.buildMonth(this.currentYear, m, reserved));
  }

  private buildReservedDaysMap(): Map<string, 'confirmed' | 'pending' | 'cancelled'> {
    const priority = (s: string) => s === 'CONFIRMEE' ? 3 : s === 'EN_ATTENTE' ? 2 : 1;
    const map = new Map<string, 'confirmed' | 'pending' | 'cancelled'>();
    for (const event of this.rawEvents) {
      const statut: string = (event as any).extendedProps?.statut ?? '';
      const cssStatus: 'confirmed' | 'pending' | 'cancelled' =
        statut === 'CONFIRMEE' ? 'confirmed' : statut === 'EN_ATTENTE' ? 'pending' : 'cancelled';
      const start = new Date(event.start as string);
      const end = event.end ? new Date(event.end as string) : new Date(start);
      const cur = new Date(start);
      while (cur <= end) {
        const key = this.dateKey(cur);
        const existing = map.get(key);
        if (!existing || priority(statut) > priority(existing === 'confirmed' ? 'CONFIRMEE' : existing === 'pending' ? 'EN_ATTENTE' : 'ANNULEE')) {
          map.set(key, cssStatus);
        }
        cur.setDate(cur.getDate() + 1);
      }
    }
    return map;
  }

  private buildMonth(year: number, month: number, reserved: Map<string, 'confirmed' | 'pending' | 'cancelled'>): MonthGrid {
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let startDow = firstDay.getDay();
    startDow = startDow === 0 ? 6 : startDow - 1;
    const cells: (DayCell | null)[] = new Array(startDow).fill(null);
    let count = 0;
    for (let d = 1; d <= daysInMonth; d++) {
      const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const status = reserved.get(key) ?? 'none';
      if (status !== 'none') count++;
      cells.push({ day: d, status });
    }
    const remainder = cells.length % 7;
    if (remainder > 0) for (let i = 0; i < 7 - remainder; i++) cells.push(null);
    return { name: MONTHS_FR[month], month, count, cells };
  }

  private dateKey(d: Date): string {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
}
