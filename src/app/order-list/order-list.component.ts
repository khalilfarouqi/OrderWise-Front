import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit {
  orders: any[] = [];
  isSidebarOpen = true;

  role!: string;
  usenameDe!: string;

  constructor(private orderService: OrderService, 
    private router: Router,
    private authService: AuthService) { 
    this.authService.isLoggedIn().then(loggedIn => {
      if (loggedIn) {
        this.usenameDe = this.authService.getUsername();
        this.role = this.authService.getUserRole();
      } else {
        this.authService.login();
      }
    });
  }

  onSidebarToggled(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }
  
  ngOnInit(): void {
    if (this.role == 'SELLER')
      this.getOrders(this.usenameDe);
    else if(this.role == 'ADMIN')
      this.getAllOrders();
    else if(this.role == 'DELIVERY_BOY')
      this.getOrdersToDelivery(this.usenameDe);
    else if(this.role == 'CONFIRMED')
      this.getOrdersToConfirmation('CONFIRMATION');
  }

  getOrders(username: string) {
    this.orderService.getOrderByUsernameUrl(username).subscribe(
      (data) => {
        this.orders = data;
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  getAllOrders() {
    this.orderService.getOrderUrl().subscribe(
      (data) => {
        this.orders = data;
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  getOrdersToDelivery(username: string) {
    this.orderService.getOrdersToDeliveryUrl(username).subscribe(
      (data) => {
        this.orders = data;
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  getOrdersToConfirmation(stage: string) {
    this.orderService.getOrdersToConfirmationUrl(stage).subscribe(
      (data) => {
        this.orders = data;
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  viewProductDetails(productId: number): void {
    this.router.navigate(['/product-page', productId]);
  }

}
