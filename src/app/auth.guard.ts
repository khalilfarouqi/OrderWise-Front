import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard extends KeycloakAuthGuard {
    constructor(protected override router: Router, protected override keycloakAngular: KeycloakService) {
    super(router, keycloakAngular);
    }

    async isAccessAllowed(route: any, state: any): Promise<boolean> {
        const loggedIn = await this.keycloakAngular.isLoggedIn();
        if (!loggedIn) {
            await this.keycloakAngular.login();
            return false;
        } else {
            try {
                // Load user profile before proceeding
                const userProfile = await this.keycloakAngular.loadUserProfile();
                if (!userProfile) {
                throw new Error('User profile not loaded');
                }
                return true;
            } catch (error) {
                console.error('Failed to load user profile', error);
                return false;
            }
        }
    }
}
