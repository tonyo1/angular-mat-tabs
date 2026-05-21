import { User } from '../models/user';

/**
 * Maps OIDC ID token / access token claims to the User interface.
 * Collects namespaced claims (e.g. "ab:xxxxxx:xxxxx") into Claims[].
 * Pure function - no Angular dependencies, fully unit-testable.
 */
export function mapOidcClaimsToUser(claims: any): User {
  const userClaims: string[] = [];

  Object.keys(claims || {}).forEach(key => {
    if (key.startsWith('ab:') || key.includes('claim') || Array.isArray(claims[key])) {
      const val = claims[key];
      if (Array.isArray(val)) {
        userClaims.push(...val.map(v => `${key}:${v}`));
      } else if (val) {
        userClaims.push(`${key}:${val}`);
      }
    }
  });

  if (userClaims.length === 0) {
    Object.keys(claims || {}).forEach(key => {
      if (!['sub', 'name', 'given_name', 'family_name', 'iat', 'exp', 'iss', 'aud'].includes(key)) {
        userClaims.push(`${key}:${claims[key]}`);
      }
    });
  }

  return {
    id: claims?.sub ? parseInt(claims.sub, 10) || 0 : 0,
    username: claims?.preferred_username || claims?.email || claims?.name || 'unknown',
    firstName: claims?.given_name || '',
    lastName: claims?.family_name || '',
    Claims: userClaims,
    createdAt: claims?.iat ? new Date(claims.iat * 1000) : undefined
  };
}