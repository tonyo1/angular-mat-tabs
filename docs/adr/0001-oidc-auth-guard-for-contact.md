# ADR-0001: OIDC Redirect Auth Guard for Contact Route

## Status
Accepted

## Context
The `/contact` route previously allowed unauthenticated access. To protect it as an "OIDC-protected inquiry" (see CONTEXT.md), we introduced a route guard using `angular-oauth2-oidc` for redirect-based login.

## Decision
- Use functional `CanActivateFn` (`oidcAuthGuard`) calling `OAuthService.hasValidAccessToken()` and `initLoginFlow()`.
- Store intended URL in sessionStorage for post-redirect return.
- Provide `OAuthService` via `provideOAuthClient()` in app config.
- Contact route now requires authentication; unauth users are redirected to IdP.

## Consequences
- Additional dependency: angular-oauth2-oidc (with legacy peer deps for Angular 19).
- New files: guard, updated routes/config, CONTEXT.md, this ADR.
- Future: configure real AuthConfig (clientId, issuer, etc.) and handle post-login redirect restoration.
- Aligns with domain glossary; no existing ADR conflicts.