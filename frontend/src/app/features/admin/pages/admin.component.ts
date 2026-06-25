import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
  sidebarOpen = false;
  private sessionTimer: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.sessionTimer = setInterval(() => {
      if (!this.authService.isAdmin()) {
        this.authService.logout();
        this.router.navigate(['/login'], { queryParams: { expired: 'true' } });
      }
    }, 60_000);
  }

  ngOnDestroy(): void {
    if (this.sessionTimer) clearInterval(this.sessionTimer);
  }

  toggleSidebar(): void { this.sidebarOpen = !this.sidebarOpen; }
  closeSidebar(): void  { this.sidebarOpen = false; }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
