import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit {
  orders: any[] = [];
  isSidebarOpen = true;
  role!: string;

  constructor(private orderService: OrderService, private router: Router) { }

  onSidebarToggled(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }
  
  ngOnInit(): void {
    this.role = 'SELLER';
    if (this.role == 'SELLER')
      this.getOrders('khalil.farouqi');
    else if(this.role == 'ADMIN')
      this.getAllOrders();
    else if(this.role == 'DELIVERY_BOY')
      this.getOrdersToDelivery('khalil.farouqi');
    else if(this.role == 'CONFIRMATION')
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
