import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard extends KeycloakAuthGuard {
    constructor(protected override router: Router, protected override keycloakAngular: KeycloakService) {
        super(router, keycloakAngular);
    }

    async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        const loggedIn = await this.keycloakAngular.isLoggedIn();
        if (!loggedIn) {
            await this.keycloakAngular.login();
            return false;
        } else {
            try {
                const userProfile = await this.keycloakAngular.loadUserProfile();
                return !!userProfile;
            } catch (error) {
                console.error('Failed to load user profile', error);
                await this.keycloakAngular.logout();
                return false;
            }
        }
    }
}
