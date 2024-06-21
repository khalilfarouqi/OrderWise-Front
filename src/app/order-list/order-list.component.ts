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

  constructor(private orderService: OrderService, private router: Router) { }

  onSidebarToggled(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }
  
  ngOnInit(): void {
    this.getOrders('khalil.farouqi');
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

  viewProductDetails(productId: number): void {
    this.router.navigate(['/product-page', productId]);
  }

}
