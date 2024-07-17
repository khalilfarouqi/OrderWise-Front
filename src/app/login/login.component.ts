import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private keycloakService: KeycloakService, private router: Router) {}

  login() {
    this.keycloakService.login();
  }

  logout() {
    this.keycloakService.logout().then(() => {
      this.router.navigate(['/']);
    });
  }
}
