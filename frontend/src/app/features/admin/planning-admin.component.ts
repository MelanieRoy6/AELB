import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DataService } from '../../core/services/data.service';

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
  template: `
    <div class="admin-header">
      <div class="header-left">
        <h2>Planning global de la salle</h2>
        <p>Visualisez toutes les réservations confirmées et en attente.</p>
      </div>
      <div class="view-toggle">
        <button [class.active]="view === 'month'" (click)="setView('month')">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
            width="15" height="15" aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
          </svg>
          Mois
        </button>
        <button [class.active]="view === 'year'" (click)="setView('year')">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
            width="15" height="15" aria-hidden="true">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
          </svg>
          Année
        </button>
      </div>
    </div>

    <!-- Vue Mois (FullCalendar) -->
    @if (view === 'month') {
      <div class="calendar-admin app-card">
        <full-calendar [options]="calendarOptions"></full-calendar>
      </div>
    }

    <!-- Vue Année (mini-calendriers) -->
    @if (view === 'year') {
      <div class="year-view">

        <div class="year-nav">
          <button class="nav-btn" (click)="prevYear()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              width="18" height="18"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <span class="year-label">{{ currentYear }}</span>
          <button class="nav-btn" (click)="nextYear()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              width="18" height="18"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>

        <div class="year-grid">
          @for (m of monthsData; track m.month) {
            <div class="mini-month" [class.current-month]="isCurrentMonth(m.month)">

              <div class="mini-month-header">
                <span class="mini-month-name">{{ m.name }}</span>
                @if (m.count > 0) {
                  <span class="mini-month-badge">{{ m.count }}</span>
                }
              </div>

              <div class="mini-cal">
                <span class="dow">L</span>
                <span class="dow">M</span>
                <span class="dow">M</span>
                <span class="dow">J</span>
                <span class="dow">V</span>
                <span class="dow">S</span>
                <span class="dow">D</span>

                @for (cell of m.cells; track $index) {
                  @if (cell) {
                    <span class="day-cell"
                      [class.confirmed]="cell.status === 'confirmed'"
                      [class.pending]="cell.status === 'pending'"
                      [class.cancelled]="cell.status === 'cancelled'"
                      [class.today]="isToday(m.month, cell.day)">
                      {{ cell.day }}
                    </span>
                  } @else {
                    <span class="day-cell empty"></span>
                  }
                }
              </div>

            </div>
          }
        </div>

      </div>
    }

    <div class="legend-container">
      <div class="legend-item">
        <span class="box confirmed"></span>
        <span class="label">Confirmé</span>
      </div>
      <div class="legend-item">
        <span class="box pending"></span>
        <span class="label">En attente</span>
      </div>
      <div class="legend-item">
        <span class="box cancelled"></span>
        <span class="label">Annulé</span>
      </div>
    </div>
  `,
  styles: [`
    /* ── Header ── */
    .admin-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 24px;
      flex-wrap: wrap;
      gap: 16px;
    }
    .admin-header h2 { margin-bottom: 4px; color: #1e3d2f; }
    .admin-header p { color: #64748b; font-size: 0.9rem; margin: 0; }

    /* ── Toggle ── */
    .view-toggle {
      display: flex;
      background: #edf5ee;
      border-radius: 10px;
      padding: 4px;
      gap: 2px;
      border: 1px solid rgba(45, 106, 79, 0.15);
    }
    .view-toggle button {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 7px 16px;
      border: none;
      border-radius: 8px;
      background: transparent;
      color: #2d6a4f;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.18s, color 0.18s;
    }
    .view-toggle button:hover { background: rgba(45, 106, 79, 0.1); }
    .view-toggle button.active { background: #2d6a4f; color: white; }

    /* ── FullCalendar (vue mois) ── */
    .calendar-admin { background: white; padding: 30px; }

    :host ::ng-deep .fc { font-family: inherit; }
    :host ::ng-deep .fc-toolbar-title { font-size: 1.3rem !important; color: #1e3d2f; }
    :host ::ng-deep .fc-button {
      background: #edf5ee !important;
      border: 1px solid rgba(45,106,79,.2) !important;
      color: #2d6a4f !important;
      font-weight: 600 !important;
      border-radius: 8px !important;
      text-transform: capitalize !important;
      box-shadow: none !important;
    }
    :host ::ng-deep .fc-button:hover { background: #d1e8d5 !important; }
    :host ::ng-deep .fc-button-active,
    :host ::ng-deep .fc-button-primary:not(:disabled).fc-button-active {
      background: #2d6a4f !important;
      color: white !important;
    }
    :host ::ng-deep .fc-today-button:disabled { opacity: 0.5; }

    /* ── Vue Année ── */
    .year-view {
      background: white;
      border-radius: 16px;
      border: 1px solid rgba(45, 106, 79, 0.12);
      box-shadow: 0 4px 16px rgba(30, 61, 47, 0.06);
      padding: 28px;
    }

    .year-nav {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      margin-bottom: 28px;
    }
    .year-label {
      font-size: 1.5rem;
      font-weight: 800;
      color: #1e3d2f;
      min-width: 80px;
      text-align: center;
    }
    .nav-btn {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      border: 1px solid rgba(45, 106, 79, 0.2);
      background: #edf5ee;
      color: #2d6a4f;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.18s;
    }
    .nav-btn:hover { background: #d1e8d5; }

    /* Grille 12 mois */
    .year-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
    }

    /* Carte mini-mois */
    .mini-month {
      background: #f9fcfa;
      border: 1px solid rgba(45, 106, 79, 0.12);
      border-radius: 12px;
      padding: 12px;
      transition: box-shadow 0.2s;
    }
    .mini-month:hover {
      box-shadow: 0 4px 14px rgba(30, 61, 47, 0.09);
    }
    .mini-month.current-month {
      border-color: #2d6a4f;
      background: #f0f7f2;
    }

    .mini-month-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
    }
    .mini-month-name {
      font-size: 0.78rem;
      font-weight: 700;
      color: #1e3d2f;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .mini-month-badge {
      font-size: 0.68rem;
      font-weight: 700;
      background: #2d6a4f;
      color: white;
      border-radius: 50px;
      padding: 1px 7px;
    }

    /* Grille jours */
    .mini-cal {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 1px;
    }

    .dow {
      font-size: 0.62rem;
      font-weight: 700;
      color: #52b788;
      text-align: center;
      padding: 2px 0 4px;
    }

    .day-cell {
      font-size: 0.68rem;
      text-align: center;
      padding: 3px 1px;
      border-radius: 4px;
      color: #3d5c40;
      line-height: 1.4;
    }
    .day-cell.empty { color: transparent; }

    .day-cell.confirmed {
      background: #2a9d8f;
      color: white;
      font-weight: 700;
    }
    .day-cell.pending {
      background: #f4a261;
      color: white;
      font-weight: 700;
    }
    .day-cell.cancelled {
      background: #e63946;
      color: white;
      font-weight: 700;
      opacity: 0.7;
    }
    .day-cell.today {
      outline: 2px solid #2d6a4f;
      outline-offset: -1px;
      font-weight: 700;
    }

    /* ── Légende ── */
    .legend-container {
      margin-top: 20px;
      display: flex;
      gap: 24px;
      justify-content: center;
    }
    .legend-item { display: flex; align-items: center; gap: 8px; }
    .box { width: 14px; height: 14px; border-radius: 4px; }
    .box.confirmed { background: #2a9d8f; }
    .box.pending { background: #f4a261; }
    .box.cancelled { background: #e63946; opacity: 0.7; }
    .label { font-weight: 600; color: #1e3d2f; font-size: 0.85rem; }

    /* ── Responsive ── */
    @media (max-width: 1100px) {
      .year-grid { grid-template-columns: repeat(3, 1fr); }
    }
    @media (max-width: 760px) {
      .year-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 640px) {
      .admin-header { flex-direction: column; align-items: flex-start; gap: 12px; }
      .calendar-admin { padding: 12px 8px; }
      .year-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
      .year-view { padding: 16px 12px; }
      :host ::ng-deep .fc-toolbar { flex-direction: column; gap: 8px; }
      :host ::ng-deep .fc-toolbar-title { font-size: 1rem !important; }
    }
    @media (max-width: 420px) {
      .year-grid { grid-template-columns: 1fr 1fr; }
    }
  `]
})
export class PlanningAdminComponent implements OnInit {
  view: 'month' | 'year' = 'month';
  currentYear = new Date().getFullYear();
  monthsData: MonthGrid[] = [];

