import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  trackingCode: string = '';

  constructor(private router: Router) {}

  submitTrackingCode() {
    if (this.trackingCode) {
      this.router.navigate(['/track'], { queryParams: { code: this.trackingCode } });
    } else {
      alert('Veuillez entrer un code de suivi');
    }
  }
}
