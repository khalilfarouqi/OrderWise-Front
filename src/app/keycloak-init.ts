import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService) {
    return () => {
        if (typeof window !== 'undefined') {
          return keycloak.init({
            config: {
              url: 'http://localhost:8080',
              realm: 'OrderWise',
              clientId: 'OrderWise-FrontEnd',
            },
            initOptions: {
              onLoad: 'check-sso',
              silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
            },
          });
        }
        return Promise.resolve();
    };
}