  private rawEvents: EventInput[] = [];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    locale: 'fr',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: ''
    },
    events: []
  };

  constructor(private dataService: DataService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadAllReservations();
  }

  setView(v: 'month' | 'year'): void {
    this.view = v;
    if (v === 'year') this.buildYearView();
  }

  prevYear(): void { this.currentYear--; this.buildYearView(); }
  nextYear(): void { this.currentYear++; this.buildYearView(); }

  isToday(month: number, day: number): boolean {
    const today = new Date();
    return today.getFullYear() === this.currentYear
      && today.getMonth() === month
      && today.getDate() === day;
  }

  isCurrentMonth(month: number): boolean {
    const today = new Date();
    return today.getFullYear() === this.currentYear && today.getMonth() === month;
  }

  loadAllReservations(): void {
    this.dataService.getAdminReservations().subscribe(resas => {
      this.rawEvents = resas.map(r => ({
        title: r.nomDemandeur,
        start: r.dateDebut,
        end: r.dateFin,
        backgroundColor: r.statut === 'CONFIRMEE' ? '#2a9d8f'
          : r.statut === 'EN_ATTENTE' ? '#f4a261' : '#e63946',
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
    this.monthsData = Array.from({ length: 12 }, (_, m) =>
      this.buildMonth(this.currentYear, m, reserved)
    );
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
        if (!existing || priority(statut) > priority(
          existing === 'confirmed' ? 'CONFIRMEE' : existing === 'pending' ? 'EN_ATTENTE' : 'ANNULEE'
        )) {
          map.set(key, cssStatus);
        }
        cur.setDate(cur.getDate() + 1);
      }
    }
    return map;
  }

  private buildMonth(
    year: number,
    month: number,
    reserved: Map<string, 'confirmed' | 'pending' | 'cancelled'>
  ): MonthGrid {
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
    if (remainder > 0) {
      for (let i = 0; i < 7 - remainder; i++) cells.push(null);
    }

    return { name: MONTHS_FR[month], month, count, cells };
  }

  private dateKey(d: Date): string {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
}
