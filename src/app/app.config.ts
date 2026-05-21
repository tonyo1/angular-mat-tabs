import { ApplicationConfig, provideZoneChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideOAuthClient, OAuthService, OAuthStorage, AuthConfig } from 'angular-oauth2-oidc';
import { routes } from './app.routes';

export const authConfig: AuthConfig = {
  issuer: 'TBD', // e.g. https://your-oidc-provider.com
  clientId: 'TBD',
  responseType: 'code',
  redirectUri: window.location.origin + '/',
  postLogoutRedirectUri: window.location.origin + '/',
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  scope: 'openid profile email',
  useSilentRefresh: true, // enables silent refresh for tokens
  silentRefreshTimeout: 30000,
  timeoutFactor: 0.75,
  sessionChecksEnabled: true,
  showDebugInformation: false,
  strictDiscoveryDocumentValidation: false,
  // Cookie / token storage handled by library defaults + provider
};

export function initializeOAuth(oauthService: OAuthService): () => Promise<void> {
  return async () => {
    oauthService.configure(authConfig);
    await oauthService.loadDiscoveryDocumentAndTryLogin();
    oauthService.setupAutomaticSilentRefresh();
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideOAuthClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeOAuth,
      deps: [OAuthService],
      multi: true
    }
  ]
};
