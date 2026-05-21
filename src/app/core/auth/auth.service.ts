import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  public isAuthenticated$: Observable<boolean> = this.currentUser$.pipe(
    map(user => user !== null)
  );

  setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  clearUser(): void {
    this.currentUserSubject.next(null);
  }

  login(): void {
    // Delegate to OIDC library - placeholder for angular-auth-oidc-client or similar
    // e.g. this.oidcSecurityService.authorize();
    console.log('AuthService.login() triggered - integrate with OIDC initLoginFlow()');
  }

  logout(): void {
    this.clearUser();
    // Delegate to OIDC library
    // e.g. this.oidcSecurityService.logoff();
    console.log('AuthService.logout() triggered - integrate with OIDC logoff()');
  }

  hasClaim(claim: string, value?: string): boolean {
    const user = this.getCurrentUser();
    if (!user || !user.Claims) return false;

    return user.Claims.some(c => {
      if (value) {
        return c === `${claim}:${value}` || c.startsWith(`${claim}:${value}`);
      }
      return c.startsWith(`${claim}:`) || c === claim;
    });
  }

  hasAnyClaim(claims: string[]): boolean {
    return claims.some(claim => this.hasClaim(claim));

}
}

/**
 * Maps OIDC ID token / access token claims to the User interface.
 * Collects namespaced claims (e.g. "ab:xxxxxx:xxxxx") into Claims[].
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