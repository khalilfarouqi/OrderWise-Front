import { Injectable } from '@angular/core';
import { KeycloakEvent, KeycloakEventType, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private defaultRoles: string[] = ['default-roles-orderwise', 'offline_access', 'uma_authorization'];

  constructor(private keycloak: KeycloakService) {
    this.keycloak.keycloakEvents$.subscribe({
      next: (event: KeycloakEvent) => {
        if (event.type == KeycloakEventType.OnAuthSuccess) {
          console.log('Authenticated successfully');
        }
      }
    });
  }

  async isLoggedIn(): Promise<boolean> {
    return await this.keycloak.isLoggedIn();
  }

  login(): void {
    this.keycloak.login();
  }

  logout(): void {
    this.keycloak.logout(window.location.origin);
  }

  async getToken(): Promise<string> {
    return await this.keycloak.getToken();
  }

  getUsername(): string {
    const tokenParsed = this.keycloak.getKeycloakInstance().tokenParsed;
    return tokenParsed?.['preferred_username'] || '';
  }

  getFullname(): string {
    const tokenParsed = this.keycloak.getKeycloakInstance().tokenParsed;
    return tokenParsed?.['name'] || '';
  }

  getUserRole(): string {
    const tokenParsed = this.keycloak.getKeycloakInstance().tokenParsed;
    if (!tokenParsed) {
      return '';
    }

    const role = tokenParsed.realm_access?.roles;
    // If roles is an array, filter out default roles and return the first non-default role
    if (Array.isArray(role)) {
      const filteredRoles = role.filter(r => !this.defaultRoles.includes(r));
      return filteredRoles.length > 0 ? filteredRoles[0] : '';
    }
    // If roles is a string, return it directly
    return role && !this.defaultRoles.includes(role) ? role : '';
  }

  hasRole(role: string): boolean {
    const userRole = this.getUserRole();
    return userRole === role;
  }
}
