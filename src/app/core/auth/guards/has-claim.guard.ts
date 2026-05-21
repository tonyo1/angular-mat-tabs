import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const hasClaimGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredClaim = route.data?.['claim'] as string;
  const requiredValue = route.data?.['claimValue'] as string | undefined;

  if (!requiredClaim) {
    return true; // No claim required
  }

  if (authService.hasClaim(requiredClaim, requiredValue)) {
    return true;
  }

  // Optionally navigate to error or login
  router.navigate(['/auth-error']);
  return false;
};