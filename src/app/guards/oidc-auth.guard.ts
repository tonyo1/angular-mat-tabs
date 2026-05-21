import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

export const oidcAuthGuard: CanActivateFn = (route, state) => {
  const oauthService = inject(OAuthService);
  const router = inject(Router);

  if (oauthService.hasValidAccessToken()) {
    return true;
  }

  // Store intended URL for post-login redirect
  sessionStorage.setItem('redirectUrl', state.url);

  // Trigger OIDC redirect login flow
  oauthService.initLoginFlow();
  return false;
};