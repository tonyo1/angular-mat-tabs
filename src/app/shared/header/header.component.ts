import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="app-header">
      <div class="header-content">
        <span class="app-title">iCSM</span>

        <div class="auth-section" *ngIf="authService.currentUser$ | async as user; else loggedOut">
          <span class="user-info">{{ user.username || user.firstName }}</span>
          <button (click)="logout()">Logout</button>
        </div>

        <ng-template #loggedOut>
          <button (click)="login()">Login</button>
        </ng-template>
      </div>
    </header>
  `,
  styles: [`
    .app-header {
      background: #1976d2;
      color: white;
      padding: 0.5rem 1rem;
    }
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .auth-section {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    button {
      background: white;
      color: #1976d2;
      border: none;
      padding: 0.25rem 0.75rem;
      cursor: pointer;
      border-radius: 4px;
    }
  `]
})
export class HeaderComponent {
  authService = inject(AuthService);

  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
  }
}