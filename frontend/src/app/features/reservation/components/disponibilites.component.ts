import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../services/reservation.service';

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
  templateUrl: './disponibilites.component.html',
  styleUrls: ['./disponibilites.component.css']
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

  constructor(private reservationService: ReservationService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void { this.loadYear(); }

  prevYear(): void { this.currentYear--; this.loadYear(); }
  nextYear(): void { this.currentYear++; this.loadYear(); }

  prevMobileMonth(): void {
    if (this.currentMobileMonth === 0) { this.currentMobileMonth = 11; this.currentYear--; this.loadYear(); }
    else { this.currentMobileMonth--; }
  }

  nextMobileMonth(): void {
    if (this.currentMobileMonth === 11) { this.currentMobileMonth = 0; this.currentYear++; this.loadYear(); }
    else { this.currentMobileMonth++; }
  }

  isToday(month: number, day: number): boolean {
    const today = new Date();
    return today.getFullYear() === this.currentYear && today.getMonth() === month && today.getDate() === day;
  }

  isCurrentMonth(month: number): boolean {
    const today = new Date();
    return today.getFullYear() === this.currentYear && today.getMonth() === month;
  }

  loadYear(): void {
    this.loading = true;
    const from = `${this.currentYear}-01-01T00:00:00`;
    const to   = `${this.currentYear}-12-31T23:59:59`;

    this.reservationService.getDisponibilites(from, to).subscribe(dispos => {
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
