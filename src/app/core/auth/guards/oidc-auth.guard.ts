import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthService } from '../services/auth.service';
import { mapOidcClaimsToUser } from '../utils/claims-mapper';

export const oidcAuthGuard: CanActivateFn = async (route, state) => {
  const oauthService = inject(OAuthService);
  const router = inject(Router);
  const authService = inject(AuthService);

  // Handle OIDC callback (code + state params present after redirect)
  const isCallback = window.location.search.includes('code=') || window.location.search.includes('state=');
  if (isCallback) {
    try {
      await oauthService.loadDiscoveryDocumentAndTryLogin();
      if (oauthService.hasValidAccessToken()) {
        const claims = oauthService.getIdentityClaims() || oauthService.getAccessToken();
        const user = mapOidcClaimsToUser(claims);
        authService.setCurrentUser(user);
        // Post-login navigation
        const redirectUrl = sessionStorage.getItem('redirectUrl') || '/';
        sessionStorage.removeItem('redirectUrl');
        return router.parseUrl(redirectUrl);
      } else {
        return router.parseUrl('/auth-error?reason=invalid_token');
      }
    } catch (err) {
      console.error('OIDC callback error:', err);
      return router.parseUrl('/auth-error?reason=callback_failed');
    }
  }

  // Normal protected route check
  if (oauthService.hasValidAccessToken()) {
    return true;
  }

  // Store intended URL for post-login redirect
  sessionStorage.setItem('redirectUrl', state.url);

  // Trigger OIDC redirect login flow (cookie set by provider/lib)
  oauthService.initLoginFlow();
  return false;
};