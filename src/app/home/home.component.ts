import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../service/order.service';
import { TruckingStepBean } from '../models/TruckingStepBean';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  trackingCode!: number;
  truckingStepBean!: TruckingStepBean;

  constructor(private router: Router, private orderService: OrderService) {}

  submitTrackingCode() {
    this.orderService.getOrderByTruckingCodeUrl(this.trackingCode).subscribe({
      next: (response) => {
        this.truckingStepBean = response;
      },
      error: (error) => {
        this.showAlert('Trucking number', 'Order with trucking number ' + this.trackingCode + ' not found', 'error');
      }
    });
  }

  showAlert(title: string, text: string, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: 'OK'
    });
  }
}
