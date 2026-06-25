import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../core/services/data.service';

const MONTHS_FR = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

interface DayCell {
  day: number;
  occupied: boolean;
}

interface MonthGrid {
  name: string;
  month: number;
  count: number;
  cells: (DayCell | null)[];
}

@Component({
  selector: 'app-disponibilites',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="year-container">

      <!-- ── Vue DESKTOP : grille annuelle ── -->
      <div class="desktop-view">
        <div class="year-nav">
          <button class="nav-btn" (click)="prevYear()" aria-label="Année précédente">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              width="18" height="18"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <span class="year-label">{{ currentYear }}</span>
          <button class="nav-btn" (click)="nextYear()" aria-label="Année suivante">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              width="18" height="18"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>

        @if (loading) {
          <div class="loading-state">Chargement du planning…</div>
        } @else {
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
                  <span class="dow">L</span><span class="dow">M</span><span class="dow">M</span>
                  <span class="dow">J</span><span class="dow">V</span><span class="dow">S</span><span class="dow">D</span>
                  @for (cell of m.cells; track $index) {
                    @if (cell) {
                      <span class="day-cell" [class.occupied]="cell.occupied" [class.today]="isToday(m.month, cell.day)">{{ cell.day }}</span>
                    } @else {
                      <span class="day-cell empty"></span>
                    }
                  }
                </div>
              </div>
            }
          </div>
        }
      </div>

      <!-- ── Vue MOBILE : calendrier mensuel ── -->
      <div class="mobile-view">
        <div class="month-nav">
          <button class="nav-btn" (click)="prevMobileMonth()" aria-label="Mois précédent">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              width="18" height="18"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <span class="month-label">{{ mobileMonthLabel }}</span>
          <button class="nav-btn" (click)="nextMobileMonth()" aria-label="Mois suivant">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              width="18" height="18"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>

        @if (loading) {
          <div class="loading-state">Chargement…</div>
        } @else if (mobileMonthData) {
          <div class="month-grid-large">
            <span class="dow-lg">Lun</span><span class="dow-lg">Mar</span><span class="dow-lg">Mer</span>
            <span class="dow-lg">Jeu</span><span class="dow-lg">Ven</span><span class="dow-lg">Sam</span><span class="dow-lg">Dim</span>
            @for (cell of mobileMonthData.cells; track $index) {
              @if (cell) {
                <span class="day-lg" [class.occupied]="cell.occupied" [class.today]="isToday(currentMobileMonth, cell.day)">{{ cell.day }}</span>
              } @else {
                <span class="day-lg empty"></span>
              }
            }
          </div>
        }
      </div>

      <div class="legend">
        <div class="legend-item">
          <span class="box occupied"></span>
          <span>Salle occupée</span>
        </div>
        <div class="legend-item">
          <span class="box today-box"></span>
          <span>Aujourd'hui</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .year-container { margin-bottom: 20px; }

    /* Navigation année */
    .year-nav {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      margin-bottom: 20px;
    }
    .year-label {
      font-size: 1.4rem;
      font-weight: 800;
      color: #1d3557;
      min-width: 72px;
      text-align: center;
    }
    .nav-btn {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      border: 1.5px solid #e2e8f0;
      background: #f8fafc;
      color: #475569;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.18s, border-color 0.18s;
    }
    .nav-btn:hover { background: #e2e8f0; border-color: #cbd5e1; }

    .loading-state {
      text-align: center;
      padding: 40px;
      color: #94a3b8;
      font-style: italic;
      font-size: 0.9rem;
    }

    /* Grille 12 mois */
    .year-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }

    /* Carte mini-mois */
    .mini-month {
      background: #f9fafb;
      border: 1.5px solid #e2e8f0;
      border-radius: 12px;
      padding: 10px;
    }
    .mini-month.current-month {
      border-color: #a8dadc;
      background: #f0fafc;
    }

    .mini-month-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 6px;
    }
    .mini-month-name {
      font-size: 0.72rem;
      font-weight: 700;
      color: #1d3557;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }
    .mini-month-badge {
      font-size: 0.62rem;
      font-weight: 700;
      background: #e63946;
      color: white;
      border-radius: 50px;
      padding: 1px 6px;
    }

    /* Grille jours */
    .mini-cal {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 1px;
    }
    .dow {
      font-size: 0.6rem;
      font-weight: 700;
      color: #a8dadc;
      text-align: center;
      padding: 2px 0 3px;
    }
    .day-cell {
      font-size: 0.65rem;
      text-align: center;
      padding: 3px 1px;
      border-radius: 3px;
      color: #475569;
      line-height: 1.4;
    }
    .day-cell.empty { color: transparent; }
    .day-cell.occupied {
      background: #e63946;
      color: white;
      font-weight: 700;
    }
    .day-cell.today {
      outline: 2px solid #1d3557;
      outline-offset: -1px;
      font-weight: 700;
    }
    .day-cell.occupied.today {
      outline-color: white;
    }

    /* Légende */
    .legend {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-top: 14px;
      justify-content: center;
    }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 7px;
      font-size: 0.83rem;
      color: #475569;
      font-weight: 500;
    }
    .box { width: 14px; height: 14px; border-radius: 3px; flex-shrink: 0; }
    .occupied { background: #e63946; }
    .today-box { background: transparent; outline: 2px solid #1d3557; outline-offset: -1px; border-radius: 3px; }

    /* ── Visibilité desktop / mobile ── */
    .desktop-view { display: block; }
    .mobile-view  { display: none; }

    @media (max-width: 992px) {
      .desktop-view { display: none; }
      .mobile-view  { display: block; max-width: 380px; margin: 0 auto; width: 100%; }
    }

    @media (max-width: 600px) {
      .year-container { padding: 0 4px; }
      .mobile-view { max-width: 100%; }
    }

    /* ── Vue mensuelle mobile ── */
    .month-nav {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      margin-bottom: 16px;
    }
    .month-label {
      font-size: 1.1rem;
      font-weight: 800;
      color: #1d3557;
      min-width: 160px;
      text-align: center;
      text-transform: capitalize;
    }
    .month-grid-large {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
    }
    .dow-lg {
      font-size: 0.72rem;
      font-weight: 700;
      color: #a8dadc;
      text-align: center;
      padding: 4px 0 6px;
    }
    .day-lg {
      font-size: 0.92rem;
      text-align: center;
      padding: 8px 2px;
      border-radius: 6px;
      color: #475569;
      line-height: 1;
    }
    .day-lg.empty { color: transparent; }
    .day-lg.occupied {
      background: #e63946;
      color: white;
      font-weight: 700;
    }
    .day-lg.today {
      outline: 2px solid #1d3557;
      outline-offset: -2px;
      font-weight: 700;
    }
    .day-lg.occupied.today { outline-color: white; }

    /* Responsive desktop year grid */
    @media (max-width: 900px) {
      .year-grid { grid-template-columns: repeat(3, 1fr); }
    }
  `]
})
export class DisponibilitesComponent implements OnInit {
  currentYear = new Date().getFullYear();
  currentMobileMonth = new Date().getMonth();
  monthsData: MonthGrid[] = [];
  loading = false;
  private occupiedDays = new Set<string>();

  get mobileMonthData(): MonthGrid | null {
    return this.monthsData[this.currentMobileMonth] ?? null;
  }

  get mobileMonthLabel(): string {
    return `${MONTHS_FR[this.currentMobileMonth]} ${this.currentYear}`;
  }

  constructor(private dataService: DataService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadYear();
  }

  prevYear(): void { this.currentYear--; this.loadYear(); }
  nextYear(): void { this.currentYear++; this.loadYear(); }

  prevMobileMonth(): void {
    if (this.currentMobileMonth === 0) {
      this.currentMobileMonth = 11;
      this.currentYear--;
      this.loadYear();
    } else {
      this.currentMobileMonth--;
    }
  }

  nextMobileMonth(): void {
    if (this.currentMobileMonth === 11) {
      this.currentMobileMonth = 0;
      this.currentYear++;
      this.loadYear();
    } else {
      this.currentMobileMonth++;
    }
  }

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

  loadYear(): void {
    this.loading = true;
    const from = `${this.currentYear}-01-01T00:00:00`;
    const to   = `${this.currentYear}-12-31T23:59:59`;

    this.dataService.getDisponibilites(from, to).subscribe(dispos => {
      this.occupiedDays.clear();
      for (const d of dispos) {
        const start = new Date(d.start);
        const end   = new Date(d.end);
        const cur   = new Date(start.getFullYear(), start.getMonth(), start.getDate());
        const last  = new Date(end.getFullYear(),   end.getMonth(),   end.getDate());
        while (cur <= last) {
          this.occupiedDays.add(this.dateKey(cur));
          cur.setDate(cur.getDate() + 1);
        }
      }
      this.buildYearView();
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  private buildYearView(): void {
    this.monthsData = Array.from({ length: 12 }, (_, m) => this.buildMonth(this.currentYear, m));
  }

  private buildMonth(year: number, month: number): MonthGrid {
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let startDow = firstDay.getDay();
    startDow = startDow === 0 ? 6 : startDow - 1;

    const cells: (DayCell | null)[] = new Array(startDow).fill(null);
    let count = 0;

    for (let d = 1; d <= daysInMonth; d++) {
      const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const occupied = this.occupiedDays.has(key);
      if (occupied) count++;
      cells.push({ day: d, occupied });
    }

    const remainder = cells.length % 7;
    if (remainder > 0) for (let i = 0; i < 7 - remainder; i++) cells.push(null);

    return { name: MONTHS_FR[month], month, count, cells };
  }

  private dateKey(d: Date): string {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
}
