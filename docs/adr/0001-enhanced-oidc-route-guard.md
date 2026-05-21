# ADR 0001: Enhanced OIDC Route Guard for Redirected Login Flow

## Status
Accepted (2026-05-20)

## Context
Existing `oidcAuthGuard` only checked `hasValidAccessToken()` and triggered `initLoginFlow()`. No User population from claims/cookie, no callback handling, no error component, no silent refresh. Needed to support claims-based auth, store User in BehaviorSubject, handle edge cases (missing cookie, invalid claims, expired token) via dedicated error route, use "TBD" for secrets/URLs.

## Decision
- Enhance guard to detect callback params and run `loadDiscoveryDocumentAndTryLogin` + `mapOidcClaimsToUser`.
- New `AuthService` with `BehaviorSubject<User | null>`.
- New pure `mapOidcClaimsToUser` function (collects "ab:xxxxxx:xxxxx" style claims into `Claims[]`).
- Dedicated `AuthErrorComponent` + `/auth-error` route.
- Full `authConfig` in `app.config.ts` with APP_INITIALIZER, silent refresh, cookie-friendly settings.
- All secrets/URLs use string "TBD".

## Consequences
- Clean separation: guard handles auth + population + navigation.
- Follows existing patterns (CanActivateFn, sessionStorage redirectUrl, domain glossary).
- Supports loading states via async guard, error UX, silent token refresh.
- Future: add claims checks in guard data, more specific claim mapping.