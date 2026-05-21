import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth-error.component.html',
  styleUrls: ['./auth-error.component.css']
})
export class AuthErrorComponent implements OnInit {
  errorReason: string = 'Unknown authentication error';
  errorMessage: string = 'Please try logging in again.';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const reason = params['reason'];
      if (reason) {
        this.errorReason = reason;
        switch (reason) {
          case 'invalid_token':
            this.errorMessage = 'Invalid or expired token received from OIDC provider.';
            break;
          case 'callback_failed':
            this.errorMessage = 'OIDC callback processing failed. Missing cookie or invalid claims.';
            break;
          case 'missing_cookie':
            this.errorMessage = 'OIDC cookie not found after redirect.';
            break;
          default:
            this.errorMessage = 'An unexpected authentication error occurred.';
        }
      }
    });
  }

  retryLogin(): void {
    this.router.navigate(['/'], { queryParams: { login: true } });
  }
}