import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../models/user';
import { mapOidcClaimsToUser } from '../utils/claims-mapper';

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