# iCSM Domain Context

## Glossary

- **OIDC-protected inquiry**: A contact form or page that requires authentication via OpenID Connect redirect flow before access. Used to protect lead capture or internal contact features.
- **Authenticated contact lead**: Domain concept representing a verified user submitting inquiries through the protected `/contact` route.
- **OIDC redirect flow**: The authentication mechanism where unauthenticated users are redirected to an external identity provider (e.g., Auth0, Azure AD) and returned post-login.

## Key Concepts

Contact route is now an OIDC-protected inquiry boundary. Unauthenticated access triggers `initLoginFlow()` preserving return URL via sessionStorage.