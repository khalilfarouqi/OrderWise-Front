import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () => {
      if (typeof window != 'undefined') {
          console.log("Initializing Keycloak");
          return keycloak.init({
              config: {
                  url: 'http://localhost:8080',
                  realm: 'OrderWise',
                  clientId: 'OrderWise-FrontEnd',
              },
              initOptions: {
                  onLoad: 'check-sso',
                  silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
                  pkceMethod: 'S256', // Ensure using a secure PKCE method
              },
          }).catch(error => {
              console.error('Keycloak initialization error:', error);
          });
      }
      return Promise.resolve();
  };
}
